import { X } from "lucide-react";
import React from "react";

function modal({
    open,
    onClose,
    children,
}: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed inset-0 flex justify-center items-center transition-colors z-20 w-full w-max-md ${
                open ? "visible bg-black/20" : "invisible"
            }`}
        >
            <div
                className={`bg-white rounded-xl shadow p-6 transition-all w-full max-w-md ${
                    open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                }`}
            >
                <button
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                    onClick={onClose}
                >
                    <X size={15} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default modal;
