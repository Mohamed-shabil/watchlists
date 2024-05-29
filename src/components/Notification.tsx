import { BookmarkPlus } from "lucide-react";

function Notification() {
    return (
        <div className="flex flex-col border border-rose-800 p-4 rounded-lg">
            <h2 className="font-medium text-3xl py-2 mb-7">
                Welcome to <span className="text-rose-500">Watchlists</span>
            </h2>
            <p>
                {
                    "Browse movies, add them to watchlists and share them with friends."
                }
            </p>
            <p className="flex">
                {"Just click the"} <BookmarkPlus /> {"to add a movie to list"}
            </p>
        </div>
    );
}

export default Notification;
