import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import GenraDetails from "../../components/GenraDetails";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  const [page, setPage] = useState();
  const [content, setContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState();
  const [selectGenres, setSelectGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL= useGenre(selectGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=bfffb45e076bd5d8779532c40b1c77bc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    //https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
    //&with_genres=${}
    setContent(data.results);
    setNoOfPages(data.total_pages);
    //console.log(data);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <GenraDetails  type="movie"
        selectGenres={selectGenres}
        setSelectGenres={setSelectGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage} />

      <div className="trending movies">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {noOfPages > 1 && (
        <CustomPagination setPage={setPage} noOfPages={noOfPages} />
      )}
    </div>
  );
};

export default Movies;
