import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Elements: [
    {
      preview: "/nav1.png",
      type: "nav",
      name: "Nav Bar",
      code: {
        html: `<nav id="a1b2c3" class="d4e5f6 draggable" draggable="true" role="navigation">
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
      preview: "/nav2.png",
      type: "nav",
      name: "Nav Bar",
      code: { 
        html: `  <nav class="wbNav12x-container draggable" draggable="true" role="navigation" aria-label="Main navigation">
    <div class="wbNav12x-brand">WebBrand</div>
    <div class="wbNav12x-hamburger" id="wbNav12x-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul class="wbNav12x-menu" id="wbNav12x-menu">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
`,
        css: `
  body {
      font-family: 'Poppins', sans-serif;
    }
    .wbNav12x-container {
      width: 100%;
      background-color: #111111;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 999;
    }

    .wbNav12x-brand {
      font-size: 24px;
      font-weight: 600;
      color: #4fd1c5;
    }

    .wbNav12x-menu {
      display: flex;
      gap: 32px;
    }

    .wbNav12x-menu li {
      list-style: none;
    }

    .wbNav12x-menu a {
      text-decoration: none;
      color: #ffffff;
      font-size: 16px;
      transition: color 0.3s;
    }

    .wbNav12x-menu a:hover {
      color: #4fd1c5;
    }

    .wbNav12x-hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 28px;
      height: 24px;
      gap: 5px;
      z-index: 1001;
    }

    .wbNav12x-hamburger span {
      display: block;
      height: 3px;
      width: 100%;
      background: #ffffff;
      border-radius: 2px;
      transition: all 0.3s ease-in-out;
    }

    /* Transform hamburger to X */
    .wbNav12x-hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }

    .wbNav12x-hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .wbNav12x-hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    @media (max-width: 768px) {
      .wbNav12x-menu {
        flex-direction: column;
        position: absolute;
        top: 58px;
        left: 0;
        width: 100%;
        background-color: #111111;
        padding: 24px;
        gap: 20px;
        display: none;
      }

      .wbNav12x-menu.active {
        display: flex;
      }

      .wbNav12x-hamburger {
        display: flex;
      }
    }
`,
        js: `const toggle = document.getElementById('wbNav12x-toggle');
    const menu = document.getElementById('wbNav12x-menu');

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });
`,
      },
    },
    {
      preview: "/hero1.png",
      type: "hero",
      name: "Hero Section",
      code: {
        html: `<section id="hero-banner-wb-32ga" class="hero-banner-wb-32ga draggable" draggable="true" role="banner">
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
</section>
`,
        css: `.hero-banner-wb-32ga {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 1.25rem;
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
  font-size: 2.5rem;
  margin-bottom: 0.9375rem;
  color: #61dafb;
}

.hero-subtext-wb-f7ne {
  font-size: 1.2rem;
  margin-bottom: 1.5625rem;
  color: #dcdcdc;
}

.hero-cta-btn-wb-7ldp {
  padding: 0.75rem 1.5625rem;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 1.5625rem;
  cursor: pointer;
  font-size: 1rem;
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
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
}

@media (max-width: 48rem) {
  .hero-container-wb-2x9a {
    flex-direction: column;
  }

  .hero-title-wb-q1z4 {
    font-size: 2rem;
  }

  .hero-subtext-wb-f7ne {
    font-size: 1rem;
  }

  .hero-cta-btn-wb-7ldp {
    font-size: 0.9rem;
  }
}
`,
        js: "",
      },
    },
    {
      preview: "/footer1.png",
      type: "footer",
      name: "footer",
      code: {
        html: `
            <footer class="wb-ftr2025-footer draggable" draggable="true" role="contentinfo">
              <div class="wb-ftr2025-container">
                <p class="wb-ftr2025-text">
                  &copy; <span id="wb-ftr2025-year">2025</span> WebBrick. All rights reserved.
                </p>
                <nav class="wb-ftr2025-nav" aria-label="Footer Navigation">
                  <ul class="wb-ftr2025-links">
                    <li><a class="wb-ftr2025-link" href="/privacy-policy">Privacy Policy</a></li>
                    <li><a class="wb-ftr2025-link" href="/terms-of-service">Terms of Service</a></li>
                    <li><a class="wb-ftr2025-link" href="/contact">Contact Us</a></li>
                  </ul>
                </nav>
              </div>
            </footer>
          `,
        css: `
            .wb-ftr2025-footer {
              background-color: #1e293b;
              color: #f1f5f9;
              padding: 24px 16px;
              text-align: center;
              font-size: 14px;
            }
        
            .wb-ftr2025-container {
              max-width: 1024px;
              margin: 0 auto;
            }
        
            .wb-ftr2025-text {
              margin-bottom: 12px;
            }
        
            .wb-ftr2025-links {
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: center;
              gap: 16px;
              flex-wrap: wrap;
            }
        
            .wb-ftr2025-link {
              color: #94a3b8;
              text-decoration: none;
              transition: color 0.3s ease;
            }
        
            .wb-ftr2025-link:hover {
              color: #38bdf8;
            }
          `,
        js: `
            const footerYear = document.getElementById('wb-ftr2025-year');
            if (footerYear) {
              footerYear.textContent = new Date().getFullYear();
            }
          `,
      },
    },
    {
      preview: "/cta1.png",
      type: "CTA",
      name: "CTA",
      code: {
        html: `<section class="wb-hero2025 draggable" draggable="true">
    <div class="wb-hero2025-container">
      <h1 class="wb-hero2025-title">Build Websites. Effortlessly.</h1>
      <p class="wb-hero2025-subtitle">With WebBrick, design and launch beautiful pages in minutes.</p>
      <a href="#get-started" class="wb-hero2025-btn">Get Started</a>
    </div>
  </section>`,
        css: `.wb-hero2025 {
  background: linear-gradient(to right, #1e293b, #0f172a);
  color: white;
  padding: 80px 20px;
  text-align: center;
}
.wb-hero2025-container {
  max-width: 800px;
  margin: 0 auto;
}
.wb-hero2025-title {
  font-size: 48px;
  margin-bottom: 20px;
}
.wb-hero2025-subtitle {
  font-size: 18px;
  margin-bottom: 30px;
}
.wb-hero2025-btn {
  padding: 12px 24px;
  background-color: #38bdf8;
  color: #0f172a;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}
.wb-hero2025-btn:hover {
  background-color: #0ea5e9;
}`,
        js: "",
      },
    },
    {
      preview: '/teamcard1.png',
      type: 'team-card',
      name: 'Team Card',
      code: {
        html:`<div id="wrapper452"><section class="wb-team2025 draggable" draggable="true">
    <h2 class="wb-team2025-title">Meet Our Team</h2>
    <div class="wb-team2025-grid">
      <div class="wb-team2025-card">
        <img src="/person1.jpg" alt="Jane" class="wb-team2025-img" />
        <h3>Jane Doe</h3>
        <p>Chief Executive Officer</p>
      </div>
      <div class="wb-team2025-card">
        <img src="/person2.png" alt="John" class="wb-team2025-img" />
        <h3>John Smith</h3>
        <p>Lead Developer</p>
      </div>
      <div class="wb-team2025-card">
        <img src="/person3.jpg" alt="Willow" class="wb-team2025-img" />
        <h3>Willow</h3>
        <p>Product Manager</p>
      </div>
      <div class="wb-team2025-card">
        <img src="/person4.png" alt="Jasper" class="wb-team2025-img" />
        <h3>Jasper</h3>
        <p>UI/UX Designer</p>
      </div>
      <div class="wb-team2025-card">
        <img src="/person5.jpg" alt="Finnian" class="wb-team2025-img" />
        <h3>Finnian</h3>
        <p>Marketing Specialist</p>
      </div>
    </div>
  </section></div>`,
        css: `
        #wrapper452{
      font-family:  Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #F5F7FA;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh; */
    }
    .wb-team2025 {
      padding: 50px 30px;
      background: #ffffff;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      max-width: 1000px;
      margin: 20px;
    }

    .wb-team2025-title {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 50px;
      color: #1A1A1A;
      text-transform: capitalize;
      letter-spacing: 1px;
    }

    .wb-team2025-grid {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }

    .wb-team2025-card {
      width: 250px;
      background: #e5e6e8;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      padding: 30px;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .wb-team2025-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    .wb-team2025-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-bottom: 20px;
      border: 5px solid #FFFFFF;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .wb-team2025-card:hover .wb-team2025-img {
      transform: scale(1.1);
    }

    .wb-team2025-card h3 {
      font-size: 22px;
      margin: 15px 0 8px;
      color: #1A1A1A;
      font-weight: 600;
    }

    .wb-team2025-card p {
      font-size: 16px;
      color: #6B7280;
      font-style: normal;
    }

    @media (max-width: 768px) {
      .wb-team2025-card {
        width: 200px;
      }

      .wb-team2025-img {
        width: 100px;
        height: 100px;
      }

      .wb-team2025-title {
        font-size: 32px;
      }
    }
       @media (max-width: 480px) {
      .wb-team2025-card {
        width: 200px;
      }

      .wb-team2025-img {
        width: 80px;
        height: 80px;
      }

      .wb-team2025-title {
        font-size: 28px;
      }
      
    }
      `,
    js:``
      },
    },
    {
      preview: '/feature1.png',
      type: 'feature-card',
      name: 'Feature Card',
      code : {
        html : ` <section class="wb-features2025 draggable" draggable="true">
    <h2 class="wb-features2025-title">Why Choose Us?</h2>
    <div class="wb-features2025-grid">
      <div class="wb-features2025-item">
        <h3>Drag & Drop</h3>
        <p>Easy-to-use builder to design quickly without code.</p>
      </div>
      <div class="wb-features2025-item">
        <h3>Responsive</h3>
        <p>Mobile-friendly designs out of the box.</p>
      </div>
      <div class="wb-features2025-item">
        <h3>Custom Export</h3>
        <p>Download full HTML/CSS/JS files for your projects.</p>
      </div>
    </div>
  </section>`,
  css : `       .wb-features2025 {
  padding: 60px 20px;
  background-color: #f1f5f9;
  text-align: center;
}
.wb-features2025-title {
  font-size: 28px;
  margin-bottom: 30px;
  color: black;
}
.wb-features2025-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}
.wb-features2025-item {
  background: white;
  padding: 20px;
  height: 150px;
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.wb-features2025-item h3, .wb-features2025-item p{
  color: black;
}
`,
js :``,
      },
    },
    {
      preview: '/plan-card1.png',
      type: 'plan-card',
      name: 'Plan Card',
      code: {
        html : `<section class="wb-pricing2025 draggable" draggable="true">
    <h2>Choose Your Plan</h2>
    <div class="wb-pricing2025-grid">
      <div class="wb-pricing2025-card">
        <h3>Free</h3>
        <p>$0 / month</p>
        <ul>
          <li>Basic Builder</li>
          <li>1 Project</li>
        </ul>
        <button>Start Free</button>
      </div>
      <div class="wb-pricing2025-card">
        <h3>Pro</h3>
        <p>$19 / month</p>
        <ul>
          <li>Unlimited Projects</li>
          <li>Export Code</li>
          <li>Premium Support</li>
        </ul>
        <button>Upgrade</button>
      </div>
      <div class="wb-pricing2025-card">
        <h3>Enterprise</h3>
        <p>$49 / month</p>
        <ul>
          <li>Custom Solutions</li>
          <li>Dedicated Support</li>
          <li>Team Collaboration</li>
        </ul>
        <button>Contact Us</button>
      </div>
    </div>
  </section>`,
  css : `
    
    .wb-pricing2025 {
      padding: 60px 20px;
      background: #f8fafc;
      text-align: center;
    }

    .wb-pricing2025 h2 {
      font-size: 36px;
      margin-bottom: 20px;
      color: #333;
    }

    .wb-pricing2025-grid {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }

    .wb-pricing2025-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      width: 280px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .wb-pricing2025-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .wb-pricing2025-card h3 {
      font-size: 24px;
      color: #0ea5e9;
    }

    .wb-pricing2025-card p {
      font-size: 20px;
      margin: 10px 0;
      color: #555;
    }

    .wb-pricing2025-card ul {
      color: black;
      text-align: left;
      margin: 15px 0;
      padding: 0;
      list-style: none;
    }

    .wb-pricing2025-card li {
      color: black;
      margin-bottom: 6px;
      padding-left: 20px;
      position: relative;
    }

    .wb-pricing2025-card li::before {
      content: "✔";
      color: #0ea5e9;
      position: absolute;
      left: 0;
    }

    .wb-pricing2025-card button {
      background: #0ea5e9;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
    }

    .wb-pricing2025-card button:hover {
      background: #0284c7;
    }`,
    js : ``,
      }
    },
    {
      preview: '/newsletter1.png',
      type: 'newsletter',   
      name : 'Newsletter',
      code : {
        html : `<div class="wrapper259">  <section class="wb-newsletter2025 draggable" draggable="true">
    <h2>Stay Updated</h2>
    <p>Subscribe to receive the latest news and updates directly in your inbox.</p>
    <form class="wb-newsletter2025-form">
      <input type="email" placeholder="Enter your email" required />
      <button type="submit">Subscribe</button>
    </form>
  </section></div>`,
  css : `  .wrapper259{
      margin: 0;
      font-family: 'Arial', sans-serif;
      background: #f9fafb;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      height: max-content;
    }  .wb-newsletter2025 {
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      padding: 40px;
      text-align: center;
    }

    .wb-newsletter2025 h2 {
      font-size: 2rem;
      margin-bottom: 10px;
      color: #1e293b;
    }

    .wb-newsletter2025 p {
      font-size: 1rem;
      margin-bottom: 30px;
      color: #64748b;
    }

    .wb-newsletter2025-form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 15px;
      padding: 1rem;
    }

    .wb-newsletter2025-form input {
      padding: 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      width: 100%;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .wb-newsletter2025-form input:focus {
      border-color: #38bdf8;
    }

    .wb-newsletter2025-form input::placeholder {
      color: #94a3b8;
    }

    .wb-newsletter2025-form button {
      background: linear-gradient(135deg, #38bdf8, #0284c7);
      color: white;
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
    }

    .wb-newsletter2025-form button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    }`,
    js: ``,

      }
    },
    {
      preview: '/nav3.png',
      type: 'nav',
      name: 'Nav Bar',
      code: {
       html: `<nav id="navBar_123" class="draggable" draggable="true" aria-label="Main Navigation">
    <div class="navContainer_456">
      <div class="logo_789" aria-label="Website Logo">MyLogo</div>
      <div class="hamburgerMenu_101" aria-label="Toggle Navigation" tabindex="0" role="button" aria-expanded="false">
        <div class="line_112"></div>
        <div class="line_113"></div>
        <div class="line_114"></div>
      </div>
      <ul class="navList_115" aria-hidden="true">
        <li class="navItem_116"><a href="#home" class="navLink_117">Home</a></li>
        <li class="navItem_118"><a href="#about" class="navLink_119">About</a></li>
        <li class="navItem_120"><a href="#services" class="navLink_121">Services</a></li>
        <li class="navItem_122"><a href="#contact" class="navLink_123">Contact</a></li>
      </ul>
    </div>
  </nav>`,
  css: `#navBar_123 {
      background-color: #333;
      color: #fff;
      position: relative;
    }

    .navContainer_456 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
    }

    .logo_789 {
      font-size: 24px;
      font-weight: bold;
    }

    .hamburgerMenu_101 {
      display: none;
      flex-direction: column;
      cursor: pointer;
      transition: transform 0.5s ease;
    }

    .hamburgerMenu_101.animate {
      transform: rotate(180deg) scale(1.1);
      animation: bounce 0.4s ease;
    }

    @keyframes bounce {
      0% { transform: rotate(180deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(180deg) scale(1.1); }
    }

    .line_112, .line_113, .line_114 {
      width: 25px;
      height: 3px;
      background-color: #fff;
      margin: 4px 0;
      transition: all 0.3s ease;
    }

    .navList_115 {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .navItem_116, .navItem_118, .navItem_120, .navItem_122 {
      margin: 0 15px;
    }

    .navLink_117, .navLink_119, .navLink_121, .navLink_123 {
      color: #fff;
      text-decoration: none;
      transition: color 0.3s;
    }

    .navLink_117:hover, .navLink_119:hover, .navLink_121:hover, .navLink_123:hover {
      color: #f0a500;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .navList_115 {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        gap: 2rem;
        padding: 20px 0px;
        background-color: #333;
      }

      .navList_115 li {
        width: max-content;
        text-align: center;
      }
      .navList_115.active {
        display: flex;
      }

      .hamburgerMenu_101 {
        display: flex;
      }
    }`,
    js : `document.addEventListener('DOMContentLoaded', function() {
      const hamburgerMenu = document.querySelector('.hamburgerMenu_101');
      const navList = document.querySelector('.navList_115');

      hamburgerMenu.addEventListener('click', function() {
        const isActive = navList.classList.toggle('active');
        hamburgerMenu.setAttribute('aria-expanded', isActive);
        navList.setAttribute('aria-hidden', !isActive);

        // Animate the hamburger icon
        hamburgerMenu.classList.add('animate');
        setTimeout(() => {
          hamburgerMenu.classList.remove('animate');
        }, 500);
      });

      const navLinks = document.querySelectorAll('.navLink_117, .navLink_119, .navLink_121, .navLink_123');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navList.classList.remove('active');
          hamburgerMenu.setAttribute('aria-expanded', false);
          navList.setAttribute('aria-hidden', true);
        });
      });
    });`
      }
    },
    {
      preview : '/hero2.png',
      type : 'hero',
      name : 'Hero Section',
      code : {
        html : ` <section id="heroSection_a12x" class="draggable" draggable="true">
    <div class="heroImage_w9z">
      <img src="/icon2.png" alt="Hero Image" />
    </div>
    <div class="heroText_q84">
      <h1 class="heroTitle_jd7">Welcome to Web Brick</h1>
      <p class="heroDesc_r2y">
        Build beautiful websites with zero code. Add sections, edit content, and launch in minutes. Your creative freedom starts here.
      </p>
    </div>
  </section>`,
  css : `* {
      box-sizing: border-box;
    }

   

    #heroSection_a12x {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem 10rem;
      padding: 4rem 2rem;
      background-color: #f5f5f5;
    }

    .heroImage_w9z {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .heroImage_w9z img {
      height: 300px;
      width: auto;
      max-width: 100%;
    }

    .heroText_q84 {
      flex: 1;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1.5rem;
      padding: 1rem;
    }

    .heroTitle_jd7 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #222;
      margin: 0;
    }

    .heroDesc_r2y {
      font-size: 1.125rem;
      font-weight: 400;
      color: #555;
      margin: 0;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      #heroSection_a12x {
        flex-direction: column;
        text-align: center;
        padding: 3rem 1rem;
      }

      .heroImage_w9z img {
        height: 200px;
      }

      .heroText_q84 {
        align-items: center;
        text-align: center;
        padding: 1rem;
      }
    }`,
  js :``
      }
    }
  ],
  Toast: false,
};
const ElementsSlice = createSlice({
  name: "Elements",
  initialState,
  reducers: {
    toggleToast: (state) => {
      state.Toast = !state.Toast;
    },
  },
});
export const { toggleToast } = ElementsSlice.actions;
export default ElementsSlice.reducer;
