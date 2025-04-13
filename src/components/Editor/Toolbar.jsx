import React from 'react';
import { Eye } from 'lucide-react';
import { useSelector } from 'react-redux';

function Toolbar() {
    const projects = useSelector((state) => state.projectMan.projects);
    const curWorkProject = useSelector((state) => state.projectMan.curWorkProject);
    const pages = useSelector((state) => state.projectMan.projects[curWorkProject]?.pages);
    const curWorkPage = useSelector((state) => state.projectMan.curWorkPage);

    const cleanupPageCode = (code) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(code, "text/html");

        //  Remove unwanted attributes
        doc.querySelectorAll("[contenteditable], [draggable], [dropzone]").forEach(el => {
            el.removeAttribute("contenteditable");
            el.removeAttribute("draggable");
            el.removeAttribute("dropzone");
        });

        //  Remove all elements with 'draggable' class
        doc.querySelectorAll(".draggable").forEach(el => el.classList.remove("draggable"));
        doc.querySelectorAll(".dropzone").forEach(el => el.classList.remove("dropzone"));

        //  Remove devScripts and devStyle entirely
        doc.querySelectorAll("#devScripts, #devStyle").forEach(el => el.remove());

        //  Keep userScript but remove its id
        const userScript = doc.querySelector("#userScript");
        if (userScript) {
            userScript.removeAttribute("id");
        }
        const useStyle = doc.querySelector("#userStyle");
        if (useStyle) {
            useStyle.removeAttribute("id");
        }

        return doc.documentElement.outerHTML;
    };

    const handlePreview = () => {
        if (!pages || !pages[curWorkPage]) {
            alert("Page not found!");
            return;
        }

        const rawPageCode = pages[curWorkPage].pageCode;

        if (!rawPageCode.trim()) {
            alert("Page code is empty!");
            return;
        }

        const cleanedCode = cleanupPageCode(rawPageCode);

        const blob = new Blob([cleanedCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const newTab = window.open(url, "_blank");

        setTimeout(() => URL.revokeObjectURL(url), 5000);
    };

    const iconSize = 28;

    return (
        <>
            <div className='flex gap-4 justify-center items-center p-4'>
                <abbr title="Preview">
                    <button
                        className="h-8 w-8 cursor-pointer flex justify-center items-center active:scale-90"
                        onClick={handlePreview}
                    >
                        <Eye className='text-white' size={iconSize} />
                    </button>
                </abbr>
                <abbr title="Project-Name">
                    <span className='text-white text-lg'>
                        {projects[curWorkProject]?.projectName || "Untitled Project"}
                    </span>
                </abbr>
            </div>
        </>
    );
}

export default Toolbar;
