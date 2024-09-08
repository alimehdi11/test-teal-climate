const SidebarItem = ({ children, className, ...props }) => {
  return (
    <div
      className={(
        "text-tc-black font-medium flex items-center gap-x-3 py-3 px-4 rounded-md hover:bg-tc-indigo-light hover:text-tc-blue [&_img:first-child]:size-5 [&_img:first-child]:min-h-5 [&_img:first-child]:min-w-5 " +
        className
      ).trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default SidebarItem;
