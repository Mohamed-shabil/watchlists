import { MoreVertical, HomeIcon, Film, Trash, LogOut } from "lucide-react";
import AddWatchListModal from "./AddWatchListModal";
import { useDispatch, useSelector } from "react-redux";
import { removeWatchList } from "../redux/slices/watchListSlice";
import { logoutUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
function SideBar() {
    const watchList = useSelector((state: RootState) => state.watchLists);
    const user = useSelector((state: RootState) => state.auth.user);

    const [visible, setVisible] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logout successfully");
        navigate("/signin");
    };
    if (!user) {
        navigate("/signin");
        return <p>No User found</p>;
    }
    const watchLists = watchList ? Object.keys(watchList[user.email!]) : [];

    return (
        <aside className="h-screen max-w-72 w-full">
            <nav className="h-full flex flex-col border-r shadow-sm p-3">
                <div className="pb-2 flex flex-col justify-center items-center my-3">
                    <h2 className="text-4xl tracking-wider font-extrabold text-center text-rose-500">
                        Watchlists
                    </h2>
                </div>
                <ul className="flex">
                    <li className="w-full py-2 px-3 text-white bg-rose-500 rounded-md cursor-pointer">
                        <Link to="/">
                            <div className="flex items-center">
                                <HomeIcon size={20} className="mr-2" />
                                Home
                            </div>
                        </Link>
                    </li>
                </ul>
                <hr className="my-4" />
                <h2 className="pl-2 font-medium text-xl">My Lists</h2>
                <ul className="flex-1 my-2">
                    {!!watchLists.length &&
                        watchLists.map((list, index) => (
                            <li
                                className="w-full border rounded-md my-1 group/item flex justify-between px-3"
                                key={index}
                            >
                                <Link to={`/watchlist/${list}`}>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="flex text-sm font-normal">
                                            <Film size={20} className="mr-2" />
                                            {list}
                                        </span>
                                    </div>
                                </Link>
                                <button
                                    className="outline-none border-none hidden group-hover/item:block 
                                        group-hover/item:transition group-hover/item:ease-in-out 
                                        group-hover/item:delay-150"
                                    onClick={() => {
                                        dispatch(
                                            removeWatchList({
                                                email: user?.email,
                                                name: list,
                                            })
                                        );
                                    }}
                                >
                                    <Trash
                                        size={18}
                                        className="text-rose-500"
                                    />
                                </button>
                            </li>
                        ))}
                </ul>
                <AddWatchListModal user={user} />
                <div className="border-t flex p-2">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user?.email}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div
                        className={`flex relative justify-between items-center w-52 ml-3`}
                    >
                        <div className="leading-4">
                            <span className="text-xs text-gray-600">
                                {user?.email}
                            </span>
                        </div>
                        <button
                            className="group/logout"
                            onClick={() => {
                                setVisible(!visible);
                            }}
                        >
                            <MoreVertical size={20} />
                        </button>
                        <div
                            className={`${
                                visible ? "flex" : "hidden"
                            } p-2 items-center bg-white border border-gray-300 shadow-lg rounded-md w-36 h-12 absolute -top-14 -right-14`}
                        >
                            <button
                                className="flex gap-3 items-center text-sm cursor-pointer"
                                onClick={handleLogout}
                            >
                                <LogOut
                                    size={"1.2em"}
                                    className="text-rose-500"
                                />{" "}
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export default SideBar;
