/** main.js */
/** This Javascript file works for all pages & posts */

document.addEventListener("DOMContentLoaded", function() {

  /** Header Menu Trigger */
  const menuIcon = document.querySelector('.menu-icon');
  const close = document.querySelector('.close');
  const trigger = document.querySelector('.trigger');
  const menu_icon_svg = document.querySelector('.menu-icon > svg');
  const pageContent = document.querySelector('.page-content');

  let opened = false;
  
  menuIcon.addEventListener('click', function() {
    trigger.style.transform = 'translateX(0)';
    pageContent.classList.add('blur');
    opened = true;
  });
  close.addEventListener('click', function() {
    trigger.style.transform = 'translateX(100%)';
    pageContent.classList.remove('blur');
    opened = false;
  });


  /** Header Menu Trigger: interact with window width */
  const onPalm = 600;
  function triggerOnPalm() {
    if (opened && window.innerWidth > onPalm) {
      trigger.style.transform = 'translateX(100%)';
      pageContent.classList.remove('blur');
    }
  }
  window.addEventListener('resize', triggerOnPalm);
  triggerOnPalm();
});