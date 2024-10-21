const Select = ({ children, className = "", id = "", onChange, value }) => {
  return (
    <select
      className={(
        "w-full text-[16px] h-11 rounded-md bg-tc-input-background p-2 font-poppins " +
        className
      ).trim()}
      {...(id ? (id = { id }) : null)}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  );
};

export default Select;
