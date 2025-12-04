const navItems = document.querySelector("#nav__items");
const openNavBtn = document.querySelector("#open__nav-btn");
const closeNavBtn = document.querySelector("#close__nav-btn");

openNavBtn.addEventListener("click", () => {
  navItems.style.display = "flex";
  openNavBtn.style.display = "none";
  closeNavBtn.style.display = "inline-block";
});

const closeNav = () => {
  navItems.style.display = "none";
  openNavBtn.style.display = "inline-block";
  closeNavBtn.style.display = "none";
};

closeNavBtn.addEventListener("click", closeNav);

if (window.innerWidth < 1024) {
  document.querySelectorAll("#nav__items li a").forEach((navItem) => {
    navItem.addEventListener("click", () => {
      closeNav();
    });
  });
}

var mySwiper = new Swiper(".swiper.mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },


  breakpoints: {

    600: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 3,
    },
  },
});


const API_URL = "https://script.google.com/macros/s/AKfycbxc1TnYccosHhvQP7NYYNGK9BLY9PlPg00W1xDMqox6vOc9oAJq-YfWd-jyRDCczWrwcg/exec";

const stars = document.querySelectorAll("#stars span");
let selectedRating = 0;

// ⭐ Check local storage on page load
const storedRate = localStorage.getItem("rate");
if (storedRate !== null) {
  const value = Number(storedRate);
  for (let i = 0; i < value; i++) {
    stars[i].classList.add("active");
  }
  document.getElementById("rating-result").textContent = "You have already rated ⭐";
}

stars.forEach(star => {
  star.addEventListener("click", () => {

    // ⭐ User already rated
    if (localStorage.getItem("rate") !== null) {
      document.getElementById("rating-result").textContent = "You have already rated ⭐";
      return;
    }

    // ⭐ Save new rating
    selectedRating = star.getAttribute("data-value");
    localStorage.setItem("rate", selectedRating);

    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("active");
    }

    sendRating(selectedRating);
  });
});

// ⭐ Send rating
function sendRating(stars) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ stars })
  })
  .then(() => {
    document.getElementById("rating-result").textContent = "Thank you for your rating! ⭐";
    loadAverageRating();
  })
  .catch(() => alert("Error sending rating!"));
}

// ⭐ Load average rating
function loadAverageRating() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const arr = data.map(r => Number(r.stars));
      if (arr.length === 0) {
        document.getElementById("average-rating").textContent = "--";
        return;
      }
      const avg = (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
      document.getElementById("average-rating").textContent = `${avg} ⭐ out of 5`;
    });
}

loadAverageRating();

const ecreer = document.getElementById("petfriends");

const letters = Array.from("Pet Friends 🐈");
let i = 0;
let isDeleting = false;

function typeEffect() {
  let current = letters.slice(0, i).join("");
  ecreer.innerText = current;

  if (!isDeleting && i < letters.length) {
    i++;
  } else if (isDeleting && i > 0) {
    i--;
  }

  if (i === letters.length) {
    setTimeout(() => isDeleting = true, 1000);
  }

  if (i === 0 && isDeleting) {
    isDeleting = false;
  }

  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();

const inf_cont = document.getElementById("inf-cont");
const inf = document.getElementById("inf");



if (window.innerWidth > 600) {
  inf_cont.addEventListener("mouseenter", () => {
    inf.style.display = 'block';
  });

  inf_cont.addEventListener("mouseleave", () => {
    inf.style.display = 'none';
  });
}


if (window.innerWidth < 600) {
  inf_cont.addEventListener("mouseenter", () => {
    inf_cont.style.display = 'grid';
    inf.style.display = 'block';
  });

  inf_cont.addEventListener("mouseleave", () => {
    inf.style.display = 'none';
  });
}
