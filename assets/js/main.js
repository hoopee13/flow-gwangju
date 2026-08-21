/* ==========================================================================
   FLOW GWANGJU — main.js
   ========================================================================== */

/**
 * 채널 링크는 이 한 곳에서만 관리합니다.
 * 실제 링크가 준비되면 아래 값만 교체하면 사이트 전체에 반영됩니다.
 * (HTML에서 data-link="apply" 처럼 표시된 요소의 href가 자동으로 채워집니다.)
 */
const FLOW_LINKS = {
  apply: "https://forms.gle/",          // 신청 폼 (구글폼 / 타이포폼 등)
  kakao: "https://pf.kakao.com/",       // 카카오톡 채널 (문의·안내 통합 창구)
  instagram: "https://instagram.com/flow.gwangju",
  host: "https://forms.gle/",           // 호스트 지원 폼
  partner: "mailto:hello@flowgwangju.kr", // 파트너 제휴 문의
  email: "mailto:hello@flowgwangju.kr",
};

(function () {
  "use strict";

  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  ready(function () {
    /* --- 1. 채널 링크 주입 ------------------------------------------- */
    document.querySelectorAll("[data-link]").forEach((el) => {
      const key = el.dataset.link;
      const url = FLOW_LINKS[key];
      if (!url) return;
      el.setAttribute("href", url);
      if (/^https?:/.test(url)) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    });

    /* --- 2. 모바일 내비게이션 ---------------------------------------- */
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#site-nav");
    if (toggle && nav) {
      const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        nav.classList.toggle("is-open", open);
        document.body.style.overflow = open ? "hidden" : "";
      };
      toggle.addEventListener("click", () =>
        setOpen(toggle.getAttribute("aria-expanded") !== "true")
      );
      nav.addEventListener("click", (e) => {
        if (e.target.closest("a")) setOpen(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 860) setOpen(false);
      });
    }

    /* --- 3. 헤더 그림자 ---------------------------------------------- */
    const header = document.querySelector(".header");
    if (header) {
      const onScroll = () =>
        header.classList.toggle("is-stuck", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* --- 4. 스크롤 등장 애니메이션 ------------------------------------ */
    const revealables = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealables.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealables.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
        io.observe(el);
      });
    }

    /* --- 5. 마퀴 트랙 복제 (끊김 없는 루프) ---------------------------- */
    document.querySelectorAll(".marquee").forEach((marquee) => {
      const track = marquee.querySelector(".marquee__track");
      if (!track || track.dataset.cloned) return;
      const clone = track.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      marquee.appendChild(clone);
      track.dataset.cloned = "true";
    });

    /* --- 6. 현재 연도 ------------------------------------------------ */
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    /* --- 7. 참가 가능 연령 안내 (행사일 기준 만 20–34세) ---------------- */
    const yearHint = document.querySelector("[data-birth-range]");
    if (yearHint) {
      const now = new Date().getFullYear();
      yearHint.textContent = `${now - 34}년 ~ ${now - 20}년생 전후`;
    }
  });
})();
