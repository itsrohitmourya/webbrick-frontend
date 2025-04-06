import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import { persistor } from "./app/store";
import store from './app/store'
import Layout from "./Layout";
import { Editor, Home, About, Contact, Dashboard, Login, Register, ReportBug, FAQ, PageNotFound } from './index';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />  {/* ✅ FAQ as Public Route */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="invalid" element={<PageNotFound/>} />

              {/* ✅ Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

             

              <Route
                path="report-bug"
                element={
                  <ProtectedRoute>
                    <ReportBug />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
                path="editor"
                element={
                  <ProtectedRoute>
                    <Editor />
                  </ProtectedRoute>
                }
              />

            {/* Redirect invalid routes */}
            <Route path="*" element={<Navigate to="/invalid" />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};
// console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);


export default App;
