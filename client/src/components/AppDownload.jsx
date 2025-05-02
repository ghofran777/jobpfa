import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className="bg-blue-50 py-4">
      <div className="max-w-md mx-auto text-center px-4">
        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Get the App
        </h2>

        <div className="flex justify-center gap-2 mb-2">
          <a href="#">
            <img
              src={assets.play_store}
              alt="Google Play"
              className="w-24 border border-gray-300 rounded p-1 hover:shadow-sm transition"
            />
          </a>
          <a href="#">
            <img
              src={assets.app_store}
              alt="App Store"
              className="w-24 border border-gray-300 rounded p-1 hover:shadow-sm transition"
            />
          </a>
        </div>

        <div className="border border-gray-300 rounded p-2 mt-2">
          <img
            src={assets.app_main_img}
            alt="App Preview"
            className="w-32 mx-auto rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
