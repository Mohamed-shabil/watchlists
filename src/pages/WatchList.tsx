import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { removeMovieFromWatchList } from "../redux/slices/watchListSlice";
import { X } from "lucide-react";
function WatchList() {
    const watchLists = useSelector((state: RootState) => state.watchLists);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const { watchlist } = useParams();

    if (!watchlist) {
        return <h2>No data</h2>;
    }
    // @ts-ignore
    const movies = watchLists[user.email][watchlist];
    if (!movies) {
        throw new Error("No Watch List with this name");
    }
    return (
        <section>
            <h2 className="capitalize text-xl font-semibold my-10">
                {watchlist}
            </h2>
            <div
                className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                    xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 auto-rows-auto"
            >
                {movies && movies.length ? (
                    movies.map((movie, i) => (
                        <MovieCard index={i} movie={movie} key={i}>
                            <button
                                className="border-none outline-none absolute top-2 left-1"
                                onClick={() => {
                                    dispatch(
                                        removeMovieFromWatchList({
                                            email: user?.email || "",
                                            movieId: movie.imdbID,
                                            name: watchlist,
                                        })
                                    );
                                }}
                            >
                                <X className="text-white" />
                            </button>
                        </MovieCard>
                    ))
                ) : (
                    <div className="col-span-6 text-center">
                        <h2 className="font-medium text-sm ">No Movies</h2>
                    </div>
                )}
            </div>
        </section>
    );
}

export default WatchList;
