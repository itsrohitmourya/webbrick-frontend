import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scratchBuild: {
    basicLayout: [
      {
        name: "container",
        id: "con",
        class: "con-box",
        code: [
          { html: `<div class="con-box">Container</div>` },
          {
            css: `
            .con-box {
              width: 100%;
              padding: 1rem 1rem;
              background-color: #f0f0f0;
              border: 2px solid #333;
              text-align: center;
              display : flex;
              jusdtify-content: center;
              align-items: center;
            }
          `,
          },
        ],
      },
      {
        name: "wrapper",
        id: "wrap",
        class: "wrapper-box",
        code: [
          {
            html: `<div class="wrapper-box">
                    
                   </div>`,
          },
          {
            css: `
            .wrapper-box {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-top: 10px;
              padding: 10px;
              background: #ddd;
              border: 1px solid #444;
            }
          `,
          },
        ],
      },
      {
        name: "block",
        id: "blk",
        class: "block-box",
        code: [
          { html: `<div class="block-box">Block</div>` },
          {
            css: `
            .block-box {
              flex: 1;
              min-height: 200px;
              min-width: 200px;
              padding: 20px;
              background: #bbb;
              border: 1px solid #666;
              text-align: center;
            }
          `,
          },
        ],
      },
      {
        name: "section",
        id: "sec",
        class: "sec-box",
        code: [
          { html: `<section class="sec-box">Section</section>` },
          {
            css: `
            .sec-box {
              padding: 50px 20px;
              background: #e0e0e0;
              margin: 20px 0;
              border: 2px dashed #444;
              text-align: center;
              font-size: 20px;
              font-weight: bold;
            }
          `,
          },
        ],
      },
      {
        name: "flex",
        id: "flex-con",
        class: "flex-container",
        code: [
          { html: `<div class="flex-container">Flex Container</div>` },
          {
            css: `
            .flex-container {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100vh;
              background: #f0f0f0;
              border: 2px solid #333;
            }
          `,
          },
        ],
      },
      {
        name: "grid",
        id: "grid",
        class: "grid-box",
        code: [
          {
            html: `<div class="grid-box">
                     
                   </div>`,
          },
          {
            css: `
            .grid-box {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 10px;
              padding: 20px;
              background: #ccc;
            }
            
          `,
          },
        ],
      },
      {
        name: "header",
        id: "header",
        class: "header-box",
        code: [
          { html: `<header class="header-box">Website Header</header>` },
          {
            css: `
            .header-box {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              padding: 20px;
              border: 1px solid #333;
              background: #fff;
              margin-bottom: 10px;
            }
          `,
          },
        ],
      },
      {
        name: "main",
        id: "main",
        class: "main-box",
        code: [
          { html: `<main class="main-box"></main>` },
          {
            css: `
            .main-box {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-bottom: 10px;
            }
          `,
          },
        ],
      },
      {
        name: "article",
        id: "article",
        class: "article-box",
        code: [
          {
            html: `
            <article class="article-box">
            </article>
          `,
          },
          {
            css: `
            .article-box {
              padding: 15px;
              border: 1px dashed #444;
              margin-top: 10px;
              background: #fff;
            }
          `,
          },
        ],
      },
      {
        name: "aside",
        id: "aside",
        class: "aside-box",
        code: [
          { html: `<aside class="aside-box"></aside>` },
          {
            css: `
            .aside-box {
              flex: 1;
              padding: 20px;
              border: 1px solid #333;
              background: #eee;
            }
          `,
          },
        ],
      },
      {
        name: "figure",
        id: "figure",
        class: "figure-box",
        code: [
          {
            html: `
            <figure class="figure-box">
            </figure>
          `,
          },
          {
            css: `
            .figure-box {
              text-align: center;
              margin: 20px 0;
            }
            .figure-box img {
              max-width: 100%;
              height: auto;
            },
          `,
          },
        ],
      },
      {
        name: "figcaption",
        id: "figcaption",
        class: "figcaption-box",
        code: [
          { html: `<figcaption class="figcaption-box">Figure Caption</figcaption>` },
          { css: `
            .figcaption-box {
              font-style: italic;
              text-align: center;
              margin-top: 5px;
              color: #666;
            }
          ` },
        ],
      },
      {
        name: "footer",
        id: "footer",
        class: "footer-box",
        code: [
          {
            html: `<footer class="footer-box">Website Footer &copy; 2025</footer>`,
          },
          {
            css: `
            .footer-box {
              text-align: center;
              background: #222;
              color: white;
              padding: 10px;
              margin-top: 20px;
            }
          `,
          },
        ],
      },
      {
        name: "nav",
        id: "nav",
        class: "nav-box",
        code: [
          {
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
          },
          {
            css: `
             :root {
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
          },
          {
            js : ` document.getElementById("navbarToggle").addEventListener("click", function () {
            document.getElementById("navbarMenu").classList.toggle("active");
        });`
          }
        ],
      },
    ],
    textFormatting: [
      {
        name: "heading",
        id: "heading",
        class: "heading-box",
        code: [
          { html: `<h1 class="heading-box">Heading</h1>` },
          {
            css: `
              .heading-box {
                font-size: 2em;
                font-weight: bold;
                margin-bottom: 10px;
              }
            `,
          },
        ],
      },
      {
        name: "paragraph",
        id: "paragraph",
        class: "paragraph-box",
        code: [
          { html: `<p class="paragraph-box">This is a paragraph.</p>` },
          {
            css: `
              .paragraph-box {
                font-size: 1em;
                line-height: 1.5;
                margin-bottom: 10px;
              }
            `,
          },
        ],
      },
      {
        name: "anchor",
        id: "anchor",
        class: "anchor-box",
        code: [
          { html: `<a href="https://example.com" class="anchor-box">Visit Example</a>` },
          {
            css: `
              .anchor-box {
                color: blue;
                text-decoration: underline;
                cursor: pointer;
              }
            `,
          },
        ],
      },
      {
        name: "span",
        id: "span",
        class: "span-box",
        code: [{ html: `<span class="span-box">Inline Text</span>` }],
      },
      {
        name: "div",
        id: "div",
        class: "div-box",
        code: [{ html: `<div class="div-box">Block Container</div>` }],
      },
      { name: "br", id: "br", class: "br-box", code: [{ html: `Line Break<br>Next Line` }] },
      { name: "hr", id: "hr", class: "hr-box", code: [{ html: `<hr class="hr-box">` }] },
      { name: "bold", id: "bold", class: "bold-box", code: [{ html: `<b class="bold-box">Bold Text</b>` }] },
      { name: "strong", id: "strong", class: "strong-box", code: [{ html: `<strong class="strong-box">Important Text</strong>` }] },
      { name: "italic", id: "italic", class: "italic-box", code: [{ html: `<i class="italic-box">Italic Text</i>` }] },
      { name: "emphasized", id: "emphasized", class: "emphasized-box", code: [{ html: `<em class="emphasized-box">Emphasized Text</em>` }] },
      { name: "underlined", id: "underlined", class: "underlined-box", code: [{ html: `<u class="underlined-box">Underlined Text</u>` }] },
      { name: "mark", id: "mark", class: "mark-box", code: [{ html: `<mark class="mark-box">Highlighted Text</mark>` }] },
      { name: "small", id: "small", class: "small-box", code: [{ html: `<small class="small-box">Smaller Text</small>` }] },
      { name: "superscript", id: "superscript", class: "sup-box", code: [{ html: `2<sup class="sup-box">5</sup>` }] },
      { name: "subscript", id: "subscript", class: "sub-box", code: [{ html: `H<sub class="sub-box">2</sub>O` }] },
      { name: "code", id: "code", class: "code-box", code: [{ html: `<code class="code-box">Inline Code</code>` }] },
      { name: "preformatted", id: "preformatted", class: "pre-box", code: [{ html: `<pre class="pre-box">function example() { console.log("Hello World"); }</pre>` }] },
      {
        name: "blockquote",
        id: "blockquote",
        class: "blockquote-box",
        code: [{ html: `<blockquote class="blockquote-box">This is a blockquote.</blockquote>` }],
      },
      {
        name: "abbr",
        id: "abbr",
        class: "abbr-box",
        code: [{ html: `<abbr class="abbr-box" title="HyperText Markup Language">HTML</abbr>` }],
      },
      {
        name: "cite",
        id: "cite",
        class: "cite-box",
        code: [{ html: `<cite class="cite-box">Citation Text</cite>` }],
      },
      {
        name: "kbd",
        id: "kbd",
        class: "kbd-box",
        code: [{ html: `<kbd class="kbd-box">Ctrl + C</kbd>` }],
      },
      {
        name: "strikethrough",
        id: "strikethrough",
        class: "strikethrough-box",
        code: [{ html: `<s class="strikethrough-box">Strikethrough Text</s>` }],
      },
    ],
    tables: [
      { name: "table", id: "table", class: "table-box", code: [{ html: `<table class="table-box"></table>` }] },
      { name: "table-row", id: "tr", class: "tr-box", code: [{ html: `<tr class="tr-box"></tr>` }] },
      { name: "table-header", id: "th", class: "th-box", code: [{ html: `<th class="th-box"></th>` }] },
      { name: "table-data", id: "td", class: "td-box", code: [{ html: `<td class="td-box"></td>` }] },
      { name: "table-head", id: "thead", class: "thead-box", code: [{ html: `<thead class="thead-box"></thead>` }] },
      { name: "table-body", id: "tbody", class: "tbody-box", code: [{ html: `<tbody class="tbody-box"></tbody>` }] },
      { name: "table-footer", id: "tfoot", class: "tfoot-box", code: [{ html: `<tfoot class="tfoot-box"></tfoot>` }] },
    ],
    lists: [
      {
        name: "unordered-list",
        id: "ul",
        class: "ul-box",
        code: [{ html: `<ul class="ul-box"></ul>` }],
      },
      {
        name: "ordered-list",
        id: "ol",
        class: "ol-box",
        code: [{ html: `<ol class="ol-box"></ol>` }],
      },
      {
        name: "list-item",
        id: "li",
        class: "li-box",
        code: [{ html: `<li class="li-box"></li>` }],
      },
      {
        name: "description-list",
        id: "dl",
        class: "dl-box",
        code: [{ html: `<dl class="dl-box"></dl>` }],
      },
      {
        name: "description-term",
        id: "dt",
        class: "dt-box",
        code: [{ html: `<dt class="dt-box"></dt>` }],
      },
      {
        name: "description-definition",
        id: "dd",
        class: "dd-box",
        code: [{ html: `<dd class="dd-box"></dd>` }],
      },
    ],
    forms: [
      { name: "form", id: "form", class: "form-box", code: [{ html: `<form class="form-box"></form>` }] },
      { name: "input", id: "input", class: "input-box", code: [{ html: `<input class="input-box">` }] },
      { name: "textarea", id: "textarea", class: "textarea-box", code: [{ html: `<textarea class="textarea-box"></textarea>` }] },
      { name: "button", id: "button", class: "button-box", code: [{ html: `<button class="button-box"></button>` }] },
      { name: "select", id: "select", class: "select-box", code: [{ html: `<select class="select-box"></select>` }] },
      { name: "option", id: "option", class: "option-box", code: [{ html: `<option class="option-box"></option>` }] },
      { name: "label", id: "label", class: "label-box", code: [{ html: `<label class="label-box"></label>` }] },
      { name: "fieldset", id: "fieldset", class: "fieldset-box", code: [{ html: `<fieldset class="fieldset-box"></fieldset>` }] },
      { name: "legend", id: "legend", class: "legend-box", code: [{ html: `<legend class="legend-box"></legend>` }] },
    ],
    media: [
      { name: "image", id: "img", class: "img-box", code: [{ html: `<img class="img-box">` }, {css :""}] },
      { name: "audio", id: "audio", class: "audio-box", code: [{ html: `<audio class="audio-box"></audio>` }] },
      { name: "video", id: "video", class: "video-box", code: [{ html: `<video class="video-box"></video>` }] },
      { name: "source", id: "source", class: "source-box", code: [{ html: `<source class="source-box">` }] },
      { name: "iframe", id: "iframe", class: "iframe-box", code: [{ html: `<iframe class="iframe-box"></iframe>` }] },
      { name: "figcaption", id: "figcaption", class: "figcaption-box", code: [{ html: `<figcaption class="figcaption-box"></figcaption>` }] },
    ],
    interactive: [
      { name: "details", id: "details", class: "details-box", code: [{ html: `<details class="details-box"></details>` }] },
      { name: "summary", id: "summary", class: "summary-box", code: [{ html: `<summary class="summary-box"></summary>` }] },
      { name: "dialog", id: "dialog", class: "dialog-box", code: [{ html: `<dialog class="dialog-box"></dialog>` }] },
    ],
  },
};

const scratchBuildSlice = createSlice({
  name: "scratchBuild",
  initialState,
  reducers: {
    addComponent: (state, action) => {
      const { category, component } = action.payload;
      if (!state.scratchBuild[category]) {
        state.scratchBuild[category] = [];
      }
      state.scratchBuild[category].push(component);
    },
  },
});

export const selectAllComponents = (state) => state.scratchBuild.scratchBuild;
export const selectCompByCat = (state, category) =>
  state.scratchBuild.scratchBuild[category] || [];
export const selectCompByName = (state, category, name) =>
  state.scratchBuild.scratchBuild[category]?.find(
    (comp) => comp.name === name
  ) || null;

export const { addComponent } = scratchBuildSlice.actions;
export default scratchBuildSlice.reducer;
