export const AudioElement = ({ audio, play }) => {
  const handlePlaySound = () => {
    play(audio);
  };

  return (
    <div className="drum-pad" id={audio.id} onClick={handlePlaySound}>
      <audio className="clip" id={audio.key} src={audio.source}></audio>
      {audio.key}
    </div>
  );
};
