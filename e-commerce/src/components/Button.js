function Button({ color, className, backgroundColor, text, onClick }) {
  const style = {};
  if (color) style.color = color;
  if (backgroundColor) style.backgroundColor = backgroundColor;

  return (
    <button className={className || "btn"} onClick={onClick} style={style}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "Button",
};

export default Button;
