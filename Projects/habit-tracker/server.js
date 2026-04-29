const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = './habits.json';

const readDB = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeDB = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// 1. Fetch all habits
app.get('/api/habits', (req, res) => {
    res.json(readDB());
});

// 2. Add a new habit (This makes the "Add" button work)
app.post('/api/add-habit', (req, res) => {
    const { name } = req.body;
    const data = readDB();
    const newHabit = {
        id: Date.now(), // Unique ID
        name: name,
        history: new Array(31).fill(0) // Creates the full row of 31 days
    };
    data.habits.push(newHabit);
    writeDB(data);
    res.json(newHabit);
});

// 3. Toggle a day (Success/Fail)
app.post('/api/toggle', (req, res) => {
    const { habitId, dayIndex } = req.body;
    const data = readDB();
    const habit = data.habits.find(h => h.id === habitId);
    if (habit) {
        habit.history[dayIndex] = habit.history[dayIndex] === 0 ? 1 : 0;
        writeDB(data);
        res.json({ success: true });
    }
});

app.listen(PORT, () => console.log(`🚀 Matrix Tracker: http://localhost:${PORT}`));