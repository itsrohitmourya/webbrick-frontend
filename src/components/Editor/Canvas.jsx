import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePageCode } from "../../app/slices/ProjectManSlice";

function Canvas() {
  const screenSize = useSelector((state) => state.screenSize.screenSize);
  const curWorkProject = useSelector((state) => state.projectMan.curWorkProject)
  const pages = useSelector((state) => state.projectMan.projects[curWorkProject].pages);
  const curWorkPage = useSelector((state) => state.projectMan.curWorkPage);
  const dispatch = useDispatch();
  const iframeRef = useRef(null);
  const iframeDocumentRef = useRef(null); // To store the iframe document
  const autoSave = useSelector((state) => state.autoSave.autoSave);
  const manualSave = useSelector((state) => state.autoSave.manualSave)
  const scratchBuild = useSelector((state) => state.scratchBuild.scratchBuild)

  // Update iframe content whenever curWorkPage or sitePages changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) {
      console.log("Iframe document not ready yet.");
      return;
    }

    // ✅ Ensure a clean iframe before injecting new content
    iframeDoc.open();
    iframeDoc.write(pages[curWorkPage]?.pageCode || "<html><head></head><body></body></html>");
    iframeDoc.close();

    iframeDocumentRef.current = iframeDoc;
  }, [curWorkPage, pages]);



  // autoSave 
  const updateLivePageCode = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const updatedHTML = iframe.contentDocument.documentElement.outerHTML;
    dispatch(updatePageCode({ code: updatedHTML }));
  };

  useEffect(() => {
    if (autoSave) {
      const intervalId = setInterval(() => {
        updateLivePageCode();
      }, 30000);
      return () => clearInterval(intervalId);
    }
    if (manualSave) {
      updateLivePageCode()
    }
  }, [autoSave, manualSave]);


  // handle Drop
  const handleDrop = (e) => {
    e.preventDefault();

    const droppedData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const category = droppedData.category;
    const dataKey = droppedData.dataKey;

    let html = null;
    let css = null;
    let js = null;

    if (scratchBuild[category] && scratchBuild[category][dataKey]) {
      let elementCode = scratchBuild[category][dataKey].code;
      elementCode.forEach((element) => {
        html = element.html ? element.html : html;
        css = element.css ? element.css : css;
        js = element.js ? element.js : js;
      });
    } else {
      console.error(`Element not found: scratchBuild[${category}][${dataKey}]`);
    }

    const iframeDocument = iframeDocumentRef.current;
    if (iframeDocument) {
      const body = iframeDocument.querySelector("body");
      const style = iframeDocument.querySelector("#userStyle");
      if (!style) {
        const newStyle = iframeDocument.createElement("style");
        newStyle.id = "userStyle";
        body.appendChild(newStyle);
      }
      if (body && style) {
        if (html) {
          body.innerHTML += html;
        }
        if (css) {
          style.textContent += css;
        }
      }

      // ✅ Prevent duplicate JS execution
      if (js) {
        let existingScript = iframeDocument.querySelector("#userScript");
        if (!existingScript) {
          let newScript = iframeDocument.createElement("script");
          newScript.textContent = js;
          newScript.id = "userScript";
          body.appendChild(newScript);
        }
      }
    } else {
      console.error("Iframe document not ready.");
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden flex justify-center items-center flex-col"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-800 font-extrabold text-center break-words text-6xl md:text-8xl p-4 w-[90%] max-w-[90vw] -z-40">
        WebBrick Studio
      </span>
      {pages.length > 0 ? (
        <>
            <span
              style={{ transition: "width 0.5s ease", width: screenSize }}
              className="text-white px-2 text-lg"
            >
              {pages[curWorkPage]?.pageName}
            </span>
          <div
            style={{ width: screenSize, transition: "width 0.5s ease" }}
            className="h-[95%]"
          >
            <iframe
              ref={iframeRef}
              className="h-full w-full rounded-lg overflow-scroll border-none"
              id="scrollNone"
              sandbox="allow-scripts allow-same-origin allow-modals"
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Canvas;
