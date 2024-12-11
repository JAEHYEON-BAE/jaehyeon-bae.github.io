document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname === "/") {
    const slides = document.querySelectorAll('.image-slider .slide');
    let currentSlide = 0;
  
    // 첫 번째 이미지를 보이게 설정
    slides[currentSlide].classList.add('active');
  
    // 슬라이드 전환 함수
    function nextSlide() {
      slides[currentSlide].classList.remove('active'); // 현재 이미지를 숨김
  
      // 다음 이미지로 이동
      currentSlide = (currentSlide + 1) % slides.length;
  
      slides[currentSlide].classList.add('active'); // 다음 이미지를 보이게 설정
    }
  
    // 3초마다 nextSlide 함수를 실행
    setInterval(nextSlide, 3000);
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('menu-icon');
  const trigger = document.querySelector('.trigger');
  const menu_icon_svg = document.querySelector('.menu-icon > svg');

  let checked = false;
  menuIcon.addEventListener('click', function() {
    console.log("clicked");
    if (checked === true) {
      checked = false;
    } else {
      checked = true;
    }
    if (checked) {
      trigger.style.transform = 'translateY(0)';
      menu_icon_svg.style.transform = 'rotate(270deg)';
    } else {
      trigger.style.transform = 'translateY(-100%)';
      menu_icon_svg.style.transform = 'rotate(0deg)';
    }
  });
});

