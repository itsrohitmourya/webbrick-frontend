import React from "react";
import { useSelector} from "react-redux";
import {AutoSaveToolTip} from "../../index"

function AutoSaveHandler() {
  const autoSaveToolTip = useSelector((state)=> state.autoSave.autoSaveToolTip)
  return (
    <div>
      {autoSaveToolTip && <AutoSaveToolTip />}
    </div>
  );
}

export default AutoSaveHandler;
