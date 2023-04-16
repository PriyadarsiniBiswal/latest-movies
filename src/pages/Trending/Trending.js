import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Trending.css";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=bfffb45e076bd5d8779532c40b1c77bc&page=${page}`
    );

    setContent(data.results);
    //bfffb45e076bd5d8779532c40b1c77bc

   // console.log(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
            ))}
      </div>
      <CustomPagination setPage={setPage}/>
    </div>
  );
};

export default Trending;
