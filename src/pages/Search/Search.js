import {
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

import { createTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";


const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState("");
  const [numOfPages, setNumOfPages] = useState("");

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"
      }?api_key=bfffb45e076bd5d8779532c40b1c77bc&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div className="main-div">
      {/* <span className="pageTitle">Search</span>
      style={{ display: "flex", margin: "15px 0" }} */}
      <ThemeProvider theme={darkTheme}>
        <div className="searchInput-bar">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            variant="contained"
            style={{ marginLeft: 10, padding: 12 }} onClick={fetchSearch}
          >
            { } <SearchIcon />{" "}
          </button>
        </div>
        <Tabs
          className="search-bar"
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

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
      {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      {numOfPages > 1 && (<CustomPagination setPage={setPage} noOfPages={numOfPages} />)}
    </div>
  );
};

export default Search;
