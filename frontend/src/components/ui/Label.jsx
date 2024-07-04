const Label = ({ className = "", children, ...props }) => {
  return (
    <label className={("font-medium " + className).trim()} {...props}>
      {children}
    </label>
  );
};

export default Label;
