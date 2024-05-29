import { IMovie } from "../types/types";
import { motion } from "framer-motion";
import React from "react";

const variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};
function MovieCard({
    movie,
    index,
    children,
}: {
    movie: IMovie;
    index: number;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: (index % 10) * 0.2,
                ease: "easeInOut",
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
            className="w-full max-w-[250px] shadow-md rounded-md my-2 overflow-hidden"
        >
            <div className="relative">
                <img
                    className="w-full h-52 object-cover"
                    src={movie.Poster}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://ui.shadcn.com/placeholder.svg";
                    }}
                    alt={movie.Title}
                />
                {children}
            </div>
            <div className="w-full px-2 py-2 h-24">
                <h3 className="font-medium line-clamp-2">{movie.Title}</h3>
                <p className="text-gray-400">{`(${movie.Year})`}</p>
            </div>
        </motion.div>
    );
}

export default MovieCard;
