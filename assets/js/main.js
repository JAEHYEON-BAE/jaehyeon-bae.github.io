/** main.js */
/** This Javascript file works for all pages & posts */

if (window.location.pathname!=="/") {
  document.addEventListener("DOMContentLoaded", function() {
  
    const menuIcon = document.querySelector('.menu-icon');
    const close = document.querySelector('.close');
    const trigger = document.querySelector('.trigger'); /** trigger == sidebar */  
    const menu_icon_svg = document.querySelector('.menu-icon > svg');
    const mask = document.querySelector('.mask');
  
    /** Header Menu Trigger */
    let opened = false;
    
    menuIcon.addEventListener('click', function() {
      trigger.style.transform = 'translateX(0)';
      opened = true;
      mask.style.pointerEvents = 'auto';
      mask.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      mask.style.backdropFilter = 'blur(2px)';
    });
    close.addEventListener('click', function() {
      trigger.style.transform = 'translateX(100%)';
      opened = false;
      mask.style.pointerEvents = 'none';
      mask.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      mask.style.backdropFilter = 'none';
    });
    mask.addEventListener('click', function() {
      trigger.style.transform = 'translateX(100%)';
      opened = false;
      mask.style.pointerEvents = 'none';
      mask.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      mask.style.backdropFilter = 'none';
    });
  
    /** Header Menu Trigger: interact with window width */
    const onPalm = 600;
    function triggerOnPalm() {
      if (opened && window.innerWidth > onPalm) {
        trigger.style.transform = 'translateX(100%)';
        opened = false;
        mask.style.pointerEvents = 'none';
        mask.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        mask.style.backdropFilter = 'none';
      }
    }
    window.addEventListener('resize', triggerOnPalm);
    triggerOnPalm();
  });
}