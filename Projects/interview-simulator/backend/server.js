const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Load questions
const getQuestions = () => {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    return JSON.parse(data);
};

app.get('/questions', (req, res) => {
    const questions = getQuestions();
    // Remove the answer field before sending to frontend
    const secureQuestions = questions.map(q => {
        const { answer, ...rest } = q;
        return rest;
    });
    res.json(secureQuestions);
});

app.post('/submit', (req, res) => {
    const userAnswers = req.body.answers || [];
    const questions = getQuestions();
    
    let score = 0;
    const total = questions.length;
    const analysisSet = new Set();
    const breakdown = [];

    // To check for "Pressure or fatigue" (last 2 questions wrong)
    let lastTwoWrong = 0;

    userAnswers.forEach((ans, index) => {
        const { questionId, selectedOption, timeSpent } = ans;
        const actualQuestion = questions.find(q => q.id === questionId);
        
        if (!actualQuestion) return;

        let isCorrect = false;
        let remark = "Normal";

        if (selectedOption === null || selectedOption === undefined) {
            remark = "Skipped under pressure";
            analysisSet.add("Skipped under pressure");
            // Also treat skipped as wrong for pressure check
            if (index >= total - 2) {
                lastTwoWrong++;
            }
        } else {
            isCorrect = (selectedOption === actualQuestion.answer);
            if (isCorrect) {
                score += 1;
                if (timeSpent > 40) {
                    remark = "Overthinking";
                    analysisSet.add("Overthinking");
                }
            } else {
                if (timeSpent < 10) {
                    remark = "Careless mistake";
                    analysisSet.add("Careless mistake");
                }
                
                if (index >= total - 2) {
                    lastTwoWrong++;
                }
            }
        }

        breakdown.push({
            questionId,
            correct: isCorrect,
            timeSpent: timeSpent || 0,
            remark
        });
    });

    if (lastTwoWrong >= 2) {
        analysisSet.add("Pressure or fatigue");
    }

    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    
    let finalStatus = "Not Ready";
    if (accuracy >= 80) {
        finalStatus = "Ready";
    } else if (accuracy >= 50) {
        finalStatus = "Moderate";
    }

    res.json({
        score,
        total,
        accuracy,
        analysis: Array.from(analysisSet),
        finalStatus,
        breakdown
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
