const Button = ({
  children,
  className = "",
  type = "submit",
  id = "",
  onClick,
}) => {
  return (
    <button
      className={(
        "rounded bg-gray-200 text-gray-700 p-2 hover:bg-tc-green hover:text-white " +
        className
      ).trim()}
      type={type}
      {...(id ? (id = { id }) : null)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;