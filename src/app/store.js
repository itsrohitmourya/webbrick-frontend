import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoSaveReducer from "./slices/autoSaveSlice";
import screenSizeReducer from "./slices/screenSizeSlice";
import EditorLogoutReducer from "./slices/EditorLogoutSlice";
import ElementsReducer from './slices/ElementsSlice';
import scratchBuildReducer from './slices/scratchBuildSlice';
import projectManReducer from './slices/ProjectManSlice';
import authReducer from './slices/authSlice';

// ✅ Transform to persist only the `projects` key
const projectTransform = createTransform(
  (inboundState) => ({ projects: inboundState.projects }),       // Save only `projects`
  (outboundState) => ({ projects: outboundState.projects }),     // Restore only `projects`
  { whitelist: ['projectMan'] }                                  // Apply to `projectMan`
);

const persistConfigAuth = {
  key: 'auth',
  storage,
  whitelist: ['auth']      // ✅ Persist only the auth slice
};

const persistConfigProjects = {
  key: 'projectMan',
  storage,
  transforms: [projectTransform]  // ✅ Apply the transform to persist only `projects`
};

const rootReducer = {
  autoSave: autoSaveReducer,
  screenSize: screenSizeReducer,
  EditorLogout: EditorLogoutReducer,
  Elements: ElementsReducer,
  scratchBuild: scratchBuildReducer,
  
  // ✅ Persist `projectMan` slice but only the `projects` key
  projectMan: persistReducer(persistConfigProjects, projectManReducer),
  
  // ✅ Persist `auth` slice
  auth: persistReducer(persistConfigAuth, authReducer)
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ Ignore Redux Persist non-serializable actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// // ✅ Purge old persisted state
// persistor.purge().then(() => {
//   console.log("Old persisted state cleared. New state will be applied.");
// });

export default store;
