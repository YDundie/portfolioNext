import React, { useRef, useState, useEffect } from 'react';

import isMobile from 'is-mobile';

const VideoBackground = ({ videoUrl }) => {
  const playerRef = useRef(0);
  const [time, setTime] = useState(0.1);
  const [lastY, setLastY] = useState(0);

  const handleWheel = (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      playerRef.current.currentTime -= 0.07;
    } else {
      playerRef.current.currentTime += 0.07;
    }
  };

  const handleTouch = (e) => {
    if (e.touches[0].clientY > lastY) {
      playerRef.current.currentTime -= 0.04;
    } else {
      playerRef.current.currentTime += 0.04;
    }
    setLastY(e.touches[0].clientY);
  };

  return (
    <div>
      {isMobile() ? (
        <div>
          <video onTouchMove={handleTouch} ref={playerRef} width="100%" muted autoPlay controls={false} onTimeUpdate={() => setTime(playerRef.current.currentTime)} onSeeked={() => setTime(playerRef.current.currentTime)}>
            <source src={'./mobile.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <video onWheel={handleWheel} ref={playerRef} loop height="100%" onTimeUpdate={() => setTime(playerRef.current.currentTime)} onSeeked={() => setTime(playerRef.current.currentTime)} muted>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoBackground;
