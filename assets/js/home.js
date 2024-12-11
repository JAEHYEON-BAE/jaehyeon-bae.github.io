/** home.js */
/** This Javascript File works only for home.html */

document.addEventListener("DOMContentLoaded", function() {
  
  /** Image Silder */
  const slides = document.querySelectorAll('.image-slider .slide');
  let currentSlide = 0;

  slides[currentSlide].classList.add('active');

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  setInterval(nextSlide, 3000);
});
