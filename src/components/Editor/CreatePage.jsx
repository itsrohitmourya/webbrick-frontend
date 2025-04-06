import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { toggleCreatePagePopUP, removePages, addPages, setCurWorkPage } from '../../app/slices/ProjectManSlice';

function CreatePage() {
    const curWorkProject = useSelector((state) => state.projectMan.curWorkProject);
    const pages = useSelector((state) => state.projectMan.projects[curWorkProject].pages);
    const createPagePopUP = useSelector((state) => state.projectMan.createPagePopUP);

    const [newPageName, setnewPageName] = useState("");
    const [error, setError] = useState("");  // ✅ Local state for error message

    const dispatch = useDispatch();


    // ✅ Handle Input Change & Clear Error on Keystroke
    const handleInputChange = (e) => {
        setnewPageName(e.target.value);

        // ✅ Clear error when user types
        if (error) {
            setError("");
        }
    };

    const handleCreatePage = () => {
        dispatch(toggleCreatePagePopUP());
        setError("");       // ✅ Clear error when closing popup
        setnewPageName(""); // ✅ Reset the input value
    };

    const handleAddPage = () => {
        if (!newPageName.trim()) {
            setError("Page name cannot be empty!");
            return;
        }

        if (pages.some(page => page.pageName === newPageName.trim())) {
            setError("Page name already exists!");
            return;
        }

        dispatch(addPages({ name: newPageName.trim() }));
        dispatch(toggleCreatePagePopUP());
        setnewPageName("");
        setError("");        // ✅ Clear error on successful add
    };

    const handlePageSwitch = (index) => {
        dispatch(setCurWorkPage({ index }));
    };

    const handlePageRemove = (index) => {
        dispatch(removePages({ index }));
    };

    return (
        <>
            {pages.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 w-[90%] bg-zinc-600 rounded-lg my-4">
                    <span className="text-white text-center text-lg">
                        You haven't created any pages yet. Please create at least one page to start building your website.
                    </span>
                    <button
                        className="mt-4 px-6 py-2 bg-blue-600 text-white transform font-semibold rounded-lg shadow active:bg-blue-700 active:scale-75 transition"
                        onClick={handleCreatePage}
                    >
                        Create Page
                    </button>
                </div>
            ) : null}

            {createPagePopUP && (
                <>
                    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(5,2,2,0.72)]  z-[1000]">
                        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold text-white mb-4">Create New Page</h2>

                            {/* ✅ Input Field with Inline Error */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={newPageName}
                                    onChange={handleInputChange}   // ✅ Clear error while typing
                                    autoFocus
                                    placeholder="Enter your page name"
                                    className={`w-full outline-2 py-2 px-2 text-white rounded-md focus:outline-none focus:ring-2 
                                    ${error ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                                />

                                {/* ✅ Inline Error Message */}
                                {error && (
                                    <span className="text-red-500 text-sm mt-1 block">
                                        {error}
                                    </span>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={handleCreatePage}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAddPage}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Add Page
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {pages.length > 0 && (
                <>
                    <div id='scrollNone' className='min-h-max box-border p-2 w-full flex flex-col overflow-hidden gap-2'>
                        <span className='w-full h-max flex text-white capitalize'>Your Pages :</span>
                        <div
                            id='scrollNone'
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', }}
                            className='flex-2 py-2 w-full min-h-max overflow-scroll flex flex-col gap-2 items-start justify-baseline'
                        >
                            {pages.map((page, index) => (
                                <div key={index} id='scrollNone' className=' w-full h-max flex gap-2'>
                                    <button
                                        data-key={index}
                                        onClick={() => handlePageSwitch(index)}
                                        className='text-lg bg-gray-700 flex-7 transform active:bg-gray-500 active:scale-90 text-white flex gap-2 justify-start items-center py-1 px-2 rounded-lg'
                                    >
                                        
                                        <span className='text-white'>
                                            {index + 1})
                                        </span>
                                        {page.pageName}
                                    </button>
                                    <button
                                        onClick={() => handlePageRemove(index)}
                                        className='flex-1 bg-red-500 rounded-lg px-1 h-9 flex justify-center items-center transform active:scale-75'
                                    >
                                        <Trash2 size={24} style={{ color: "white" }} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleCreatePage}
                            className="px-6 py-2 bg-green-600 text-white transform font-semibold rounded-lg shadow active:bg-green-700 active:scale-75 transition"
                        >
                            Add Pages
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default CreatePage;
