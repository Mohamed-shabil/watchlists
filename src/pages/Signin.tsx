import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { addWatchList } from "../redux/slices/watchListSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    email: z.string().email(),
});

type FormFields = z.infer<typeof schema>;
function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useForm<FormFields>({
        defaultValues: {
            email: "",
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const onSubmit: SubmitHandler<FormFields> = (value) => {
        dispatch(setUser(value));
        dispatch(addWatchList({ email: value.email, name: "Favourites" }));
        toast.success("Login Successfull");
        navigate("/");
    };
    return (
        <div className="w-full h-screen flex flex-row">
            <div className="w-1/2 h-full flex flex-col items-center justify-center">
                <div className="my-2">
                    <h1 className="font-semibold text-3xl">
                        Signin to{" "}
                        <span className="text-rose-500">WatchList</span>
                    </h1>
                </div>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col w-full max-w-[350px] gap-2"
                >
                    <input
                        {...form.register("email")}
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                    />
                    {form.formState.errors.email && (
                        <div className="text-red-500">
                            {form.formState.errors.email.message}
                        </div>
                    )}
                    <button className="bg-rose-500 rounded-md p-2 text-white">
                        Signin
                    </button>
                </form>
            </div>
            <div className="w-1/2 h-full">
                <img className="h-full object-cover" src="./hero.jpg" alt="" />
            </div>
        </div>
    );
}

export default Signin;
