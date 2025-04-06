import React, { useEffect, useState } from 'react';
import { ProjectCards } from '../../index';  // Project card component
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle } from 'lucide-react';  // Icon for create button
import { createNewProject, toggleProjectCreatePopUp } from '../../app/slices/ProjectManSlice';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);  // Get user from Redux state
  const [newProjectName, setProjectName] = useState('');
  const [error, setError] = useState('');  // ✅ State to hold error message
  const dispatch = useDispatch();
  const projectCreatePopUP = useSelector((state) => state.projectMan.projectCreatePopUP);
  const allprojects = useSelector((state) => state.projectMan.allprojects);
  const projects = useSelector((state)=> state.projectMan.projects)

 function check(){
  console.log(projects)
 }

  const handleProjectCreate = () => {
    dispatch(toggleProjectCreatePopUp());
  };

  const handleCreate = () => {
    setError('');  // ✅ Clear previous errors

    if (!newProjectName.trim()) {
      setError("Project name cannot be empty!");  // ✅ Set error
      return;
    }

    let isDuplicate = allprojects.some((pro) => pro.projectName === newProjectName);
    if (isDuplicate) {
      setError("Project name already exists!");  // ✅ Set duplicate error
      return;
    }

    dispatch(createNewProject({ projectName: newProjectName }));
    setProjectName('');
    handleClose();
  };

  const handleClose = () => {
    setError('');  // ✅ Clear error when closing
    dispatch(toggleProjectCreatePopUp());
  };

  useEffect(() => {
    if (projectCreatePopUP) {
      document.body.classList.add('overflow-hidden');   // Disable background scroll
    } else {
      document.body.classList.remove('overflow-hidden'); // Re-enable scroll
    }

    // ✅ Cleanup function to restore scroll on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [projectCreatePopUP]);

  return (
    <div className="min-h-screen w-[100vw] bg-zinc-800 text-white flex flex-col justify-start items-center px-6 py-12 gap-12 overflow-hidden">

      {/* ✅ Welcome Section */}
      <section className="p-12 w-[90vw] bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Welcome, <span className="text-yellow-400 animate-pulse">{user?.username || "User"}!</span>
          </h1>
          <p className="text-lg text-gray-400">
            Start creating amazing projects with WebBrick.
          </p>

          <button
            className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            onClick={handleProjectCreate}
          >
            <PlusCircle size={20} />
            Create Project
          </button>
        </div>
      </section>

      {/* ✅ Project Cards Section */}
      <section>
        <div className="h-auto w-[90vw]  rounded-lg overflow-hidden">
          <ProjectCards />
        </div>
      </section>

      {/* ✅ Full-Screen Project Creation Popup */}
      {projectCreatePopUP && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(5,2,2,0.85)] z-[1000]">
          <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-96 max-w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Create Project</h2>

            {/* ✅ Input Field */}
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setProjectName(e.target.value)}
              autoFocus
              placeholder="Enter your Project Name"
              className="w-full outline-2 py-2 px-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* ✅ Inline Error Message */}
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition transform active:scale-75"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform active:scale-75"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
