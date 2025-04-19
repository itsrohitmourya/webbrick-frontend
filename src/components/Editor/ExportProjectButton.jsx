import JSZip from "jszip";          // ✅ For zip file creation
import { saveAs } from "file-saver"; // ✅ For downloading the zip
import { useSelector } from "react-redux";
import { Download } from "lucide-react";
import { useEffect } from "react";

const iconSize = 18;

const ExportProjectButton = () => {
    const projects = useSelector((state) => state.projectMan.projects);

    const cleanHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Remove unnecessary attributes
        doc.querySelectorAll("[dropzone]").forEach((el) => el.removeAttribute("dropzone"));
        doc.querySelectorAll("[draggable]").forEach((el) => el.removeAttribute("draggable"));
        doc.querySelectorAll("[contenteditable]").forEach((el) => el.removeAttribute("contenteditable"));

        // Remove specific IDs
        const devStyle = doc.querySelector("#devStyle");
        if (devStyle) devStyle.remove();
        
        const userScript = doc.querySelector("#userScript");
        if (userScript) userScript.removeAttribute("id");

        const devScript = doc.querySelector("#devScripts");
        if (devScript) devScript.remove();

        // Remove draggable classes
        doc.querySelectorAll("[class*='draggable']").forEach((el) => {
            el.classList.remove("draggable");
        });

        // Return the cleaned HTML
        return `<!DOCTYPE html>\n` + doc.documentElement.outerHTML;
    };

    const exportProjectAsZip = async () => {
        if (!projects || projects.length === 0) {
            alert("No project found!");
            return;
        }

        const project = projects[0];   // Export the first project
        const zip = new JSZip();

        // ✅ Main folder
        const mainFolderName = `WebBrick-${project.projectName}`;
        const mainFolder = zip.folder(mainFolderName);

        // ✅ Empty assets folder
        mainFolder.folder("assets");

        // ✅ Pages folder with cleaned HTML files
        const pagesFolder = mainFolder.folder("pages");

        if (project.pages && project.pages.length > 0) {
            project.pages.forEach((page, index) => {
                const pageFileName = `${page.pageName || `page${index + 1}`}.html`;

                // ✅ Apply cleanup before exporting the HTML
                const cleanedHTML = cleanHTML(page.pageCode || "<!-- Empty Page -->");

                pagesFolder.file(pageFileName, cleanedHTML);
            });
        }

        // ✅ README.md with project details
        const readmeContent = `
# WebBrick Project - ${project.projectName}

## Project Details:
- **Project Name:** ${project.projectName}
- **Created At:** ${new Date(project.createdAt).toLocaleString()}
- **Updated At:** ${new Date(project.updatedAt).toLocaleString()}
- **Pages:** ${project.pages?.length || 0}
- **Complete:** ${project.complete ? "Yes" : "No"}

## About WebBrick:
WebBrick is a no-code website builder designed to make web development easy and accessible.
You can create, manage, and export fully functional websites with a drag-and-drop interface.
        `.trim();

        mainFolder.file("README.md", readmeContent);

        // ✅ Generate and download the zip
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `${mainFolderName}.zip`);
    };

    return (
        <button
            className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 active:bg-gray-400 transition-all"
            onClick={exportProjectAsZip}
        >
            <span className="flex items-center gap-2">
                <Download size={iconSize} /> Export
            </span>
        </button>
    );
};

export default ExportProjectButton;
