let courseCount = 0;

// Grade mapping based on marks
function getGrade(marks) {
    const marksNum = parseInt(marks);
    
    if (marksNum >= 90 && marksNum <= 100) return 'O';
    if (marksNum >= 80 && marksNum < 90) return 'A+';
    if (marksNum >= 70 && marksNum < 80) return 'A';
    if (marksNum >= 60 && marksNum < 70) return 'B+';
    if (marksNum >= 50 && marksNum < 60) return 'B';
    if (marksNum >= 40 && marksNum < 50) return 'C';
    return '-';
}

// Get grade points based on grade
function getGradePoints(grade) {
    const gradePoints = {
        'O': 4.0,
        'A+': 3.75,
        'A': 3.5,
        'B+': 3.0,
        'B': 2.5,
        'C': 2.0,
        '-': 0
    };
    return gradePoints[grade] || 0;
}

// Add a new course input field
function addCourse() {
    const container = document.getElementById('coursesContainer');
    courseCount++;
    
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-item';
    courseDiv.id = `course-${courseCount}`;
    
    courseDiv.innerHTML = `
        <h3>Course ${courseCount}</h3>
        <div class="course-info">
            <div class="form-group">
                <label for="marks-${courseCount}">Marks (0-100)</label>
                <input type="number" id="marks-${courseCount}" min="0" max="100" placeholder="Enter marks">
            </div>
            <div class="form-group">
                <label for="credits-${courseCount}">Credits</label>
                <select id="credits-${courseCount}">
                    <option value="">Select Credits</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div class="grade-display" id="grade-${courseCount}">-</div>
            <div class="grade-points" id="points-${courseCount}">0.0</div>
        </div>
        <button class="btn-remove" onclick="removeCourse(${courseCount})">✕</button>
    `;
    
    container.appendChild(courseDiv);
    
    // Add event listeners to update grade points when marks or credits change
    document.getElementById(`marks-${courseCount}`).addEventListener('input', function() {
        updateGradeDisplay(courseCount);
    });
    
    document.getElementById(`credits-${courseCount}`).addEventListener('change', function() {
        updateGradeDisplay(courseCount);
    });
}

// Update grade display when marks change
function updateGradeDisplay(courseNum) {
    const marksInput = document.getElementById(`marks-${courseNum}`);
    const creditsInput = document.getElementById(`credits-${courseNum}`);
    const gradeDisplay = document.getElementById(`grade-${courseNum}`);
    const pointsDisplay = document.getElementById(`points-${courseNum}`);
    
    if (marksInput.value !== '') {
        const grade = getGrade(marksInput.value);
        const basePoints = getGradePoints(grade);
        const credits = creditsInput.value ? parseInt(creditsInput.value) : 1;
        const totalPoints = basePoints * credits;
        gradeDisplay.textContent = grade;
        pointsDisplay.textContent = totalPoints.toFixed(2);
    } else {
        gradeDisplay.textContent = '-';
        pointsDisplay.textContent = '0.0';
    }
}

// Remove a course
function removeCourse(courseNum) {
    const courseDiv = document.getElementById(`course-${courseNum}`);
    if (courseDiv) {
        courseDiv.remove();
    }
}

// Calculate CGPA
function calculateCGPA() {
    const container = document.getElementById('coursesContainer');
    const courses = container.querySelectorAll('.course-item');
    
    if (courses.length === 0) {
        alert('Please add at least one course!');
        return;
    }
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    let validCourses = 0;
    
    courses.forEach(course => {
        const courseId = course.id.split('-')[1];
        const marks = document.getElementById(`marks-${courseId}`).value;
        const credits = document.getElementById(`credits-${courseId}`).value;
        
        if (marks !== '' && credits !== '') {
            const grade = getGrade(marks);
            const baseGradePoints = getGradePoints(grade);
            const creditNum = parseInt(credits);
            
            totalGradePoints += (baseGradePoints * creditNum);
            totalCredits += creditNum;
            validCourses++;
        }
    });
    
    if (validCourses === 0) {
        alert('Please fill in marks and credits for at least one course!');
        return;
    }
    
    const cgpa = totalGradePoints / totalCredits;
    
    // Display result
    document.getElementById('cgpaValue').textContent = cgpa.toFixed(2);
    document.getElementById('creditSummary').textContent = `Total Credits: ${totalCredits} | Valid Courses: ${validCourses}`;
    document.getElementById('resultSection').classList.add('show');
}

// Reset calculator
function resetCalculator() {
    document.getElementById('coursesContainer').innerHTML = '';
    courseCount = 0;
    document.getElementById('resultSection').classList.remove('show');
}

// Add first course on page load
window.addEventListener('load', function() {
    addCourse();
});
