export const Length = ({
  title,
  lengthDuration,
  labelId,
  spanId,
  incrementId,
  decrementId,
  decrement,
  increment,
}) => {
  return (
    <div className="length-container border">
      <h3 id={labelId}>{title} Length</h3>
      <div className="controls-length">
        <span onClick={increment} id={incrementId} className="pointer">
          +
        </span>
        <span id={spanId}>{lengthDuration}</span>
        <span onClick={decrement} id={decrementId} className="pointer">
          -
        </span>
      </div>
    </div>
  );
};
