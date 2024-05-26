const List = ({ children }) => {
  return (
    <p className="text-base text-body-color dark:text-dark-6 m-[10px]">
      ✔ {children}
    </p>
  );
};

export default List;
