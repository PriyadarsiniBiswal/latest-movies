import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useState, useEffect } from 'react';
import { img_500, unavailable } from '../../config/config';
import './ContentModal.css';


const style = {
  position: 'absolute',
  width: "90%",
  height: "75%",
  // bgcolor: "#39445a",
  color: "white",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#39445a',
  border: '1px solid #282c34',
  boxShadow: 24,
  p: 4,
};

function ContnetModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  // const fetchVideo = async () => {
  //   const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=bfffb45e076bd5d8779532c40b1c77bc&language=en-US`);
  //   // console.log(data);
  //   setVideo(data.results[0]?.key);

  // };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/movie?api_key=bfffb45e076bd5d8779532c40b1c77bc&language=en-US`
    );
console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    fetchData();
    //fetchVideo();
  }, []);


  return (
    <div>
      <Button  onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (<div className='ContentModal'>
              <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} />
            </div>)}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ContnetModal