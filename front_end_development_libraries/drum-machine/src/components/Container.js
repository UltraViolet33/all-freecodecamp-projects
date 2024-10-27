import { useState } from "react";
import { DrumPad } from "./DrumPad";
import { Control } from "./Control";

export const Container = () => {
  const [displayText, setDisplayText] = useState("");

  const changeDisplayText = text => {
    setDisplayText(text);
  };

  return (
    <>
      <DrumPad setDisplayText={changeDisplayText} />
      <Control displayText={displayText} />
    </>
  );
};
