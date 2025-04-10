import React, { useEffect, useState } from 'react';
import { ProjectCards, Loader} from '../../index';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { createNewProject, toggleProjectCreatePopUp } from '../../app/slices/ProjectManSlice';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [newProjectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ New state for loader

  const dispatch = useDispatch();
  const projectCreatePopUP = useSelector((state) => state.projectMan.projectCreatePopUP);
  const allprojects = useSelector((state) => state.projectMan.allprojects);
  const projects = useSelector((state) => state.projectMan.projects);

  const handleProjectCreate = () => {
    dispatch(toggleProjectCreatePopUp());
  };

  const handleCreate = () => {
    setError('');

    if (!newProjectName.trim()) {
      setError("Project name cannot be empty!");
      return;
    }

    let isDuplicate = allprojects.some((pro) => pro.projectName === newProjectName);
    if (isDuplicate) {
      setError("Project name already exists!");
      return;
    }

    // ✅ Show loader
    setLoading(true);
    dispatch(createNewProject({ projectName: newProjectName }));

    // ✅ Reset input and close popup
    setProjectName('');
    handleClose();

    // ✅ Unmount loader after 3–4 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 3.5 seconds
  };

  const handleClose = () => {
    setError('');
    dispatch(toggleProjectCreatePopUp());
  };

  useEffect(() => {
    if (projectCreatePopUP) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [projectCreatePopUP]);

  return (
    <div className="min-h-screen w-[100vw] bg-zinc-800 text-white flex flex-col justify-start items-center px-6 py-12 gap-12 overflow-hidden">
      {/* Welcome Section */}
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

      {/* Project Cards Section */}
      <section>
        <div className="h-auto w-[90vw] rounded-lg overflow-hidden">
          <ProjectCards />
        </div>
      </section>

      {/* Project Creation Popup */}
      {projectCreatePopUP && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(5,2,2,0.85)] z-[1000]">
          <div className="bg-zinc-900 p-6 m-6 rounded-lg shadow-lg w-96 max-w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Create Project</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setProjectName(e.target.value)}
              autoFocus
              placeholder="Enter your Project Name"
              className="w-full outline-2 py-2 px-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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

      {/* ✅ Show Loader only if `loading` is true */}
      {loading && <Loader />}
    </div>
  );
}

export default Dashboard;
