import { Chip } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";

const GenraDetails = ({
  type,
  selectGenres,
  setSelectGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectGenres([...selectGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectGenres(
      selectGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenreDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=bfffb45e076bd5d8779532c40b1c77bc&language=en-US`
    );
    setGenres(data.genres);
  };
  

  useEffect(() => {
    fetchGenreDetails();

    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectGenres &&
        selectGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            color="primary"
            key={genre.id}
            clickable onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres && genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default GenraDetails;
