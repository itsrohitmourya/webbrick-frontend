import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sitePages: [],
  curWorkPage: 0,
  createPagePopUP: false,
  boilerPlateCode: `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <style>
          *{
              margin: 0;
              padding: 0;
          }
          body{
              background-color: white;
          }
        [dropzone="true"] {
         border: 2px dashed blue;
        }
        
      </style>
  </head>
  
  <body>
  <h1>hello, world</h1>
  </body>
  <script id='userScript'></script>
  <script id="devScripts">
  let allElments = null
  if(typeof(allElements) === "null" ){
    const allElements = document.querySelectorAll("*");
  }
allElements.forEach(el => el.setAttribute("draggable", "true"));


       class DragAndDrop {
          constructor(draggableSelector, containerSelector) {
              this.draggedElement = null;
              this.draggableSelector = draggableSelector;
              this.container = document.querySelector(containerSelector);
              this.init();
          }
  
          init() {
              document.addEventListener('dragstart', this.handleDragStart.bind(this));
              document.addEventListener('dragend', this.handleDragEnd.bind(this));
              document.addEventListener('dragover', this.handleDragOver.bind(this));
              document.addEventListener('drop', this.handleDrop.bind(this));
              document.body.addEventListener('drop', this.handleBodyDrop.bind(this));
          }
  
          handleDragStart(event) {
              if (event.target.matches(this.draggableSelector)) {
                  this.draggedElement = event.target;
                  event.target.style.opacity = '0.5';
  
                  // Make all elements drop zones except the dragged one
                  document.querySelectorAll(this.draggableSelector).forEach(el => {
                      if (el !== this.draggedElement) {
                          el.setAttribute('dropzone', 'true');
                      }
                  });
  
                  document.body.setAttribute('dropzone', 'true');
              }
          }
  
          handleDragEnd(event) {
              event.target.style.opacity = '1';
  
              // Remove dropzone attributes from all elements
              document.querySelectorAll('[dropzone="true"]').forEach(el => {
                  el.removeAttribute('dropzone');
              });
  
              this.draggedElement = null;
          }
  
          handleDragOver(event) {
              event.preventDefault();
          }
          handleDrop(event) {
      event.preventDefault();
      let dropTarget = event.target;
  
      if (dropTarget.getAttribute('dropzone') === 'true' && this.draggedElement && dropTarget !== this.draggedElement) {
          dropTarget.appendChild(this.draggedElement);
          
          // Ensure dropped element remains draggable
          this.draggedElement.setAttribute("draggable", "true");
  
          this.updateDropZones(); // Update drop zones dynamically
      }
  }
  
          handleBodyDrop(event) {
              event.preventDefault();
              if (this.draggedElement) {
                  document.body.appendChild(this.draggedElement); // Drop to body if not on an element
                  this.updateDropZones();
              }
          }
  
          updateDropZones() {
              // Make sure all elements inside the body remain drop zones except the one being dragged
              document.querySelectorAll(this.draggableSelector).forEach(el => {
                  el.setAttribute('dropzone', 'true');
              });
              document.body.setAttribute('dropzone', 'true');
          }
      }
  
      // Initialize Drag and Drop with entire body support
      new DragAndDrop('[draggable="true"]', 'body');
  </script>
  </html>`,
  isCodePreview: false,
};

const sitePagesSlice = createSlice({
  name: "sitePages",
  initialState,
  reducers: {
    addPages: (state, action) => {
      const { name, code } = action.payload;
      state.sitePages.push({
        pageName: name,
        pageCode: code,
      });
    },

    createPage: (state) => {
      state.createPagePopUP = !state.createPagePopUP;
    },
    removePages: (state, action) => {
      const { index } = action.payload;
      state.sitePages = state.sitePages.filter((_, i) => i !== index);
    },

    setCurWorkPage: (state, action) => {
      state.curWorkPage = action.payload.index;
    },
    // this channel is used to update on autosave or manual save page code
    setPageCode: (state, action) => {
      state.sitePages[state.curWorkPage].pageCode = action.payload.code;
    },
    setisCodePreview: (state) => {
      state.isCodePreview = !state.isCodePreview;
    },
  },
});

export const {
  addPages,
  removePages,
  setCurWorkPage,
  createPage,
  setPageCode,
  setisCodePreview,
} = sitePagesSlice.actions;

export default sitePagesSlice.reducer;
