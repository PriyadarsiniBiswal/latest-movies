import { createTheme, ThemeProvider } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});
const CustomPagination = ({ setPage, noOfPages = 10 }) => {
  const HandlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme} >
        <Pagination
          count={noOfPages}
          onChange={(e) => HandlePageChange(e.target.textContent)} color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
