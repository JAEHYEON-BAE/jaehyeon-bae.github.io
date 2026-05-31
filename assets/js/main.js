/** main.js */
/** This Javascript file works for all pages & posts */

document.addEventListener("DOMContentLoaded", function() {

  const menuIcon = document.querySelector('.menu-icon');
  const close = document.querySelector('.close');
  const trigger = document.querySelector('.trigger'); /** trigger == sidebar */
  const mask = document.querySelector('.mask');

  if (!menuIcon || !close || !trigger || !mask) return;

  /** Header Menu Trigger */
  let opened = false;

  menuIcon.addEventListener('click', function() {
    trigger.classList.add('open');
    opened = true;
    mask.style.pointerEvents = 'auto';
    mask.style.visibility = 'visible';
    // 블러 적용(콘텐츠를 알아볼 수 없을 만큼) — 표시는 opacity 트랜지션으로 페이드 인
    mask.style.backdropFilter = 'blur(18px)';
    mask.style.webkitBackdropFilter = 'blur(18px)';
    requestAnimationFrame(function() { mask.style.opacity = '1'; });
  });

  function closeSidebar() {
    trigger.classList.remove('open');
    opened = false;
    mask.style.pointerEvents = 'none';
    // opacity 0으로 즉시 페이드 아웃 시작 (블러 + 흰색 그라데이션 함께 사라짐)
    mask.style.opacity = '0';
  }
  close.addEventListener('click', closeSidebar);
  mask.addEventListener('click', closeSidebar); /** 바깥(마스크) 탭으로 닫기 */

  /** Header Menu Trigger: interact with window width */
  const onPalm = 600;
  function triggerOnPalm() {
    if (opened && window.innerWidth > onPalm) {
      closeSidebar();
    }
  }
  window.addEventListener('resize', triggerOnPalm);
  triggerOnPalm();

  // 페이드 아웃이 끝나면 완전히 숨기고 블러 해제 (iOS backdrop-filter 잔류 레이어 방지)
  mask.addEventListener('transitionend', function(e) {
    if (!opened && e.propertyName === 'opacity') {
      mask.style.visibility = 'hidden';
      mask.style.backdropFilter = 'none';
      mask.style.webkitBackdropFilter = 'none';
    }
  });
});
