import React from "react";

function SidebarItem({
    icon,
    text,
    active,
}: {
    icon: React.ReactNode;
    text: string;
    active: boolean;
}) {
    return (
        <li
            className="relative flex items-center 
            py-2 px-3 mx-4 rounded-md 
            cursor-pointer transition-colors group
            bg-red-500 text-white"
        >
            {icon}
            <span className="overflow-hidden transition-all w-52 ml-3">
                {text}
            </span>
        </li>
    );
}

export default SidebarItem;
