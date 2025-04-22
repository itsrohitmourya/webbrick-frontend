import React, { useEffect } from "react";
import {
  Trash2,
  FileText,
  Square,
  CheckSquare,
  FolderOpen,
  Download,
} from "lucide-react";
import {
  fetchProjects,
  deleteExistingProject,
  updateProComplete,
  fetchProjectById,
} from "../../app/slices/ProjectManSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExportProjectButton from "../Editor/ExportProjectButton";

const ProjectCards = () => {
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projectMan.allprojects);
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteExistingProject(id));
  };

  const handleStatusUpdate = (id, currentStatus) => {
    const newStatus = !currentStatus;
    dispatch(updateProComplete({ id, complete: newStatus }));
  };

  const handleProjectOpen = (id) => {
    dispatch(fetchProjectById({ projectId: id, Navigate }));
  };

  const completedProjects = allProjects.filter((project) => project.complete);
  const pendingProjects = allProjects.filter((project) => !project.complete);

  return (
    <div className="min-h-max w-full bg-gray-900 text-white p-10 flex flex-col">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-400">Your Projects</h1>
        <p className="text-gray-400 mt-2">
          Manage your completed and pending projects.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Pending Projects Section */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Pending Projects
          </h2>
          <div
            id="scrollNone"
            className="max-h-[500px] overflow-y-auto space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg"
          >
            {pendingProjects.length > 0 ? (
              pendingProjects
                .slice()
                .reverse()
                .map((project) => (
                  <div
                    key={project._id}
                    className="bg-gray-700 rounded-lg px-4 py-2 w-full shadow-md hover:shadow-xl transition"
                  >
                    <div className="flex flex-col justify-start items-start sm:flex sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                      {/* Project Info */}
                      <div className="w-full flex justify-between sm:w-max sm:block">
                        <h3 className="text-xl font-bold">
                          {project.projectName}
                        </h3>
                        <p className="text-gray-400 mt-1">
                          Pages: {project.pages.length}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-max items-stretch sm:items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(project._id, project.complete)
                            }
                            className="transform text-lg transition active:scale-75 flex justify-center items-center sm:w-auto"
                          >
                            {project.complete ? (
                              <CheckSquare size={24} />
                            ) : (
                              <Square size={24} />
                            )}
                          </button>
                          {/* Message on small screen */}
                          <span className="text-lg text-gray-300 sm:hidden">
                            {project.complete
                              ? "Unmark as Complete"
                              : "Mark as Complete"}
                          </span>
                        </div>

                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition active:scale-75 w-full sm:w-auto"
                          onClick={() => handleDelete(project._id)}
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>

                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition active:scale-75 w-full sm:w-auto"
                          onClick={() => handleProjectOpen(project._id)}
                        >
                          <FolderOpen size={18} />
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-gray-400 italic text-center py-6">
                <FileText size={48} className="text-gray-600 mx-auto mb-2" />
                No pending projects available.
              </div>
            )}
          </div>
        </div>

        {/* Completed Projects Section */}
        <div>
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Completed Projects
          </h2>
          <div className="max-h-[500px] overflow-y-auto space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg">
            {completedProjects.length > 0 ? (
              completedProjects
                .slice()
                .reverse()
                .map((project) => (
                  <div
                    key={project._id}
                    className="bg-gray-700 rounded-lg px-6 py-4 w-full shadow-md hover:shadow-xl transition"
                  >
                    <div className="flex flex-col justify-start items-start sm:flex sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                      {/* Project Info */}
                      <div className="w-full flex justify-between sm:w-max sm:block">
                        <h3 className="text-xl font-bold">
                          {project.projectName}
                        </h3>
                        <p className="text-gray-400 mt-1">
                          Pages: {project.pages.length}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-max items-stretch sm:items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(project._id, project.complete)
                            }
                            className="transform text-lg transition active:scale-75 flex justify-center items-center sm:w-auto"
                          >
                            {project.complete ? (
                              <CheckSquare size={24} />
                            ) : (
                              <Square size={24} />
                            )}
                          </button>
                          <span className="text-lg text-gray-300 sm:hidden">
                            {project.complete
                              ? "Unmark as Complete"
                              : "Mark as Complete"}
                          </span>
                        </div>

                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition active:scale-75 w-full sm:w-auto"
                          onClick={() => handleDelete(project._id)}
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>

                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition active:scale-75 w-full sm:w-auto"
                        >
                          <ExportProjectButton/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-gray-400 italic text-center py-6">
                <FileText size={48} className="text-gray-600 mx-auto mb-2" />
                No completed projects available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
