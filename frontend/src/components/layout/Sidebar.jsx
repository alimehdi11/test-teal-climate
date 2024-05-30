const Sidebar = ({ className = "", children }) => {
  return <div className={("rounded " + className).trim()}>{children}</div>;
};

export default Sidebar;
