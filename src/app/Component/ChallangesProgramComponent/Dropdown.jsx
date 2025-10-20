import React from "react";

const Dropdown = ({ title = "Click", items = [] }) => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="bg-cyan-600 px-3 py-2 rounded-xl m-1 cursor-pointer">
        {title}
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-[var(--color-primary)]"
      >
        {items.map((item, index) => (
          <li key={index}>
            {typeof item === "string" ? (
              <a>{item}</a>
            ) : (
              <a href={item.href || "#"} target={item.target || "_self"}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
