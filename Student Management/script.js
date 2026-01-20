 // Sample initial data
        let students = [
            { id: 1001, firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "123-456-7890", course: "Computer Science", grade: "A", address: "123 Main St", dob: "2000-05-15", attendance: "Present" },
            { id: 1002, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phone: "234-567-8901", course: "Business Administration", grade: "B", address: "456 Oak Ave", dob: "2001-08-22", attendance: "Present" },
            { id: 1003, firstName: "Robert", lastName: "Johnson", email: "robert.j@example.com", phone: "345-678-9012", course: "Engineering", grade: "C", address: "789 Pine Rd", dob: "1999-12-10", attendance: "Absent" },
            { id: 1004, firstName: "Emily", lastName: "Williams", email: "emily.w@example.com", phone: "456-789-0123", course: "Medicine", grade: "A", address: "321 Elm St", dob: "2002-03-30", attendance: "Present" },
            { id: 1005, firstName: "Michael", lastName: "Brown", email: "michael.b@example.com", phone: "567-890-1234", course: "Law", grade: "B", address: "654 Maple Dr", dob: "2000-11-05", attendance: "Present" },
            { id: 1006, firstName: "Sarah", lastName: "Miller", email: "sarah.m@example.com", phone: "678-901-2345", course: "Arts", grade: "A", address: "987 Cedar Ln", dob: "2001-07-18", attendance: "Absent" },
        ];

        // DOM elements
        const navLinks = document.querySelectorAll('.nav-menu a');
        const contentSections = document.querySelectorAll('.content-section');
        const studentsBody = document.getElementById('studentsBody');
        const recentStudentsBody = document.getElementById('recentStudentsBody');
        const gradesBody = document.getElementById('gradesBody');
        const attendanceGrid = document.getElementById('attendanceGrid');
        const addStudentForm = document.getElementById('addStudentForm');
        const editStudentForm = document.getElementById('editStudentForm');
        const editStudentModal = document.getElementById('editStudentModal');
        const closeEditModal = document.getElementById('closeEditModal');
        const deleteStudentBtn = document.getElementById('deleteStudentBtn');
        const addStudentBtn = document.getElementById('addStudentBtn');
        const saveAttendanceBtn = document.getElementById('saveAttendance');
        const exportStudentsBtn = document.getElementById('exportStudents');
        const exportGradesBtn = document.getElementById('exportGrades');
        const exportAttendanceBtn = document.getElementById('exportAttendance');

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Set current date in attendance section
            const currentDate = new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('currentDate').textContent = currentDate;
            
            // Load initial data
            updateDashboard();
            loadStudents();
            loadGrades();
            loadAttendance();
            loadRecentStudents();
            
            // Set up navigation
            setupNavigation();
            
            // Set up event listeners
            setupEventListeners();
        });

        // Set up navigation between sections
        function setupNavigation() {
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sectionId = this.getAttribute('data-section');
                    
                    // Update active nav link
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show selected section
                    contentSections.forEach(section => {
                        section.style.display = 'none';
                    });
                    document.getElementById(sectionId).style.display = 'block';
                    
                    // Update data when switching to specific sections
                    if (sectionId === 'dashboard') {
                        updateDashboard();
                        loadRecentStudents();
                    } else if (sectionId === 'students') {
                        loadStudents();
                    } else if (sectionId === 'grades') {
                        loadGrades();
                    } else if (sectionId === 'attendance') {
                        loadAttendance();
                    } else if (sectionId === 'reports') {
                        generateReports();
                    }
                });
            });
        }

        // Set up event listeners
        function setupEventListeners() {
            // Add new student form
            addStudentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addNewStudent();
            });
            
            // Edit student form
            editStudentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                updateStudent();
            });
            
            // Close edit modal
            closeEditModal.addEventListener('click', function() {
                editStudentModal.style.display = 'none';
            });
            
            // Delete student button
            deleteStudentBtn.addEventListener('click', function() {
                const studentId = parseInt(document.getElementById('editStudentId').value);
                deleteStudent(studentId);
            });
            
            // Add student button in students section
            addStudentBtn.addEventListener('click', function() {
                navLinks.forEach(nav => nav.classList.remove('active'));
                document.querySelector('[data-section="add-student"]').classList.add('active');
                contentSections.forEach(section => {
                    section.style.display = 'none';
                });
                document.getElementById('add-student').style.display = 'block';
            });
            
            // Save attendance
            saveAttendanceBtn.addEventListener('click', function() {
                saveAttendance();
            });
            
            // Export buttons
            exportStudentsBtn.addEventListener('click', function() {
                alert('Students data exported as CSV (simulated)');
            });
            
            exportGradesBtn.addEventListener('click', function() {
                alert('Grades data exported as Excel (simulated)');
            });
            
            exportAttendanceBtn.addEventListener('click', function() {
                alert('Attendance data exported as PDF (simulated)');
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === editStudentModal) {
                    editStudentModal.style.display = 'none';
                }
            });
        }

        // Load students into the table
        function loadStudents() {
            studentsBody.innerHTML = '';
            
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.course}</td>
                    <td><span class="grade-badge">${student.grade}</span></td>
                    <td>
                        <div class="action-btns">
                            <button class="action-btn edit-btn" data-id="${student.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete-btn" data-id="${student.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                studentsBody.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const studentId = parseInt(this.getAttribute('data-id'));
                    openEditModal(studentId);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const studentId = parseInt(this.getAttribute('data-id'));
                    if (confirm('Are you sure you want to delete this student?')) {
                        deleteStudent(studentId);
                    }
                });
            });
        }

        // Load recent students for dashboard
        function loadRecentStudents() {
            recentStudentsBody.innerHTML = '';
            
            // Get the 5 most recent students (based on ID for simplicity)
            const recentStudents = [...students]
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);
            
            recentStudents.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.course}</td>
                    <td>${student.grade}</td>
                    <td>${student.attendance}</td>
                `;
                recentStudentsBody.appendChild(row);
            });
        }

        // Load grades into the table
        function loadGrades() {
            gradesBody.innerHTML = '';
            
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.course}</td>
                    <td>${student.grade}</td>
                    <td>
                        <select class="grade-select" data-id="${student.id}">
                            <option value="A" ${student.grade === 'A' ? 'selected' : ''}>A</option>
                            <option value="B" ${student.grade === 'B' ? 'selected' : ''}>B</option>
                            <option value="C" ${student.grade === 'C' ? 'selected' : ''}>C</option>
                            <option value="D" ${student.grade === 'D' ? 'selected' : ''}>D</option>
                            <option value="F" ${student.grade === 'F' ? 'selected' : ''}>F</option>
                        </select>
                    </td>
                    <td>
                        <div class="performance-indicator">
                            ${getPerformanceIndicator(student.grade)}
                        </div>
                    </td>
                `;
                gradesBody.appendChild(row);
            });
            
            // Add event listeners to grade select elements
            document.querySelectorAll('.grade-select').forEach(select => {
                select.addEventListener('change', function() {
                    const studentId = parseInt(this.getAttribute('data-id'));
                    const newGrade = this.value;
                    updateStudentGrade(studentId, newGrade);
                });
            });
        }

        // Load attendance cards
        function loadAttendance() {
            attendanceGrid.innerHTML = '';
            
            students.forEach(student => {
                const card = document.createElement('div');
                card.className = `attendance-card ${student.attendance === 'Present' ? 'present' : 'absent'}`;
                card.innerHTML = `
                    <div class="student-name">${student.firstName} ${student.lastName}</div>
                    <div class="student-id">ID: ${student.id}</div>
                    <div class="student-course">${student.course}</div>
                    <div class="attendance-buttons" style="margin-top: 10px;">
                        <button class="btn ${student.attendance === 'Present' ? 'btn-success' : ''}" 
                                data-id="${student.id}" data-status="Present" 
                                style="padding: 5px 10px; font-size: 0.8rem; margin-right: 5px;">
                            Present
                        </button>
                        <button class="btn ${student.attendance === 'Absent' ? 'btn-danger' : ''}" 
                                data-id="${student.id}" data-status="Absent" 
                                style="padding: 5px 10px; font-size: 0.8rem;">
                            Absent
                        </button>
                    </div>
                `;
                attendanceGrid.appendChild(card);
            });
            
            // Add event listeners to attendance buttons
            document.querySelectorAll('.attendance-card .btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const studentId = parseInt(this.getAttribute('data-id'));
                    const status = this.getAttribute('data-status');
                    updateAttendanceStatus(studentId, status);
                });
            });
        }

        // Update dashboard statistics
        function updateDashboard() {
            // Update total students
            const totalStudents = students.length;
            document.getElementById('totalStudents').textContent = totalStudents;
            document.getElementById('cardTotalStudents').textContent = totalStudents;
            
            // Calculate average grade
            const gradeValues = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
            let totalGradePoints = 0;
            students.forEach(student => {
                totalGradePoints += gradeValues[student.grade] || 0;
            });
            const avgGrade = totalGradePoints / students.length;
            document.getElementById('avgGrade').textContent = avgGrade.toFixed(1);
            document.getElementById('cardAvgGrade').textContent = avgGrade.toFixed(1);
            
            // Calculate attendance rate
            const presentStudents = students.filter(s => s.attendance === 'Present').length;
            const attendanceRate = Math.round((presentStudents / students.length) * 100);
            document.getElementById('attendanceRate').textContent = `${attendanceRate}%`;
            document.getElementById('cardAttendance').textContent = `${attendanceRate}%`;
            
            // Find top student
            let topStudent = null;
            let topGrade = -1;
            students.forEach(student => {
                if (gradeValues[student.grade] > topGrade) {
                    topGrade = gradeValues[student.grade];
                    topStudent = student;
                }
            });
            document.getElementById('cardTopStudent').textContent = topStudent ? 
                `${topStudent.firstName.charAt(0)}. ${topStudent.lastName}` : 'N/A';
        }

        // Add a new student
        function addNewStudent() {
            const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1001;
            
            const newStudent = {
                id: newId,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                course: document.getElementById('course').value,
                grade: document.getElementById('grade').value,
                address: document.getElementById('address').value,
                dob: document.getElementById('dob').value,
                attendance: "Present" // Default attendance
            };
            
            students.push(newStudent);
            
            // Reset form
            addStudentForm.reset();
            
            // Update UI
            loadStudents();
            updateDashboard();
            loadRecentStudents();
            
            // Show success message
            alert(`Student ${newStudent.firstName} ${newStudent.lastName} added successfully!`);
            
            // Navigate to students list
            document.querySelector('[data-section="students"]').click();
        }

        // Open edit modal with student data
        function openEditModal(studentId) {
            const student = students.find(s => s.id === studentId);
            
            if (student) {
                document.getElementById('editStudentId').value = student.id;
                document.getElementById('editFirstName').value = student.firstName;
                document.getElementById('editLastName').value = student.lastName;
                document.getElementById('editEmail').value = student.email;
                document.getElementById('editPhone').value = student.phone;
                document.getElementById('editCourse').value = student.course;
                document.getElementById('editGrade').value = student.grade;
                document.getElementById('editAddress').value = student.address;
                document.getElementById('editDob').value = student.dob;
                
                editStudentModal.style.display = 'flex';
            }
        }

        // Update student information
        function updateStudent() {
            const studentId = parseInt(document.getElementById('editStudentId').value);
            const studentIndex = students.findIndex(s => s.id === studentId);
            
            if (studentIndex !== -1) {
                students[studentIndex] = {
                    ...students[studentIndex],
                    firstName: document.getElementById('editFirstName').value,
                    lastName: document.getElementById('editLastName').value,
                    email: document.getElementById('editEmail').value,
                    phone: document.getElementById('editPhone').value,
                    course: document.getElementById('editCourse').value,
                    grade: document.getElementById('editGrade').value,
                    address: document.getElementById('editAddress').value,
                    dob: document.getElementById('editDob').value
                };
                
                // Update UI
                loadStudents();
                loadGrades();
                loadRecentStudents();
                updateDashboard();
                
                // Close modal
                editStudentModal.style.display = 'none';
                
                //  success message
                alert('Student information updated successfully!');
            }
        }

        // Delete a student
        function deleteStudent(studentId) {
            const studentIndex = students.findIndex(s => s.id === studentId);
            
            if (studentIndex !== -1) {
                const studentName = `${students[studentIndex].firstName} ${students[studentIndex].lastName}`;
                students.splice(studentIndex, 1);
                
                // Update UI
                loadStudents();
                loadGrades();
                loadAttendance();
                loadRecentStudents();
                updateDashboard();
                
                // Close modal if open
                editStudentModal.style.display = 'none';
                
                // success message
                alert(`Student ${studentName} deleted successfully!`);
            }
        }

        // Update student grade
        function updateStudentGrade(studentId, newGrade) {
            const studentIndex = students.findIndex(s => s.id === studentId);
            
            if (studentIndex !== -1) {
                students[studentIndex].grade = newGrade;
                
                updateDashboard();
                
                // Show success message
                const studentName = `${students[studentIndex].firstName} ${students[studentIndex].lastName}`;
                alert(`Grade for ${studentName} updated to ${newGrade}`);
            }
        }

        // Update attendance status
        function updateAttendanceStatus(studentId, status) {
            const studentIndex = students.findIndex(s => s.id === studentId);
            
            if (studentIndex !== -1) {
                students[studentIndex].attendance = status;
                
            
                loadAttendance();
                updateDashboard();
            }
        }

        // Save attendance for all students
        function saveAttendance() {
            alert('Attendance saved successfully!');
        }

        // Generate reports
        function generateReports() {
            // Generate grade distribution chart 
            const gradeCounts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
            students.forEach(student => {
                gradeCounts[student.grade]++;
            });
            
            let gradeChartHTML = '';
            for (const [grade, count] of Object.entries(gradeCounts)) {
                const percentage = Math.round((count / students.length) * 100);
                gradeChartHTML += `
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Grade ${grade}:</span>
                            <span>${count} students (${percentage}%)</span>
                        </div>
                        <div style="height: 10px; background-color: #eee; border-radius: 5px; margin-top: 5px;">
                            <div style="height: 100%; width: ${percentage}%; background-color: ${getGradeColor(grade)}; border-radius: 5px;"></div>
                        </div>
                    </div>
                `;
            }
            document.getElementById('gradeChart').innerHTML = gradeChartHTML;
            
            // Generate course enrollment chart
            const courseCounts = {};
            students.forEach(student => {
                courseCounts[student.course] = (courseCounts[student.course] || 0) + 1;
            });
            
            let courseChartHTML = '';
            for (const [course, count] of Object.entries(courseCounts)) {
                const percentage = Math.round((count / students.length) * 100);
                courseChartHTML += `
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>${course}:</span>
                            <span>${count} students (${percentage}%)</span>
                        </div>
                        <div style="height: 10px; background-color: #eee; border-radius: 5px; margin-top: 5px;">
                            <div style="height: 100%; width: ${percentage}%; background-color: ${getRandomColor()}; border-radius: 5px;"></div>
                        </div>
                    </div>
                `;
            }
            document.getElementById('courseChart').innerHTML = courseChartHTML;
        }

        // Helper function to get performance indicator
        function getPerformanceIndicator(grade) {
            const indicators = {
                'A': '<span style="color: var(--success-color);"><i class="fas fa-star"></i> Excellent</span>',
                'B': '<span style="color: #3498db;"><i class="fas fa-thumbs-up"></i> Good</span>',
                'C': '<span style="color: #f39c12;"><i class="fas fa-check"></i> Average</span>',
                'D': '<span style="color: #e67e22;"><i class="fas fa-exclamation-triangle"></i> Needs Improvement</span>',
                'F': '<span style="color: var(--accent-color);"><i class="fas fa-times-circle"></i> Failing</span>'
            };
            return indicators[grade] || '<span>N/A</span>';
        }

        // Helper function to get grade color
        function getGradeColor(grade) {
            const colors = {
                'A': '#2ecc71',
                'B': '#3498db',
                'C': '#f39c12',
                'D': '#e67e22',
                'F': '#e74c3c'
            };
            return colors[grade] || '#95a5a6';
        }

        // Helper function to generate random color
        function getRandomColor() {
            const colors = ['#3498db', '#2ecc71', '#9b59b6', '#1abc9c', '#34495e', '#16a085', '#27ae60'];
            return colors[Math.floor(Math.random() * colors.length)];
        }