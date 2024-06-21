const Input = ({
  className = "",
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      className={(
        "rounded border-slate-500 border px-2 py-2 w-full text-base " +
        className
      ).trim()}
      type={type}
      name={name}
      {...(id ? (id = { id }) : null)}
      // Making sure this is a controlled component
      value={value}
      {...(placeholder ? (placeholder = { placeholder }) : null)}
      onChange={onChange}
    />
  );
};

export default Input;
