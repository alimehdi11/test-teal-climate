const Button = ({ children, className = "", type = "", id = "", onClick }) => {
  return (
    <button
      className={(
        "rounded bg-gray-200 text-gray-700 p-2 hover:bg-tc-green hover:text-white " +
        className
      ).trim()}
      {...(type ? (type = { type }) : null)}
      {...(id ? (id = { id }) : null)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
