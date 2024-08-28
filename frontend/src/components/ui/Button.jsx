const Button = ({
  children,
  className = "",
  type = "",
  id = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={(
        "bg-tc-green text-white min-w-40 hover:opacity-95 font-medium py-3 px-4 rounded-md " +
        className
      ).trim()}
      {...(type ? (type = { type }) : null)}
      {...(id ? (id = { id }) : null)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
