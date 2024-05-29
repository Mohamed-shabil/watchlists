import { Home } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

function Error({ text }: { text: string }) {
    const error = useRouteError();
    console.log(error);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-medium">Oops...</h2>
            <p className="text-sm font-medium">{text}</p>
            <Link to="/">
                <button className="my-5 p-2 rounded-md flex items-center gap-2 bg-rose-500 text-white text-sm">
                    <Home size={18} /> Go to Home
                </button>
            </Link>
        </div>
    );
}

export default Error;
