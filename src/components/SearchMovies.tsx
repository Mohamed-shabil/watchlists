import { useEffect, useState } from "react";
import { Loader2 as Loader, Search } from "lucide-react";
import { IMovie } from "../types/types";
import { queryMovies } from "../services/movie.service";
import MovieCard from "./MovieCard";
import { useInView } from "react-intersection-observer";
import SelectWatchListModal from "./SelectWatchListModal";

let page = 1;
let limit = Infinity;
function SearchMovies() {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [query, setQuery] = useState<string>("");
    const [prevQuery, setPrevQuery] = useState<string>("");
    const [changeQuery, setChangeQuery] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, SetError] = useState();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (query !== prevQuery) {
            setChangeQuery(true);
            page = 1;
            limit = Infinity;
            setPrevQuery(query);
        }
    }, [query]);

    useEffect(() => {
        if (inView) {
            handleQuery();
        }
    }, [inView]);

    const handleQuery = async () => {
        if (!query) return;
        setIsLoading(true);
        if (changeQuery) {
            setMovies([]);
            setChangeQuery(false);
        }
        if (page * 10 <= limit) {
            queryMovies(query, page)
                .then((res) => {
                    if (res.data.Error === "Movie not found!") {
                        SetError(res.data.Error);
                    } else {
                        page++;
                        limit = res.data.totalResults * 1;
                        setMovies([...movies, ...res.data.Search]);
                    }
                })
                .catch((err: any) => {
                    SetError(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };
    return (
        <section>
            <div className="w-full">
                <div className="w-full relative my-2 rounded-md flex py-6 gap-2">
                    <input
                        type="text"
                        className="pl-9 py-2 rounded-md w-full outline-none border border-gray-300"
                        placeholder="Search..."
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    <Search
                        className="absolute left-2 top-9 text-sm"
                        size={20}
                    />
                    <button
                        className="bg-rose-500 rounded-md border-none outline-none text-white py-2 px-4"
                        onClick={handleQuery}
                    >
                        Search
                    </button>
                </div>
                <div
                    className="
                    overflow-y-scroll max-h-[69vh]
                    grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                    xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 auto-rows-auto"
                >
                    {!!isLoading && (
                        <div className="w-full h-28 flex justify-center items-center col-span-6">
                            <Loader
                                className="animate-spin text-rose-500"
                                size={25}
                            />
                        </div>
                    )}
                    {error && (
                        <h2 className="text-sm font-medium text-center col-span-6">
                            Movie Not Found
                        </h2>
                    )}
                    {!isLoading && movies.length === 0 && (
                        <h2 className="text-sm font-medium text-center col-span-6">
                            Search for Movies
                        </h2>
                    )}
                    {!!movies.length &&
                        movies.map((movie, index) => (
                            <MovieCard
                                movie={movie}
                                key={movie.imdbID}
                                index={index}
                            >
                                <SelectWatchListModal movie={movie} />
                            </MovieCard>
                        ))}
                    {!!movies.length && page * 10 <= limit && (
                        <div className="w-full h-28 flex justify-center items-center col-span-6">
                            <Loader
                                ref={ref}
                                className="animate-spin"
                                size={25}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default SearchMovies;
