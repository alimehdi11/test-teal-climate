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
        "w-full text-tc-black font-medium flex items-center text-left gap-x-3 py-3 px-4 rounded-md hover:bg-tc-indigo-light hover:text-tc-blue " +
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
