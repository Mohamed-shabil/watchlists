import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SearchMovies from "./components/SearchMovies";
import WatchList from "./pages/WatchList";
import Error from "./pages/Error";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <Error text={"Something went wrong.."} />,
            children: [
                {
                    path: "/",
                    element: (
                        <ProtectedRoute>
                            <SearchMovies />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/watchlist/:watchlist",
                    element: (
                        <ProtectedRoute>
                            <WatchList />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
        {
            path: "/signin",
            element: <Signin />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "*",
            element: <Error text={"Page Not Found"} />,
        },
    ]);
    return (
        <main>
            <Toaster />
            <RouterProvider router={router} />
        </main>
    );
}

export default App;
