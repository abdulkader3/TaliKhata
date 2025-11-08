import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../LottifyAnimetion/Lonely404Animition.json';

const NotFound = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-[400px] w-full">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </>
  );
}

export default NotFound;
