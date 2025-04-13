import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toggleisCodePreview } from "../../app/slices/ProjectManSlice";

function CodePreview() {
    const [LiveCode, setLiveCode] = useState("No Code Found!");

    // Get sitePages and curWorkPage from Redux
    const curWorkProject = useSelector((state) => state.projectMan.curWorkProject);
    const pages = useSelector((state) => state.projectMan.projects[curWorkProject].pages);
    const curWorkPage = useSelector((state) => state.projectMan.curWorkPage);

    useEffect(() => {
        if (!pages[curWorkPage]) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(pages[curWorkPage].pageCode, "text/html");

        // ✅ Existing Cleaning Logic (Do not touch)
        doc.querySelectorAll("[dropzone]").forEach((el) => el.removeAttribute("dropzone"));
        doc.querySelectorAll("[draggable]").forEach((el) => el.removeAttribute("draggable"));
        const devStyle = doc.querySelector("#devStyle");
        if (devStyle) devStyle.remove();
        const userStyle = doc.querySelector("#userStyle");
        if (userStyle) userStyle.removeAttribute("id");
        const userScript = doc.querySelector("#userScript");
        if (userScript) userScript.removeAttribute("id");
        const devScript = doc.querySelector("#devScripts");
        if (devScript) devScript.remove();

        // ✅ New Cleaning Logic: Remove `draggable` class and `contenteditable` attribute
        doc.querySelectorAll("[class*='draggable']").forEach((el) => {
            el.classList.remove("draggable");
        });

        doc.querySelectorAll("[contenteditable]").forEach((el) => {
            el.removeAttribute("contenteditable");
        });

        // Extract the cleaned full HTML structure
        const cleanedHTML = `<!DOCTYPE html>\n` + doc.documentElement.outerHTML;

        setLiveCode(cleanedHTML);
    }, [pages, curWorkPage]);

    const dispatch = useDispatch();
    const closeCodePreview = () => {
        dispatch(toggleisCodePreview());
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(5,1,1,0.52)] backdrop-filter backdrop-blur-[2px] z-1000">
            <div className="h-[90%] w-[90%] overflow-hidden rounded-lg">
                <SyntaxHighlighter
                    id="scrollNone"
                    language="html"
                    style={dracula}
                    wrapLongLines
                    className="h-full w-full overflow-auto"
                    customStyle={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        padding: "1rem", 
                        lineHeight: "1.4", 
                        fontFamily: "'Fira Code', monospace", 
                        fontSize: "16px", 
                    }}
                    codeTagProps={{
                        style: {
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        },
                    }}
                >
                    {LiveCode}
                </SyntaxHighlighter>
            </div>
            <button
                className="text-white absolute bottom-[8%] bg-red-600 px-6 py-2 rounded-lg opacity-30 hover:opacity-100 transition-all ease-in duration-100 active:bg-red-800 active:scale-90 transform"
                onClick={closeCodePreview}
            >
                Close Code Preview
            </button>
        </div>
    );
}

export default CodePreview;
