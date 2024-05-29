import { BookmarkPlus } from "lucide-react";
import { useState } from "react";
import Modal from "./ui/modal";
import { addMovieToWatchList } from "../redux/slices/watchListSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IMovie } from "../types/types";
import { RootState } from "../redux/store";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1, { message: "choose a watchlist" }),
});

type FormFields = z.infer<typeof schema>;

function SelectWatchListModal({ movie }: { movie: IMovie }) {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const watchLists = useSelector((state: RootState) => state.watchLists);
    const user = useSelector((state: RootState) => state.auth.user);
    const lists = Object.keys(watchLists[user?.email!]);

    const form = useForm<FormFields>({
        defaultValues: {
            name: "",
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const onSubmit: SubmitHandler<FormFields> = (value) => {
        console.log(value);
        dispatch(
            addMovieToWatchList({
                email: user?.email!,
                name: value.name,
                movie,
            })
        );
        toast.success("Movie added to watchlist", {
            duration: 2000,
        });
        setOpen(false);
    };
    return (
        <div>
            <button
                className="border-none outline-none absolute top-2 left-1"
                onClick={() => setOpen(true)}
            >
                <BookmarkPlus color="#fff" size={25} />
            </button>
            <Modal
                onClose={() => {
                    form.reset();
                    setOpen(false);
                }}
                open={open}
            >
                <div className="w-full max-w-md rounded-md bg-white">
                    <div className="w-full">
                        <h2 className="font-semibold text-lg my-2">
                            Select Watchlist
                        </h2>
                    </div>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col mx-2"
                    >
                        {lists.length ? (
                            <div>
                                {lists.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex gap-3 text-sm">
                                            <input
                                                type="radio"
                                                id={index.toString()}
                                                value={item}
                                                {...form.register("name")}
                                            />
                                            <label
                                                htmlFor={index.toString()}
                                                className="text-sm capitalize"
                                            >
                                                {item}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                {form.formState.errors.name && (
                                    <div className="text-red-500 text-sm">
                                        {form.formState.errors.name.message}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="bg-rose-500 text-white w-fit mt-4 inline-flex items-center 
                                        justify-center rounded-md text-sm font-medium h-10 px-4 py-2"
                                >
                                    Add to Watchlist
                                </button>
                            </div>
                        ) : (
                            <h2 className="font-medium text-sm text-left">
                                You don't have any watchlists, create a
                                watchlist to save movies
                            </h2>
                        )}
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default SelectWatchListModal;
