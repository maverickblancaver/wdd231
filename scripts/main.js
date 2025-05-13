// Responsive Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('open');
});

// Footer: current year and last modified
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;

// Course Data
const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 230", name: "Front-end Web Dev I", credits: 3, completed: true },
  { code: "WDD 330", name: "Front-end Web Dev II", credits: 3, completed: false },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false }
];

// Display Courses
function displayCourses(list) {
  const container = document.getElementById('courses-container');
  container.innerHTML = '';
  let totalCredits = 0;

  list.forEach(course => {
    const div = document.createElement('div');
    div.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
    div.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
    container.appendChild(div);
    totalCredits += course.credits;
  });

  document.getElementById('credit-total').textContent = totalCredits;
}

// Button Events
document.getElementById('all').addEventListener('click', () => displayCourses(courses));
document.getElementById('wdd').addEventListener('click', () => {
  const filtered = courses.filter(course => course.code.startsWith('WDD'));
  displayCourses(filtered);
});
document.getElementById('cse').addEventListener('click', () => {
  const filtered = courses.filter(course => course.code.startsWith('CSE'));
  displayCourses(filtered);
});

// Initial Load
window.addEventListener('load', () => displayCourses(courses));
