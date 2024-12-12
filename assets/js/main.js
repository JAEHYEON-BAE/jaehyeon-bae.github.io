/** main.js */
/** This Javascript file works for all pages & posts */

document.addEventListener("DOMContentLoaded", function() {

  /** Header Menu Trigger */
  const menuIcon = document.getElementById('menu-icon');
  const trigger = document.querySelector('.trigger');
  const menu_icon_svg = document.querySelector('.menu-icon > svg');

  let checked = false;
  menuIcon.addEventListener('click', function() {
    if (checked === true) {
      checked = false;
    } else {
      checked = true;
    }
    if (checked) {
      trigger.style.transform = 'translateX(0)';
      menu_icon_svg.style.transform = 'rotate(270deg)';
    } else {
      trigger.style.transform = 'translateX(100%)';
      menu_icon_svg.style.transform = 'rotate(0deg)';
    }
  });


  /** Header Menu Trigger: interact with window width */
  const onPalm = 600;
  function triggerOnPalm() {
    if (checked && window.innerWidth > onPalm) {
      trigger.style.transform = 'translateX(100%)';
      menu_icon_svg.style.transform = 'rotate(0deg)';
      checked = false;
    }
  }
  window.addEventListener('resize', triggerOnPalm);
  triggerOnPalm();
});