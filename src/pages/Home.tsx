import { Loader2 as Loader } from "lucide-react";
import Notification from "../components/Notification";
import SideBar from "../components/SideBar";

import { Outlet, useNavigation } from "react-router-dom";

function Home() {
    const navigation = useNavigation();
    return (
        <main className="flex overflow-hidden overflow-y-hidden">
            <SideBar />
            <div className="container md:mx-12 mt-5">
                <Notification />
                {navigation.state === "loading" ? (
                    <div className="w-full h-full flex flex-1 items-center">
                        <Loader
                            size={18}
                            className="animate-spin text-rose-500"
                        />
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </main>
    );
}

export default Home;
