const ErrorMessage = ({ className = "", children, ...props }) => {
  return (
    <div
      className={("text-red-600 break-words " + className).trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
