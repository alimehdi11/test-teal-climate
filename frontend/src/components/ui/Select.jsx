const Select = ({ children, className = "", id = "", onChange, value }) => {
  return (
    <select
      className={("rounded border border-slate-600 p-3 " + className).trim()}
      {...(id ? (id = { id }) : null)}
      onChange={onChange}
      {...(value ? (value = { value }) : null)}
    >
      {children}
    </select>
  );
};

export default Select;
