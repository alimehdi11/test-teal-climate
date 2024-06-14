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
        "rounded border-slate-600 border px-2 py-2 w-full" + className
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
