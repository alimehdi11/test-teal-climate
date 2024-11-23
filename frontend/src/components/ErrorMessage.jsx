const ErrorMessage = ({ className = "", children, ...props }) => {
  return (
    <div
      className={("text-[#EA4B44] break-words text-sm italic " + className).trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
