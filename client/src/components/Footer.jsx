import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-md mx-auto my-10 p-4 text-center space-y-4">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" className="w-32 mx-auto" />

      {/* Copyright */}
      <p className="text-gray-500 text-sm">
        All rights reserved. &copy; Job-Portal
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-4">
        <img
          src={assets.facebook_icon}
          alt="Facebook"
          className="w-6 hover:scale-110 transition cursor-pointer"
        />
        <img
          src={assets.twitter_icon}
          alt="Twitter"
          className="w-6 hover:scale-110 transition cursor-pointer"
        />
        <img
          src={assets.instagram_icon}
          alt="Instagram"
          className="w-6 hover:scale-110 transition cursor-pointer"
        />
      </div>
    </footer>
  );
};

export default Footer;
