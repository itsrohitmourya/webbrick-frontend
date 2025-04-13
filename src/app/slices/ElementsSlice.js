import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Elements: [
    {
      preview: "/nav1.png",
      type: "nav",
      name: "Nav Bar",
      code: {
        html: `<nav class="navbar" role="navigation">
        <a href="#" class="navbar__logo">Brand</a>
        <button class="navbar__toggle" aria-label="Toggle navigation" id="navbarToggle">☰</button>
        <ul class="navbar__menu" id="navbarMenu">
            <li class="navbar__item"><a href="#home" class="navbar__link">Home</a></li>
            <li class="navbar__item"><a href="#about" class="navbar__link">About</a></li>
            <li class="navbar__item"><a href="#services" class="navbar__link">Services</a></li>
            <li class="navbar__item"><a href="#contact" class="navbar__link">Contact</a></li>
        </ul>
    </nav>`,
        css: `:root {
            --primary-color: #007bff;
            --text-color: #fff;
            --hover-color: #0056b3;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--primary-color);
            padding: 1rem 2rem;
        }

        .navbar__logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--text-color);
            text-decoration: none;
        }

        .navbar__menu {
            list-style: none;
            display: flex;
            gap: 1rem;
        }



        .navbar__link {
            color: var(--text-color);
            text-decoration: none;
            font-size: 1rem;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: background 0.3s ease-in-out;
        }

        .navbar__link:hover, .navbar__link:focus {
            background: var(--hover-color);
        }

        .navbar__toggle {
            display: none;
            font-size: 1.5rem;
            color: var(--text-color);
            cursor: pointer;
            background: none;
            border: none;
        }

        @media (max-width: 768px) {
            .navbar__menu {
                display: none;
                flex-direction: column;
                background: var(--primary-color);
                position: absolute;
                top: 60px;
                right: 0;
                width: 100%;
                text-align: center;
                padding: 1rem 0;
            }
            .navbar__menu.active {
                display: flex;
            }
            .navbar__toggle {
                display: block;
            }
        }
          `,
        js: `document.getElementById("navbarToggle").addEventListener("click", function () {
            document.getElementById("navbarMenu").classList.toggle("active");
        });`,
      },
    },
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
