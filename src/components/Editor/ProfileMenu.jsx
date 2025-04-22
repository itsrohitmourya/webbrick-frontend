import { useState, useRef, useEffect } from "react";
import {
    LogOut,
    Save,
    HelpCircle,
    MessageSquare,
    Bug,
    FolderOpen,
    ToggleRight,
    ToggleLeft,
    FolderSync,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleManualSave, toggleAutoSave, toggleAutoSaveToolTip } from "../../app/slices/autoSaveSlice";
import store from '../../app/store'
import { Exit, ExportProjectButton } from '../../index'
import { resume } from '../../app/slices/EditorLogoutSlice';
import { updateExistingProject } from "../../app/slices/ProjectManSlice";
const iconSize = 18;

function ProfileMenu() {
    const [autoSaveFiles, setAutoSaveFiles] = useState(false);

    const dispatch = useDispatch();
    const autoSave = useSelector((state) => state.autoSave.autoSave)
    const manualSave = useSelector((state) => state.autoSave.manualSave)
    const autoSaveToolTip = useSelector((state) => state.autoSave.autoSaveToolTip)
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleAutoSave = () => {
        setAutoSaveFiles((prevState) => {
            const newState = !prevState; // Determine new state
            dispatch(toggleAutoSave());
            if (newState) {
                dispatch(toggleAutoSaveToolTip());
                timeoutRef.current = setTimeout(() => {
                    dispatch(toggleAutoSaveToolTip());
                    timeoutRef.current = null; // Reset after execution
                }, 4000);
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                intervalRef.current = setInterval(() => {
                    dispatch(toggleAutoSaveToolTip());
                    timeoutRef.current = setTimeout(() => {
                        dispatch(toggleAutoSaveToolTip());
                        timeoutRef.current = null;
                    }, 4000);
                }, 10000);
            } else {
                if (autoSaveToolTip) {
                    dispatch(toggleAutoSaveToolTip());
                }
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }
            return newState;
        });
    };

    const handleManualSave = () => {
        if (!autoSave) {
            dispatch(toggleManualSave());
            dispatch(toggleAutoSaveToolTip())

            setTimeout(() => {
                const currentManualSave = store.getState().autoSave.manualSave;
                const currentToolTip = store.getState().autoSave.autoSaveToolTip;
                if (currentManualSave && currentToolTip) {
                    dispatch(toggleManualSave()); // Toggle back to false
                    dispatch(toggleAutoSaveToolTip())
                }
            }, 4000);
        } else {
            alert("Manual Save is not possible if Auto Save is enable")
        }
    };

    const islogout = useSelector((state) => state.EditorLogout.islogout)
   

    const user = useSelector((state) => state.auth.user)
    const projects = useSelector((state) => state.projectMan.projects)
    const curWorkProject = useSelector((state) => state.projectMan.curWorkProject)
    useEffect(() => {
        if (projects && projects.length > 0 && projects[curWorkProject]) {
            const currentProject = projects[curWorkProject];
            dispatch(
                updateExistingProject({
                    projectId: currentProject._id,
                    projectData: {
                        projectName: currentProject.projectName,
                        pages: currentProject.pages
                    }
                })
            );
        }
    }, [autoSave, manualSave]);
  
    const handleLogout = () => {
        dispatch(resume()) 
    }

    return (
        <div id="scrollNone" className='text-white text-lg h-full min-w-2xs flex flex-col justify-baseline items-start p-4 bg-gray-800 overflow-scroll'>
            <div className='flex justify-center items-center p-4 gap-4 bg-gray-700 rounded-lg w-full max-w-md mx-auto'>
                <div className='h-10 w-10 rounded-full  overflow-hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        className='h-full w-full' viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                </div>
                <div className='flex flex-col justify-start items-start text-sm text-gray-300'>
                    <span className='font-semibold text-lg'>{user.username || "user"}</span>
                    <span className='text-gray-400'>{user.email || ""}</span>

                </div>
            </div>
            <div className="flex flex-col w-full max-w-md mt-4 h-auto bg-gray-700 p-4 gap-4 rounded-lg shadow-lg text-white">
                {/* Autosave Toggle */}
                {/* <button
                    className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all"
                    onClick={() => handleAutoSave()}
                >
                    <span className="flex items-center gap-2"><FolderSync size={iconSize} /> Autosave </span>
                    {autoSaveFiles ? <ToggleRight size={30} /> : <ToggleLeft size={30} />}
                </button> */}

                <button
                    className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all"
                    onClick={handleManualSave}
                >
                    <span className="flex items-center gap-2"><Save size={iconSize} /> Save</span>
                </button>

                <ExportProjectButton style={"flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all"} />

                <a href="/dashboard"
                    target="_blank"
                    className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all">
                    <span className="flex items-center gap-2"><FolderOpen size={iconSize} /> Projects</span>
                </a>

                <a href="/faq" target="_blank" className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all">
                    <span className="flex items-center gap-2"><HelpCircle size={iconSize} /> FAQ</span>
                </a>

                <a href="/contact"
                    target="_blank"
                    className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all">
                    <span className="flex items-center gap-2"><MessageSquare size={iconSize} /> Contact Us</span>
                </a>


                <a href="/report-bug" target="_blank"
                    className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all">
                    <span className="flex items-center gap-2"><Bug size={iconSize} /> Report a Bug</span>
                </a>

                {/* Log Out Button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handleLogout()}
                        className="flex items-center justify-between py-2 px-4 bg-red-600 rounded-md hover:bg-red-500 active:bg-red-400 transition-all w-full max-w-xs"
                    >
                        <span className="flex items-center gap-2"><LogOut size={iconSize} />Exit</span>
                    </button>
                </div>
            </div>
            {
                islogout && <Exit />
            }
        </div>
    );
}
export default ProfileMenu;
