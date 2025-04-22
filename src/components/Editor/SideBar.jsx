import { PlusCircle, Layers, Maximize, Trash2, LogOut, User, Code2Icon, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ProfileMenu, CompPanel, Exit, DomTreeView, CodePreview } from '../../index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleisCodePreview } from '../../app/slices/ProjectManSlice'
import { resume } from '../../app/slices/EditorLogoutSlice';


import { toggleManualSave, toggleAutoSaveToolTip } from "../../app/slices/autoSaveSlice";
import store from '../../app/store'

function SideBar() {
    const [activeMenu, setactiveMenu] = useState(null)
    const iconSize = 34

    const EditorLogout = useSelector((state) => state.EditorLogout)
    const dispatch = useDispatch()

    const toggleMenu = (menu) => {
        setactiveMenu(activeMenu === menu ? null : menu)
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    const isCodePreview = useSelector((state) => state.projectMan.isCodePreview)

    const getCodePreview = () => {
        dispatch(toggleisCodePreview())
    }

    const handleLogout = () => {
        dispatch(resume())
    }



    const handleManualSave = () => {
        dispatch(toggleManualSave());
        dispatch(toggleAutoSaveToolTip())

        setTimeout(() => {
            const currentManualSave = store.getState().autoSave.manualSave;
            const currentToolTip = store.getState().autoSave.autoSaveToolTip;
            if (currentManualSave && currentToolTip) {
                dispatch(toggleManualSave()); // Toggle back to false
                dispatch(toggleAutoSaveToolTip())
            }
            console.log("Manual Save is done")
        }, 4000);
    };

    useEffect(() => {
            const handleKeyDown = (e) => {
              if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                e.preventDefault(); // Prevent browser default Save Page
                handleManualSave();
              }
            };
          
            window.addEventListener('keydown', handleKeyDown);
          
            return () => {
              window.removeEventListener('keydown', handleKeyDown); // Cleanup
            };
          }, []);
          

    return (
        <div className='h-[calc(100vh- 4.5rem)] min-w-max flex justify-baseline items-start overflow-hidden border'>
            <div className='min-h-full w-16 flex flex-col justify-between items-center relative bg-slate-900'>
                <div className='w-full flex flex-col justify-baseline items-center gap-10 pt-6'>
                    <abbr title="Add Elements">
                        <button
                            className='h-auto w-8 cursor-pointer active:scale-70'
                            onClick={() => toggleMenu("compPanel")}
                        >
                            <PlusCircle color="white" size={iconSize} />
                        </button>
                    </abbr>
                    <abbr title="View Structure">
                        <button
                            className="h-auto w-8 cursor-pointer active:scale-70"
                            onClick={() => toggleMenu("domTreeView")}
                        >
                            <Layers color="white" size={iconSize} />
                        </button>
                    </abbr>

                    <abbr title="View Code">
                        <button
                            className="h-7 w-7 flex justify-center items-center cursor-pointer active:scale-70"
                            onClick={getCodePreview}
                        >
                            <Code2Icon color="white" size={iconSize} />
                        </button>
                    </abbr>
                    <abbr title="Full-Screen Editor">
                        <button
                            className="h-6 w-6 flex justify-center items-center cursor-pointer active:scale-70"
                            onClick={() => toggleFullScreen()}
                        >
                            <Maximize color="white" size={iconSize} />
                        </button>
                    </abbr>
                    <abbr title="Save project">
                        <button
                            className="h-6 w-6 flex justify-center items-center cursor-pointer active:scale-70 text-white"
                            onClick={handleManualSave}
                        >
                            <Save size={iconSize} />
                        </button>
                    </abbr>

                </div>
                <div className='h-auto w-full flex flex-col absolute bottom-0 justify-baseline items-center gap-6 pb-4'>
                    <abbr title="Profile">
                        <button
                            className="h-auto w-8 cursor-pointer active:scale-70"
                            onClick={() => toggleMenu("profileMenu")}
                        >
                            <User color="white" size={iconSize} />
                        </button>
                    </abbr>
                    <abbr title="Logout">
                        <button
                            className='h-auto w-8 ml-2 cursor-pointer active:scale-70'
                            onClick={() => handleLogout()}
                        >
                            <LogOut color="white" size={iconSize} />
                        </button>
                    </abbr>
                </div>
            </div>
            <div className='h-full w-auto'>
                {
                    activeMenu === "profileMenu" && <ProfileMenu />
                }
                {
                    activeMenu === "compPanel" && <CompPanel />
                }
                {
                    activeMenu === "domTreeView" && <DomTreeView />
                }
            </div>
            {
                EditorLogout.islogout && <Exit />
            }
            {
                isCodePreview && <CodePreview />
            }
        </div>
    );
}

export default SideBar;
