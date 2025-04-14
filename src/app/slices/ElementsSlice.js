import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Elements: [
    {
      preview: "/nav1.png",
      type: "nav",
      name: "Nav Bar",
      code: {
        html: `<nav id="a1b2c3" class="d4e5f6" role="navigation">
    <a href="#" id="g7h8i9" class="j0k1l2">Brand</a>
    <button id="m3n4o5" class="p6q7r8" aria-label="Toggle navigation">
        <span id="line1" class="line"></span>
        <span id="line2" class="line"></span>
        <span id="line3" class="line"></span>
    </button>
    <ul id="s9t0u1" class="v2w3x4">
        <li id="y5z6a7" class="b8c9d0"><a href="#home" class="e1f2g3">Home</a></li>
        <li id="h4i5j6" class="k7l8m9"><a href="#about" class="n0o1p2">About</a></li>
        <li id="q3r4s5" class="t6u7v8"><a href="#services" class="w9x0y1">Services</a></li>
        <li id="z2a3b4" class="c5d6e7"><a href="#contact" class="f8g9h0">Contact</a></li>
    </ul>
  </nav>`,
        css: `body {
      font-family: Arial, sans-serif;
    }

    #a1b2c3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #007bff;
      padding: 1rem 2rem;
    }

    #g7h8i9 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
      text-decoration: none;
    }

    #s9t0u1 {
      list-style: none;
      display: flex;
      gap: 1rem;
      padding: 0;
    }

    #s9t0u1 li a {
      color: #fff;
      text-decoration: none;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background 0.3s ease-in-out;
    }

    #s9t0u1 li a:hover,
    #s9t0u1 li a:focus {
      background: #0056b3;
    }

    #m3n4o5 {
      display: none;
      font-size: 1.5rem;
      color: #fff;
      cursor: pointer;
      background: none;
      border: none;
      transition: transform 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 5px;
    }

    .line {
      width: 25px;
      height: 3px;
      background-color: #fff;
      transition: transform 0.3s ease-in-out;
    }

    #m3n4o5.open #line1 {
      transform: rotate(45deg) translate(5px, 5px);
    }

    #m3n4o5.open #line2 {
      opacity: 0;
    }

    #m3n4o5.open #line3 {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    /* For small screens (max-width: 768px) */
    @media (max-width: 768px) {
      #s9t0u1 {
        display: none; /* Hide the menu by default on small screens */
        flex-direction: column;
        background: #007bff;
        position: absolute;
        top: 60px;
        right: 0;
        width: 100%;
        text-align: center;
        padding: 1rem 0;
      }

      #s9t0u1.active {
        display: flex; /* Show the menu when the active class is added */
      }

      #m3n4o5 {
        display: flex; /* Show the hamburger icon on small screens */
      }
    }

    /* For larger screens (min-width: 769px) */
    @media (min-width: 769px) {
      #s9t0u1 {
        display: flex; /* Show the menu on large screens */
        flex-direction: row;
      }

      #m3n4o5 {
        display: none; /* Hide the hamburger icon on large screens */
      }
    }
          `,
        js: `const toggleButton = document.getElementById('m3n4o5');
    const navbarMenu = document.getElementById('s9t0u1');

    toggleButton.addEventListener('click', () => {
        navbarMenu.classList.toggle('active'); // Toggle the menu visibility
        toggleButton.classList.toggle('open'); // Toggle the hamburger to cross animation
    });`,
      },
    },
    {
      preview : '/nav2.png',
      type : 'nav',
      name : 'Nav Bar 2',
      code : {
        html : `<nav class="nav-wrap-uniq">
    <div class="brand-uniq">WebBrand</div>
    <ul class="menu-uniq" id="menuToggle">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <div class="hamburger-uniq" id="hamburgerToggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>`,
  css : `
    body {
      font-family: 'Poppins', sans-serif;
    }

    .nav-wrap-uniq {
      position: fixed;
      top: 0;
      width: 100%;
      background-color: rgba(20, 20, 20);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      z-index: 999;
    }

    .brand-uniq {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4fd1c5;
    }

    .menu-uniq {
      list-style: none;
      display: flex;
      gap: 2rem;
    }

    .menu-uniq li a {
      text-decoration: none;
      color: white;
      transition: color 0.3s;
    }

    .menu-uniq li a:hover {
      color: #4fd1c5;
    }

    .hamburger-uniq {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 24px;
      cursor: pointer;
      position: relative;
    }

    .hamburger-uniq span {
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: white;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .hamburger-uniq span:nth-child(1) {
      top: 0;
    }

    .hamburger-uniq span:nth-child(2) {
      top: 10px;
    }

    .hamburger-uniq span:nth-child(3) {
      top: 20px;
    }

    .hamburger-uniq.active span:nth-child(1) {
      transform: rotate(45deg);
      top: 10px;
    }

    .hamburger-uniq.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger-uniq.active span:nth-child(3) {
      transform: rotate(-45deg);
      top: 10px;
    }

    @media (max-width: 768px) {
      .hamburger-uniq {
        display: flex;
      }

      .menu-uniq {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        flex-direction: column;
        background-color: rgba(20, 20, 20);
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        padding: 0 2rem;
      }

      .menu-uniq.active {
        max-height: 300px;
        padding: 1rem 2rem;
      }

      .menu-uniq li {
        text-align: center;
        margin: 0px 0;
      }
    }

    .page-content-uniq {
      padding-top: 100px;
      text-align: center;
    }`,
  js : `const hamburger = document.getElementById('hamburgerToggle');
    const menu = document.getElementById('menuToggle');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });`
      }
    },
    {
      preview : '/hero1.png',
      type : 'hero',
      name : 'Hero Section1',
      code : {
        html : `<section id="hero-banner-wb-32ga" class="hero-banner-wb-32ga">
  <div class="hero-container-wb-2x9a">
    <div class="hero-imagewrap-wb-52jc">
      <img
        src="/icon2.png"
        alt="Web design preview"
        class="hero-image-wb-0apm"
      />
    </div>
    <div class="hero-content-wb-98lv">
      <h1 class="hero-title-wb-q1z4">Design Websites Without Limits</h1>
      <p class="hero-subtext-wb-f7ne">
        Build and launch beautiful, responsive websites faster than ever — with no coding skills required.
      </p>
      <a href="/start" class="hero-cta-btn-wb-7ldp">Get Started Now</a>
    </div>
  </div>
</section>`,
css : `body {
      line-height: 1.6;
    }
    .hero-banner-wb-32ga {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2.5rem 1.25rem; /* 40px 20px converted to rem */
      background: linear-gradient(135deg, #282c34, #3a3f47);
      color: white;
      text-align: center;
    }
    .hero-container-wb-2x9a {
      display: flex;
      flex-wrap: wrap;
      width: 100vw;
      margin: auto;
      align-items: center;
    }
    .hero-content-wb-98lv {
      flex: 1;
      padding: 1.25rem;
    }
    .hero-title-wb-q1z4 {
      font-size: 2.5rem; /* 2.5em remains unchanged */
      margin-bottom: 0.9375rem; /* 15px converted to rem */
      color: #61dafb;
    }
    .hero-subtext-wb-f7ne {
      font-size: 1.2rem; /* 1.2em remains unchanged */
      margin-bottom: 1.5625rem; /* 25px converted to rem */
      color: #dcdcdc;
    }
    .hero-cta-btn-wb-7ldp {
      padding: 0.75rem 1.5625rem; /* 12px 25px converted to rem */
      background-color: #61dafb;
      color: #282c34;
      border: none;
      border-radius: 1.5625rem; /* 25px converted to rem */
      cursor: pointer;
      font-size: 1rem; /* 1em remains unchanged */
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    .hero-cta-btn-wb-7ldp:hover {
      background-color: #4fb8e6;
    }
    .hero-imagewrap-wb-52jc {
      flex: 1;
      text-align: center;
      height: max-content;
      width: max-content;
    }
    .hero-image-wb-0apm {
      max-width: clamp(15rem, 20vw, 30rem); 
      height: auto;
      border-radius: 0.625rem; /* 10px converted to rem */
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2); /* 0 4px 8px converted to rem */
    }
    @media (max-width: 48rem) { /* 768px converted to rem */
      .hero-container-wb-2x9a {
        flex-direction: column;
      }
      .hero-title-wb-q1z4 {
        font-size: 2rem; /* 2em remains unchanged */
      }
      .hero-subtext-wb-f7ne {
        font-size: 1rem; /* 1em remains unchanged */
      }
      .hero-cta-btn-wb-7ldp {
        font-size: 0.9rem; /* 0.9em remains unchanged */
      }
    }`,
js : ''
      }
    }
  ],
  Toast: false
};
const ElementsSlice = createSlice({
  name: "Elements",
  initialState,
  reducers: {
    toggleToast: (state) => {
      state.Toast = !state.Toast
    }
  },
});
export const { toggleToast } = ElementsSlice.actions;
export default ElementsSlice.reducer;
