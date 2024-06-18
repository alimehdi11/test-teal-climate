// const Input = ({ className, type, ...props }) => {
//   return (
//     <input
//       type={type}
//       className={(
//         "rounded border-slate-600 border px-2 py-2 w-full text-base " +
//         className
//       ).trim()}
//       {...props}
//     />
//   );
// };

// export default Input;

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
        "rounded border-slate-600 border px-2 py-2 w-full text-base " +
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
