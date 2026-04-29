const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static('public'));

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// GET all subjects
app.get('/subjects', (req, res) => {
    const subjects = readData();
    res.json(subjects);
});

// POST new subject
app.post('/subjects', (req, res) => {
    const { subject, attended, total } = req.body;

    if (!subject || subject.trim() === '') {
        return res.status(400).json({ error: 'Subject name must not be empty' });
    }

    const attendedNum = Number(attended);
    const totalNum = Number(total);

    if (isNaN(attendedNum) || isNaN(totalNum)) {
        return res.status(400).json({ error: 'Attended and total must be numbers' });
    }

    if (attendedNum > totalNum) {
        return res.status(400).json({ error: 'Attended classes cannot be greater than total classes' });
    }

    const subjects = readData();
    const newSubject = {
        id: Date.now(), // Generate unique ID
        subject: subject.trim(),
        attended: attendedNum,
        total: totalNum
    };

    subjects.push(newSubject);
    writeData(subjects);

    res.status(201).json(subjects);
});

// DELETE subject
app.delete('/subjects/:id', (req, res) => {
    const { id } = req.params;
    let subjects = readData();
    const initialLength = subjects.length;
    subjects = subjects.filter(sub => sub.id !== Number(id));

    if (subjects.length === initialLength) {
        return res.status(404).json({ error: 'Subject not found' });
    }

    writeData(subjects);
    res.json({ message: 'Subject deleted successfully' });
});

// PUT (Edit) subject
app.put('/subjects/:id', (req, res) => {
    const { id } = req.params;
    const { subject, attended, total } = req.body;

    if (!subject || subject.trim() === '') {
        return res.status(400).json({ error: 'Subject name must not be empty' });
    }

    const attendedNum = Number(attended);
    const totalNum = Number(total);

    if (isNaN(attendedNum) || isNaN(totalNum)) {
        return res.status(400).json({ error: 'Attended and total must be numbers' });
    }

    if (attendedNum > totalNum) {
        return res.status(400).json({ error: 'Attended classes cannot be greater than total classes' });
    }

    const subjects = readData();
    const index = subjects.findIndex(sub => sub.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Subject not found' });
    }

    subjects[index] = {
        ...subjects[index],
        subject: subject.trim(),
        attended: attendedNum,
        total: totalNum
    };

    writeData(subjects);
    res.json(subjects[index]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
