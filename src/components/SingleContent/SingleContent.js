import React from "react";
import './SingleContent.css';
import { img_300, unavailable } from "../../config/config";
import Badge from '@mui/material/Badge';



const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <div className="media" >
     
      <Badge badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}/>
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title} </b>
      <span className="sub-title">
        {media_type === "tv" ? "TV Series" : "Movies"}
        <span className="sub-title">{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
