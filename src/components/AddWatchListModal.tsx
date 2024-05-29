import { useState } from "react";
import { PlusCircle } from "lucide-react";
import Modal from "./ui/modal";
import { useDispatch } from "react-redux";
import { addWatchList } from "../redux/slices/watchListSlice";
import { IUser } from "../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().refine((data) => !/\s/.test(data), {
        message: "Watchlist name should not contain spaces",
    }),
});
type FormFields = z.infer<typeof schema>;

function AddWatchListModal({ user }: { user: IUser }) {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<FormFields> = (value) => {
        console.log(value);
        dispatch(addWatchList({ email: user.email, name: value.name }));
        setOpen(false);
        form.reset();
        toast.success("New Watchlist is created");
    };
    const form = useForm<FormFields>({
        defaultValues: {
            name: "",
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    return (
        <main>
            <button
                className="w-full flex items-center p-2 gap-2 bg-rose-500 text-white rounded-lg my-2 text-sm"
                onClick={() => setOpen(true)}
            >
                <PlusCircle size={20} /> Create WatchList
            </button>
            <Modal
                onClose={() => {
                    setOpen(false);
                }}
                open={open}
            >
                <div className="w-full max-w-md rounded-md bg-white">
                    <div className="w-full mb-2">
                        <h2 className="text-lg font-semibold leading-none tracking-tight">
                            Create Watchlist
                        </h2>
                    </div>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2"
                    >
                        <label
                            htmlFor=""
                            className="text-sm font-medium leading-none text-left mt-2"
                        >
                            WatchList Name
                        </label>
                        <input
                            className="flex h-10 border border-input px-3 py-2 text-sm 
                                ring-offset-background placeholder:text-muted-foreground 
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                                focus-visible:ring-offset-2 mt-1 w-full rounded-md"
                            type="text"
                            {...form.register("name")}
                        />
                        {form.formState.errors.name?.message && (
                            <div className="text-red-500 text-sm">
                                {form.formState.errors.name.message}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="p-2 bg-rose-500 rounded-md my-2 text-white text-sm w-fit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </main>
    );
}

export default AddWatchListModal;
