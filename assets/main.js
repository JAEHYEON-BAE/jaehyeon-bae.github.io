document.addEventListener('DOMContentLoaded', function() {
  const navTrigger = document.getElementById('nav-trigger');
  const trigger = document.querySelector('.trigger');
  const menu_icon_svg = document.querySelector('.menu-icon > svg');

  navTrigger.addEventListener('click', function() {
    if (navTrigger.checked) {
      trigger.style.transform = 'translateY(0)';
      menu_icon_svg.style.transform = 'rotate(270deg)';
    } else {
      trigger.style.transform = 'translateY(-100%)';
      menu_icon_svg.style.transform = 'rotate(0deg)';
    }
  });
});

