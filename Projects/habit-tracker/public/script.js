async function refreshDashboard() {
    const res = await fetch('/api/habits');
    const data = await res.json();
    
    renderDayHeaders();
    renderHabitRows(data.habits);
    calculateStats(data.habits);
}

function renderDayHeaders() {
    const head = document.getElementById('table-head');
    if (head.children.length > 1) return; 
    for (let i = 1; i <= 31; i++) {
        const th = document.createElement('th');
        th.innerText = i;
        head.appendChild(th);
    }
}

function renderHabitRows(habits) {
    const body = document.getElementById('table-body');
    body.innerHTML = ""; // Clear list before re-rendering

    habits.forEach(habit => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="habit-col">${habit.name}</td>`;
        
        habit.history.forEach((status, index) => {
            const td = document.createElement('td');
            td.className = `cell status-${status}`;
            td.onclick = () => toggleDay(habit.id, index);
            tr.appendChild(td);
        });
        body.appendChild(tr);
    });
}

async function createNewHabit() {
    const input = document.getElementById('new-habit-name');
    if (!input.value) return;

    await fetch('/api/add-habit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.value })
    });
    
    input.value = ""; // Clear the box
    refreshDashboard(); // Show the new row immediately
}

async function toggleDay(habitId, dayIndex) {
    await fetch('/api/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId, dayIndex })
    });
    refreshDashboard();
}

function calculateStats(habits) {
    if (habits.length === 0) return;
    const total = habits.length * 31;
    const done = habits.reduce((acc, h) => acc + h.history.filter(x => x === 1).length, 0);
    const score = Math.round((done / total) * 100);
    document.getElementById('overall-progress').innerHTML = `Monthly Score: <b>${score}%</b>`;
}

refreshDashboard();