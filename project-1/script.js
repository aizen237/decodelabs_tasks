const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
const addToCartButtons = document.querySelectorAll('.btn-add-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    cartCountEl.textContent = cartCount;
  });
});

const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const formMessage = document.getElementById('formMessage');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email)) {
    formMessage.textContent = "Thanks for subscribing!";
    formMessage.style.color = "#2d6a4f";
    newsletterForm.reset();
  } else {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "#c0392b";
  }
});