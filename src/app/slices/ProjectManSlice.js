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
      if(Navigate){
        Navigate('/editor')
      }
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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Drag & Drop with Context Menu</title>
  <style id='userStyle'>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: white;
    }

    body {
      background: #121212;
    }

    body::-webkit-scrollbar {
      display: none !important;
    }
  </style>

  <style id='devStyle'>
    .draggable {
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
      transition: box-shadow 0.2s ease;
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
  </style>
</head>

<body>
  <script id='devScript'>
        const container = document.body;
let draggedElement = null;
let selectedElement = null;
let currentMenu = null;
let hrefTarget = null;
let urlInput = null;
let mediaTarget = null;
let mediaSrcInput = null;

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

container.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  closeContextMenu();

  selectedElement = e.target;
  createContextMenu(e.pageX, e.pageY, selectedElement);
});

function createContextMenu(x, y, clickedElement) {
  currentMenu = document.createElement("div");
  currentMenu.className = "context-menu";
  currentMenu.style.left = x + "px";
  currentMenu.style.top = y + "px";

  hrefTarget = null;
  urlInput = null;
  mediaTarget = null;
  mediaSrcInput = null;

  // Check if clicked element is <a> or inside one
  if (clickedElement.tagName === "A") {
    hrefTarget = clickedElement;
  } else {
    hrefTarget = clickedElement.closest("a");
  }

  if (hrefTarget) {
    const label = document.createElement("label");
    label.textContent = "Edit Link:";
    urlInput = document.createElement("input");
    urlInput.value = hrefTarget.getAttribute("href") || "";
    currentMenu.appendChild(label);
    currentMenu.appendChild(urlInput);
  }

  // Check if clicked element is media
  if (["IMG", "VIDEO", "IFRAME"].includes(clickedElement.tagName)) {
    mediaTarget = clickedElement;
  } else {
    const mediaParent = clickedElement.closest("img, video, iframe");
    if (mediaParent) mediaTarget = mediaParent;
  }

  if (mediaTarget) {
    const mediaLabel = document.createElement("label");
    mediaLabel.textContent = "Edit Media Source:";
    mediaSrcInput = document.createElement("input");
    mediaSrcInput.value = mediaTarget.getAttribute("src") || "";
    currentMenu.appendChild(mediaLabel);
    currentMenu.appendChild(mediaSrcInput);
  }

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
    }

    if (hrefTarget && urlInput) {
      hrefTarget.setAttribute("href", urlInput.value);
    }

    if (mediaTarget && mediaSrcInput) {
      mediaTarget.setAttribute("src", mediaSrcInput.value);
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

  currentMenu.appendChild(editBtn);
  currentMenu.appendChild(saveBtn);
  currentMenu.appendChild(removeBtn);
  document.body.appendChild(currentMenu);
}

function closeContextMenu() {
  if (currentMenu) {
    currentMenu.remove();
    currentMenu = null;
    hrefTarget = null;
    urlInput = null;
    mediaTarget = null;
    mediaSrcInput = null;
  }
}

window.addEventListener("click", (e) => {
  if (!e.target.closest(".context-menu")) {
    closeContextMenu();
  }
});
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
