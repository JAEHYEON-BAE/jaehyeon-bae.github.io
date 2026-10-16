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
  const onPalm = 600;
  const backgroundElements = [
    document.querySelector('.site-header'),
    document.querySelector('main'),
    document.querySelector('.site-footer')
  ].filter(Boolean);

  menuIcon.addEventListener('click', function() {
    if (opened) {
      closeSidebar();
      return;
    }
    trigger.classList.add('open');
    opened = true;
    trigger.inert = false;
    mask.setAttribute('aria-hidden', 'false');
    menuIcon.setAttribute('aria-expanded', 'true');
    mask.style.pointerEvents = 'auto';
    mask.style.visibility = 'visible';
    // 블러 적용(콘텐츠를 알아볼 수 없을 만큼) — 표시는 opacity 트랜지션으로 페이드 인
    mask.style.backdropFilter = 'blur(18px)';
    mask.style.webkitBackdropFilter = 'blur(18px)';
    requestAnimationFrame(function() {
      if (opened) mask.style.opacity = '1';
    });
    close.focus();
    backgroundElements.forEach(function(element) { element.inert = true; });
  });

  function closeSidebar() {
    if (!opened) return;
    trigger.classList.remove('open');
    opened = false;
    backgroundElements.forEach(function(element) { element.inert = false; });
    menuIcon.setAttribute('aria-expanded', 'false');
    const focusTarget = window.innerWidth <= onPalm
      ? menuIcon
      : document.querySelector('.nav-bar-page-link.active') || document.querySelector('.nav-bar-page-link');
    if (focusTarget) focusTarget.focus();
    trigger.inert = true;
    mask.setAttribute('aria-hidden', 'true');
    mask.style.pointerEvents = 'none';
    // opacity 0으로 즉시 페이드 아웃 시작 (블러 + 흰색 그라데이션 함께 사라짐)
    mask.style.opacity = '0';
    if (window.innerWidth > onPalm) {
      mask.style.visibility = 'hidden';
      mask.style.backdropFilter = 'none';
      mask.style.webkitBackdropFilter = 'none';
    }
  }
  close.addEventListener('click', closeSidebar);
  mask.addEventListener('click', function(event) {
    if (event.target === mask) closeSidebar();
  }); /** 바깥(마스크) 탭으로 닫기 */

  document.addEventListener('keydown', function(event) {
    if (!opened) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSidebar();
    } else if (event.key === 'Tab') {
      const controls = trigger.querySelectorAll('button, a[href]');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /** Header Menu Trigger: interact with window width */
  function triggerOnPalm() {
    if (opened && window.innerWidth > onPalm) {
      closeSidebar();
    }
  }
  window.addEventListener('resize', triggerOnPalm);
  triggerOnPalm();

  // 페이드 아웃이 끝나면 완전히 숨기고 블러 해제 (iOS backdrop-filter 잔류 레이어 방지)
  mask.addEventListener('transitionend', function(e) {
    if (!opened && e.target === mask && e.propertyName === 'opacity') {
      mask.style.visibility = 'hidden';
      mask.style.backdropFilter = 'none';
      mask.style.webkitBackdropFilter = 'none';
    }
  });
});
