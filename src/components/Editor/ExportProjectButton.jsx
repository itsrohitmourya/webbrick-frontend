import JSZip from "jszip";          // ✅ For zip file creation
import { saveAs } from "file-saver"; // ✅ For downloading the zip
import { useSelector } from "react-redux";
import { Download } from "lucide-react";
const iconSize = 18;

const ExportProjectButton = ({style}) => {
    const projects = useSelector((state) => state.projectMan.projects);
    const user = useSelector((state) => state.auth.user);

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
- Project ID: ${project._id}
- User Name: ${user?.username || "Anonymous"}
- User Email: ${user?.email || "Anonymous"}
- Project Name: ${project.projectName}
- Created At: ${new Date(project.createdAt).toLocaleString()}
- Updated At: ${new Date(project.updatedAt).toLocaleString()}
- Pages: ${project.pages?.length || 0}
- Complete: ${project.complete ? "Yes" : "No"}

## About WebBrick:
WebBrick is a no-code website builder designed to make web development easy and accessible.
You can create, manage, and export fully functional websites with a drag-and-drop interface.

## How to Add Your Own Assets:
1. Place your assets (images, CSS, JS) in the "assets" folder.
2. Rename the files as you had used them when building your project.
3. You can also check or chnage the references in the HTML files in the "pages" folder.
4. Open the whole project Folder in Any Code Editor or IDE.
5. You can also open the HTML files in any browser to view your project.

## You can easily deploy your project using any hosting service like:
- Netlify
- Vercel
- GitHub Pages
Just upload the entire folder to your hosting service.
and  make some changes in the files as per your hosting service requirements.
        `.trim();

        mainFolder.file("README.md", readmeContent);

        // ✅ Generate and download the zip
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `${mainFolderName}.zip`);
    };

    return (
        <button
            className={style}
            onClick={exportProjectAsZip}
        >
            <span className="flex items-center gap-2">
                <Download size={iconSize} /> Export
            </span>
        </button>
    );
};

export default ExportProjectButton;
