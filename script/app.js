const navBtn_1 = document.getElementById("nav-mobile-toggle");
const navLinks_1 = document.getElementById("mobile-nav-list");

navBtn_1.addEventListener("click", () => {
    navLinks_1.classList.toggle("active");
});

// const navBtn_2 = document.getElementById("nav-language-toggle");
// const navLinks_2 = document.getElementById("language-nav-list");

// navBtn_2.addEventListener("click", () => {
    // navLinks_2.classList.toggle("active");
// });

// add date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();