import React, { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "../api";

const Dashboard = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  // Mendapatkan data ketika website dibuka
  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div key={i} className="border rounded-md w-[25%] h- text-center bg-white">
          <h1>{movie.title}</h1>
          <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="poster" className="w-full" />
          <h2>{movie.release_date}</h2>
          <h2>{movie.vote_average}</h2>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  // console.log({ popularMovies: popularMovies });

  return (
    <>
      {/* Main container */}
      <input type="text" name="" id="" placeholder="Search" className="block mx-auto w-[70%] h-[60px] my-5 text-2xl p-5" onChange={({ target }) => search(target.value)} />
      <div className="flex flex-wrap gap-3 justify-center items-center w-full border p-5">
        {/* Movie container */}
        <PopularMovieList />
      </div>
    </>
  );
};

export default Dashboard;
