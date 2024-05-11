import React from 'react';
import logo from '../images/homepage.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import EditorComponent from './EditorComponent';

const HomeContent = () => {
  return (
    <div className="flex justify-center items-center w-lvw">
      <div className="homeContent w-1/2">
        <h1 className="logo font-bold text-2xl mx-2 text-primary">urSpace,</h1>
        <p>
          The only interview taking platform that is optimized for quality
          interview time. We offer real time communication through video
          conference, real time shared coding IDE along with a whiteboard as
          well which helps to make interview process easier.
        </p>
      </div>
      <div className="homePicture my-28">
        <LazyLoadImage className=" max-w-xl" src={logo} effect="blur" />
        {/* <img src={logo} alt="picture of homepage" className=" max-w-xl" /> */}
      </div>
    </div>
  );
};

export default HomeContent;
