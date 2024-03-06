const TabButton = ({ children, ...props }) => {
  return (
    <button
      className={` cursor-pointer px-4 py-2  font-medium rounded-t-xl ${
        props.isActive
          ? "bg-[#58039e] text-gray-300"
          : "bg-[#461a75] text-gray-400"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default TabButton;
