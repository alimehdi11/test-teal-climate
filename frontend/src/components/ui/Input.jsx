const Input = ({
  className = "",
  type = "text",
  name = "",
  id = "",
  value = "",
  placeholder = "",
  onChange = null,
}) => {
  return (
    <input
      className={(
        "rounded border-slate-600 border w-full h-4 px-2 py-4 " + className
      ).trim()}
      type={type}
      {...(name ? (name = { name }) : null)}
      {...(id ? (id = { id }) : null)}
      {...(value ? (value = { value }) : null)}
      {...(placeholder ? (placeholder = { placeholder }) : null)}
      onChange={onChange}
    />
  );
};

export default Input;
