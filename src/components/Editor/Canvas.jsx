import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePageCode } from "../../app/slices/ProjectManSlice";
import { Toast } from "../../index";
import { toggleToast } from "../../app/slices/ElementsSlice";

function Canvas() {
  const screenSize = useSelector((state) => state.screenSize.screenSize);
  const curWorkProject = useSelector((state) => state.projectMan.curWorkProject)
  const pages = useSelector((state) => state.projectMan.projects[curWorkProject].pages);
  const curWorkPage = useSelector((state) => state.projectMan.curWorkPage);
  const dispatch = useDispatch();
  const iframeRef = useRef(null);
  const iframeDocumentRef = useRef(null);
  const autoSave = useSelector((state) => state.autoSave.autoSave);
  const manualSave = useSelector((state) => state.autoSave.manualSave)
  const Elements = useSelector((state) => state.Elements.Elements)
  const [toastMsg, settoastMsg] = useState('')
  const [Icon, setIcon] = useState(null)

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) {
      console.log("Iframe document not ready yet.");
      return;
    }

    iframeDoc.open();
    iframeDoc.write(pages[curWorkPage]?.pageCode || "<html><head></head><body></body></html>");
    iframeDoc.close();

    iframeDocumentRef.current = iframeDoc;
    setTimeout(() => {
      const links = iframeDoc.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          if (window.location.href.includes("editor")) {
            e.preventDefault();
          }
        });
      });
    }, 100);
  }, [curWorkPage, pages]);

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

  const handleToast = (msg, icon) => {
    settoastMsg(msg);
    setIcon(icon)
    dispatch(toggleToast())
    setTimeout(() => {
      settoastMsg('')
      setIcon(null)
      dispatch(toggleToast())
    }, 4000)
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const dataKey = droppedData.dataKey;

    let html = null;
    let css = null;
    let js = null;
    let devJs = null;

    if (Elements[dataKey]) {
      const elementCode = Elements[dataKey].code;
      if (elementCode) {
        html = elementCode.html || null;
        css = elementCode.css || null;
        js = elementCode.js || null;
        devJs = elementCode.devjs || null;
      }
    }

    const iframeDocument = iframeDocumentRef.current;
    if (!iframeDocument) {
      console.error("Iframe document not ready.");
      return;
    }

    const body = iframeDocument.querySelector("body");
    const head = iframeDocument.querySelector("head");

    let style = iframeDocument.querySelector("#userStyle");
    if (!style) {
      style = iframeDocument.createElement("style");
      style.id = "userStyle";
      head.appendChild(style);
      console.log("Style created");
    }

    if (html) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      
      const droppedNav = Array.from(tempDiv.children).some(child => child.tagName.toLowerCase() === "nav");
      const droppedFooter = Array.from(tempDiv.children).some(child => child.tagName.toLowerCase() === "footer");
      
      const iframeNav = Array.from(iframeDocument.body.children).some(child => child.tagName.toLowerCase() === "nav");
      const iframeFooter = Array.from(iframeDocument.body.children).some(child => child.tagName.toLowerCase() === "footer");
      

      let shouldInsert = true;

      if (droppedNav && iframeNav) {
        handleToast("Nav already exists", 'error');
        shouldInsert = false;
      }

      if (droppedFooter && iframeFooter) {
        handleToast("Footer already exists", 'error');
        shouldInsert = false;
      }

      if (shouldInsert) {
        body.insertAdjacentHTML("beforeend", html);
      }
    }

    if (css) {
      style.textContent += "\n" + css;
    }

    if (js) {
      const existingUserScript = iframeDocument.querySelector("#userScript");
      let existingJS = "";
      if (existingUserScript) {
        existingJS = existingUserScript.textContent;
        existingUserScript.remove();
      }

      const newUserScript = iframeDocument.createElement("script");
      newUserScript.id = "userScript";
      newUserScript.textContent = `${existingJS}\n${js}`;
      body.appendChild(newUserScript);
    }

    if (devJs) {
      const existingDevScript = iframeDocument.querySelector("#devScript");
      let existingDevJS = "";
      if (existingDevScript) {
        existingDevJS = existingDevScript.textContent;
        existingDevScript.remove();
      }

      const newDevScript = iframeDocument.createElement("script");
      newDevScript.id = "devScript";
      newDevScript.textContent = `${existingDevJS}\n${devJs}`;
      body.appendChild(newDevScript);
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
      {
        toastMsg && <Toast msg={toastMsg} icon={Icon} />
      }
    </div>
  );
}

export default Canvas;
