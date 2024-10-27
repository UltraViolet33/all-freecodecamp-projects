import { useEffect } from "react";
import { GlobalAudio } from "../assets/GlobalAudio";
import { AudioElement } from "./AudioElement";

export const DrumPad = ({ setDisplayText }) => {
  const playSound = audioToPlay => {
    const audioElement = document.getElementById(audioToPlay.key);
    setDisplayText(audioToPlay.id);
    audioElement.play();
  };

  const playSoundFromKeyboard = event => {
    const audioToPlay = GlobalAudio.find(
      audio => audio.key === event.key.toUpperCase()
    );

    const div = document.getElementById(audioToPlay.id);
    div.classList.add("focus");
    window.setTimeout(() => {
      div.classList.remove("focus");
    }, 100);

    if (audioToPlay) {
      playSound(audioToPlay);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", playSoundFromKeyboard);
    return () => {
      document.removeEventListener("keydown", playSoundFromKeyboard);
    };
  });

  return (
    <div id="drum-pad-container">
      {GlobalAudio.map((audio, index) => (
        <AudioElement audio={audio} play={playSound} key={index} />
      ))}
    </div>
  );
};
