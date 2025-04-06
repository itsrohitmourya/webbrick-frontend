import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const DomTreeView = () => {
  const curWorkProject = useSelector((state) => state.projectMan.curWorkProject);
  const pages = useSelector((state) => state.projectMan.projects[curWorkProject].pages);


  const curWorkPage = useSelector((state) => state.projectMan.curWorkPage)
  const [tree, setTree] = useState(null);

  useEffect(() => {
    if (pages[curWorkPage]?.pageCode) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(pages[curWorkPage].pageCode, "text/html");
      setTree(parseDom(doc.body)); // Parse from the <body>
    }
  }, [pages, curWorkPage]);

  const parseDom = (node) => {
    if (!node) return null;
    return {
      tag: node.tagName?.toLowerCase(),
      children: Array.from(node.children).map(parseDom),
    };
  };

  return (
    <div
      id="scrollNone"
      className=" h-full pb-6 overflow-scroll bg-zinc-900 w-2xs"
    >
      <span
        className="text-lg h-10 w-full flex justify-center items-center font-bold text-white mb-2 sticky top-0 bg-zinc-900"
      >
        DOM Tree View :
        <span className="text-white px-2 text-lg font-bold">
          {
            pages[curWorkPage]?.pageName
          }
        </span>
      </span>
      <TreeNode node={tree} />
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(true);

  if (!node) return null;

  return (
    <div className="ml-4">
      <div
        className="cursor-pointer text-white hover:underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "▼" : "▶"} {node.tag}
      </div>
      {expanded &&
        node.children?.map((child, index) => (
          <TreeNode key={index} node={child} />
        ))}
    </div>
  );
};

export default DomTreeView;
