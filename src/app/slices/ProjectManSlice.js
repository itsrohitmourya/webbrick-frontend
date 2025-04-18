import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProject,
  deleteProject,
  getUserProjects,
  getProjectById,
  updateProject,
  updateProjectComplete
} from "../../services/api";

export const updateProComplete = createAsyncThunk(
  'project/updateComplete',
  async ({ id, complete }, { rejectWithValue,dispatch }) => {
    try {
      await updateProjectComplete(id, complete);  
      dispatch(fetchProjects())
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update project!");
    }
  }
);

// ✅ Fetch All Projects with Internal Reducer Call
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue, dispatch }) => {     // ✅ Add dispatch here
    try {
      const { data } = await getUserProjects();
      dispatch(setAllProjects(data));  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch projects");
    }
  }
);


// ✅ Create New Project
export const createNewProject = createAsyncThunk(
  "projects/createNewProject",
  async (projectData, { rejectWithValue, dispatch }) => {
    try {
      // ✅ Create the project
      await createProject(projectData);

      // ✅ Automatically refetch all projects after successful creation
      dispatch(fetchProjects());
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create project");
    }
  }
);


// ✅ Delete Project
export const deleteExistingProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue, dispatch }) => {
    try {
      await deleteProject(projectId);
      dispatch(fetchProjects()); // ✅ Refetch after deletion
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete project");
    }
  }
);

// ✅ Get Project by ID
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async ({projectId, Navigate}, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getProjectById(projectId);
      dispatch(setCurrentProject(data))
      Navigate('/editor')
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch project by ID");
    }
  }
);

// ✅ Update Project by ID
export const updateExistingProject = createAsyncThunk(
  "projects/updateExistingProject",
  async ({ projectId, projectData }, { rejectWithValue, dispatch }) => {
    try {
      await updateProject(projectId, projectData);
      dispatch(fetchProjects());  // ✅ Refetch after updating
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update project");
    }
  }
);

const initialState = {
  projects: [],  // Current working project
  allprojects: [],              // Stores all user projects
  loading: false,
  projectCreatePopUP: false,
  curWorkProject: 0,
  curWorkPage: 0,
  createPagePopUP: false,
  boilerPlateCode:`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Drag & Drop with Context Menu</title>
  <style> * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f4f4f4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .draggable {
    min-height: 80px;
    padding: 15px;
    border: 1px solid #ccc;
    background: #e0e0e0;
    cursor: grab;
    transition: transform 0.2s ease;
  }

  .dragging {
    opacity: 0.5;
    transform: scale(1.05);
  }

  .editing {
    outline: 2px solid #007BFF;
  }

  .context-menu {
    position: absolute;
    background: #333;
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 999;
    width: 260px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .context-menu label {
    margin-left: 5px;
    color: #ccc;
    font-size: 14px;
  }

  .context-menu input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    color: white;
    background: rgba(132, 132, 132, 0.631);
    outline: none;
    border: none;
  }

  .context-menu input:focus {
    box-shadow: 0 0 0 2px #3B82F6;
  }

  .context-menu button {
    background: none;
    border: none;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    text-align: left;
  }

  .context-menu button:hover {
    background: #555;
  }

  .context-menu button.remove {
    color: red;
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
  }

  .wbNav12x-hamburger span {
    display: block;
    height: 3px;
    width: 100%;
    background: #ffffff;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

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
  </style>
</head>

<body>

    <nav class="wbNav12x-container draggable" draggable="true">
      <div class="wbNav12x-brand">WebBrand</div>
      <div class="wbNav12x-hamburger" id="wbNav12x-toggle">
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

    <div class="draggable" draggable="true">Element 1</div>
    <div class="draggable" draggable="true">Element 2</div>
    <div class="draggable" draggable="true">Element 3</div>
    <div class="draggable" draggable="true"><a href="/about">About Us</a></div>
    <div class="draggable" draggable="true"><img src="https://via.placeholder.com/150" alt="Placeholder" width="150" /></div>
    <div class="draggable" draggable="true">
      <iframe width="300" height="180" src="https://www.youtube.com/embed/qR9CRLjG-xk" frameborder="0" allowfullscreen></iframe>
    </div>

  <script>
    const container = document.querySelector("body");
   
    let draggedElement = null;
    let selectedElement = null;
    let currentMenu = null;

    container.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("draggable")) {
        draggedElement = e.target;
        draggedElement.classList.add("dragging");
      }
    });

    container.addEventListener("dragend", () => {
      if (draggedElement) {
        draggedElement.classList.remove("dragging");
        draggedElement = null;
      }
    });

    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      document.querySelectorAll(".drop-indicator").forEach(el => el.remove());

      const indicator = document.createElement("div");
      indicator.className = "drop-indicator";

      if (!afterElement) container.appendChild(indicator);
      else container.insertBefore(indicator, afterElement);
    });

    container.addEventListener("drop", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      if (!afterElement) container.appendChild(draggedElement);
      else container.insertBefore(draggedElement, afterElement);
      document.querySelectorAll(".drop-indicator").forEach(el => el.remove());
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // =================== CONTEXT MENU ===================
    container.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (!e.target.closest(".draggable")) return;

      selectedElement = e.target.closest(".draggable");
      createContextMenu(e.pageX, e.pageY);
    });

    function createContextMenu(x, y) {
      closeContextMenu();
      currentMenu = document.createElement("div");
      currentMenu.className = "context-menu";
      currentMenu.style.left = x + "px";
      currentMenu.style.top = y + "px";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit Text";
      editBtn.onclick = () => {
        selectedElement.setAttribute("contenteditable", "true");
        selectedElement.classList.add("editing");
        selectedElement.focus();
      };

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => {
        if (selectedElement) {
          selectedElement.removeAttribute("contenteditable");
          selectedElement.classList.remove("editing");
          if (urlInput) {
            const child = selectedElement.querySelector("a, img, iframe");
            if (child && child.tagName === "A") child.href = urlInput.value;
            if (child && child.tagName === "IMG") child.src = urlInput.value;
            if (child && child.tagName === "IFRAME") child.src = urlInput.value;
          }
        }
        closeContextMenu();
      };

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove";
      removeBtn.onclick = () => {
        selectedElement.remove();
        closeContextMenu();
      };

      let urlInput = null;
      const link = selectedElement.querySelector("a");
      const img = selectedElement.querySelector("img");
      const iframe = selectedElement.querySelector("iframe");

      if (link || img || iframe) {
        urlInput = document.createElement("input");
        let label = document.createElement("label");

        if (link) {
          urlInput.value = link.href;
          label.textContent = "Edit Link:";
        } else if (img) {
          urlInput.value = img.src;
          label.textContent = "Edit Image URL:";
        } else if (iframe) {
          urlInput.value = iframe.src;
          label.textContent = "Edit Iframe URL:";
        }

        currentMenu.appendChild(label);
        currentMenu.appendChild(urlInput);
      }

      currentMenu.appendChild(editBtn);
      currentMenu.appendChild(saveBtn);
      currentMenu.appendChild(removeBtn);
      document.body.appendChild(currentMenu);
    }

    function closeContextMenu() {
      if (currentMenu) {
        currentMenu.remove();
        currentMenu = null;
      }
    }

    window.addEventListener("click", () => closeContextMenu());
  </script>
</body>

</html>


`,
  isCodePreview: false,
  isfetch: false,
};

const ProjectManSlice = createSlice({
  name: "projectMan",
  initialState,
  reducers: {
    toggleProjectCreatePopUp: (state) => {
      state.projectCreatePopUP = !state.projectCreatePopUP;
    },
    updateCurWorkProject: (state, action) => {
      state.curWorkProject = action.payload;
    },
    addPages: (state, action) => {
      const { name } = action.payload;
      const curProjectOBJ = state.projects[state.curWorkProject];
      if (curProjectOBJ) {
        curProjectOBJ.pages.push({
          pageName: name,
          pageCode: state.boilerPlateCode,
        });
      }
    },
    removePages: (state, action) => {
      const { index } = action.payload;
      const curProjectOBJ = state.projects[state.curWorkProject];
      if (curProjectOBJ) {
        curProjectOBJ.pages = curProjectOBJ.pages.filter((_, i) => i !== index);
      }
    },
    toggleCreatePagePopUP: (state) => {
      state.createPagePopUP = !state.createPagePopUP;
    },
    setCurWorkPage: (state, action) => {
      state.curWorkPage = action.payload.index;
    },
    updatePageCode: (state, action) => {
      const { code } = action.payload;
      const curProjectOBJ = state.projects[state.curWorkProject];
      if (curProjectOBJ && curProjectOBJ.pages[state.curWorkPage]) {
        curProjectOBJ.pages[state.curWorkPage].pageCode = code;
      }
      console.log("Updated page code:", code);
    },
    toggleisCodePreview: (state) => {
      state.isCodePreview = !state.isCodePreview;
    },
    // ✅ Store all projects in Redux
    setAllProjects: (state, action) => {
      state.allprojects = action.payload;           
    },
    // ✅ Store the current project in Redux
    setCurrentProject: (state, action) => {
      state.projects = [action.payload]; 
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        console.error("Error:", action.payload);
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })
      .addCase(createNewProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExistingProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateExistingProject.fulfilled, (state) => {
        state.loading = false;
      });
  }
});

export const {
  toggleProjectCreatePopUp,
  updateCurWorkProject,
  addPages,
  setAllProjects,
  setCurrentProject,
  removePages,
  toggleCreatePagePopUP,
  setCurWorkPage,
  updatePageCode,
  toggleisCodePreview,
} = ProjectManSlice.actions;

export default ProjectManSlice.reducer;
