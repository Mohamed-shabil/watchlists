import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (isSignedIn === false) {
            navigate("/signin", { replace: true });
        }
    }, [navigate, isSignedIn]);
    return children;
}

export default ProtectedRoute;
