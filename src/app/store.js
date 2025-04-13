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


const projectTransform = createTransform(
  (inboundState) => ({ projects: inboundState.projects }),       
  (outboundState) => ({ projects: outboundState.projects }),     
  { whitelist: ['projectMan'] }                                  
);

const persistConfigAuth = {
  key: 'auth',
  storage,
  whitelist: ['auth']      
};

const persistConfigProjects = {
  key: 'projectMan',
  storage,
  transforms: [projectTransform]  
};

const rootReducer = {
  autoSave: autoSaveReducer,
  screenSize: screenSizeReducer,
  EditorLogout: EditorLogoutReducer,
  Elements: ElementsReducer,
  scratchBuild: scratchBuildReducer,
  
  projectMan: persistReducer(persistConfigProjects, projectManReducer),
  auth: persistReducer(persistConfigAuth, authReducer)
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
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
