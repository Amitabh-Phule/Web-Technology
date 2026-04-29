document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-subject-form');
    const tableBody = document.getElementById('table-body');
    const formError = document.getElementById('form-error');
    const simSubjectSelect = document.getElementById('sim-subject');
    
    // Load initial data
    fetchSubjects();

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const subject = document.getElementById('subjectName').value;
        const attended = parseInt(document.getElementById('attended').value, 10);
        const total = parseInt(document.getElementById('total').value, 10);

        if (attended > total) {
            showError('Attended classes cannot be greater than total classes.');
            return;
        }

        hideError();

        const payload = { subject, attended, total };

        try {
            const response = await fetch('/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const data = await response.json();
                showError(data.error || 'Failed to add subject');
                return;
            }

            const updatedSubjects = await response.json();
            renderDashboard(updatedSubjects);
            form.reset();
        } catch (error) {
            showError('Server error. Please try again.');
        }
    });

    // Handle Simulation
    document.getElementById('btn-simulate').addEventListener('click', async () => {
        const subjectId = simSubjectSelect.value;
        const action = document.getElementById('sim-action').value; 
        const classes = parseInt(document.getElementById('sim-classes').value, 10);
        
        if (!subjectId) return;

        try {
            const response = await fetch('/subjects');
            const subjects = await response.json();
            const subjectData = subjects.find(s => s.id == subjectId);
            
            if (subjectData) {
                simulateFuture(subjectData, action, classes);
            }
        } catch (error) {
            console.error('Failed to simulate:', error);
        }
    });

    async function fetchSubjects() {
        try {
            const response = await fetch('/subjects');
            const subjects = await response.json();
            renderDashboard(subjects);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        }
    }

    function renderDashboard(subjects) {
        tableBody.innerHTML = '';
        simSubjectSelect.innerHTML = '<option value="">-- Select --</option>';
        
        let totalAttended = 0;
        let totalClasses = 0;

        if (subjects.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No subjects added yet.</td></tr>';
        }

        subjects.forEach(sub => {
            // Update Totals
            totalAttended += sub.attended;
            totalClasses += sub.total;

            // Math Logic
            const percentage = ((sub.attended / sub.total) * 100).toFixed(2);
            let status = '';
            let statusClass = '';
            
            if (percentage >= 75) {
                status = 'Safe';
                statusClass = 'status-safe';
            } else if (percentage >= 65) {
                status = 'Risk';
                statusClass = 'status-risk';
            } else {
                status = 'Critical';
                statusClass = 'status-critical';
            }

            // Safe Bunk Formula
            let safeBunk = Math.floor((sub.attended / 0.75) - sub.total);
            if (safeBunk < 0) safeBunk = 0;

            // Warning Logic
            let warningText = 'On track';
            if (percentage < 75) {
                const classesNeeded = Math.ceil((0.75 * sub.total - sub.attended) / 0.25);
                warningText = `Need to attend ${classesNeeded} more classes`;
            } else if (safeBunk > 0) {
                 warningText = `You can bunk ${safeBunk} classes`;
            } else {
                 warningText = `No bunks allowed`;
            }

            // Create Table Row
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${sub.subject}</td>
                <td>${sub.attended} / ${sub.total}</td>
                <td>${percentage}%</td>
                <td class="${statusClass}">${status}</td>
                <td>${safeBunk}</td>
                <td>${warningText}</td>
                <td>
                    <button class="edit-btn" data-id="${sub.id}" data-subject="${sub.subject.replace(/"/g, '&quot;')}" data-attended="${sub.attended}" data-total="${sub.total}">Edit</button>
                    <button class="delete-btn" data-id="${sub.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(tr);

            // Populate Simulation Dropdown
            const option = document.createElement('option');
            option.value = sub.id;
            option.textContent = sub.subject;
            simSubjectSelect.appendChild(option);
        });

        // Overall Attendance
        const overallPercentageEl = document.getElementById('overall-percentage');
        const overallStatusEl = document.getElementById('overall-status');

        if (totalClasses > 0) {
            const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(2);
            overallPercentageEl.textContent = `${overallPercentage}%`;
            
            if (overallPercentage >= 75) {
                overallStatusEl.textContent = 'Safe';
                overallStatusEl.className = 'status-safe';
            } else if (overallPercentage >= 65) {
                overallStatusEl.textContent = 'Risk';
                overallStatusEl.className = 'status-risk';
            } else {
                overallStatusEl.textContent = 'Critical';
                overallStatusEl.className = 'status-critical';
            }
        } else {
            overallPercentageEl.textContent = '0%';
            overallStatusEl.textContent = 'N/A';
            overallStatusEl.className = '';
        }
    }

    function simulateFuture(subjectData, action, classesCount) {
        let newAttended = subjectData.attended;
        let newTotal = subjectData.total + classesCount;

        if (action === 'attend') {
            newAttended += classesCount;
        }

        const newPercentage = ((newAttended / newTotal) * 100).toFixed(2);
        const simResult = document.getElementById('sim-result');

        let statusColor = 'red';
        if (newPercentage >= 75) statusColor = 'green';
        else if (newPercentage >= 65) statusColor = 'orange';

        simResult.innerHTML = `
            Simulation Result:<br>
            If you ${action} the next ${classesCount} classes in ${subjectData.subject},<br>
            your new attendance will be ${newAttended} / ${newTotal} (<span style="color: ${statusColor};">${newPercentage}%</span>).
        `;
    }

    function showError(msg) {
        formError.textContent = msg;
    }

    function hideError() {
        formError.textContent = '';
    }

    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.getAttribute('data-id');
            const subject = e.target.getAttribute('data-subject');
            const attended = e.target.getAttribute('data-attended');
            const total = e.target.getAttribute('data-total');
            editSubject(id, subject, attended, total);
        } else if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');
            deleteSubject(id);
        }
    });

    async function editSubject(id, currentSubject, currentAttended, currentTotal) {
        const newSubject = prompt("Enter new subject name:", currentSubject);
        if (newSubject === null) return; 
        
        const newAttended = prompt("Enter attended classes:", currentAttended);
        if (newAttended === null) return;
        
        const newTotal = prompt("Enter total classes:", currentTotal);
        if (newTotal === null) return;

        const attendedNum = parseInt(newAttended, 10);
        const totalNum = parseInt(newTotal, 10);

        if (isNaN(attendedNum) || isNaN(totalNum)) {
            alert("Attended and total must be valid numbers.");
            return;
        }

        if (attendedNum > totalNum) {
            alert("Attended classes cannot be greater than total classes.");
            return;
        }

        try {
            const response = await fetch(`/subjects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject: newSubject, attended: attendedNum, total: totalNum })
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.error || 'Failed to update subject');
                return;
            }

            fetchSubjects();
        } catch (error) {
            alert('Server error. Please try again.');
        }
    }

    async function deleteSubject(id) {
        if (!confirm("Are you sure you want to delete this subject?")) return;

        try {
            const response = await fetch(`/subjects/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                alert('Failed to delete subject');
                return;
            }

            fetchSubjects();
        } catch (error) {
            alert('Server error. Please try again.');
        }
    }
});
