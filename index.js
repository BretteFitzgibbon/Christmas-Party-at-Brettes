let containsErrors = false;
let count = 4;
const emailClick = document.getElementById("email");
const form = document.getElementById("rsvp-form");
let inMotion = true;
let intervalId = null;
const kidsClick = document.getElementById("kids");
const modal = document.querySelector(".modal");
const modalButton = document.getElementById("modal-button");
const modalImage = document.getElementById("modal-item");
const motionButton = document.getElementById("motion-button");
const nameClick = document.getElementById("name");
let peopleThere = document.getElementById("rsvp-count");
let rotateFactor = 0;
let rsvpInputs = document.getElementById("rsvp-form").elements;
const submitButton = document.getElementById("rsvp-button");
const themeButton = document.getElementById("theme-button");

class Person {
  constructor(name, email, kids) {
    this.name = name;
    this.email= email;
    this.kids = kids;
  }
}

const addParticipant = (person) => {
  const attendee = document.createElement("p");
  attendee.innerText = `🎟️ ${person.name.value} has RSVP'd.`;
  const participants = document.querySelector(".rsvp-participants");
  participants.appendChild(attendee);
};

const animateImage = () => {
  if (rotateFactor === 0) { rotateFactor = -10; }
  else if (rotateFactor === -10) { rotateFactor = 0; }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

const closeModal = () => { modal.style.display = "none"; }

const increment = () => {
  count++;
  peopleThere.innerText = `${count} people will be there!`;
}

const reduceMotion = () => {
  inMotion = !inMotion;
  if (inMotion) {motionButton.style.backgroundColor = "#DBB679"; }
  else { motionButton.style.backgroundColor = "#6E0F0C"; }
  if (!inMotion && intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

const resetEmail = () => {
  const email = document.getElementById("email");
  if (containsErrors) { email.classList.remove("error"); }
  email.className = "input";
  email.value = "";
  containsErrors = false;
};

const resetKids = () => {
  const kids = document.getElementById("kids");
  if (containsErrors) { kids.classList.remove("error"); }
  kids.className = "input";
  kids.value = "";
  containsErrors = false;
};

const resetName = () => {
  const name = document.getElementById("name");
  if (containsErrors) { name.classList.remove("error"); }
  name.className = "input";
  name.value = "";
  containsErrors = false;
};

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-content-modal");
    modal.style.display = "flex";
    modalContent.textContent = `Thanks ${person.name.value}! Can't wait to see you!`;
    if (inMotion) {
      if (intervalId !== null) { clearInterval(intervalId); }
      intervalId = setInterval(animateImage, 500);
    }
    setTimeout(() => {
      modal.style.display = "none";
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 5000);  
}

const validateForm = (event) => {
  event.preventDefault();
  containsErrors = false;

  const person = new Person(rsvpInputs[0], rsvpInputs[1], rsvpInputs[2]);

  if (person.name.value.length < 2) {
    containsErrors = true;
    person.name.classList.add("error");
  }

  if (!person.email.value.includes("@")) {
    containsErrors = true;
    person.email.classList.add("error");
  }

  if (person.kids.value === "") {
    containsErrors = true;
    person.kids.classList.add("error");
  }

  const num = Number(person.kids.value);
  if (!Number.isInteger(num) || num < 0 || num > 5) {
    containsErrors = true;
    person.kids.classList.add("error");
  }

  if (!containsErrors) {
    addParticipant(person);
    increment();
    toggleModal(person);
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
};  

emailClick.addEventListener("click", resetEmail);
kidsClick.addEventListener("click", resetKids);
modalButton.addEventListener("click", closeModal);
motionButton.addEventListener("click", reduceMotion);
nameClick.addEventListener("click", resetName);
submitButton.addEventListener("click", validateForm);
themeButton.addEventListener("click", toggleDarkMode);

