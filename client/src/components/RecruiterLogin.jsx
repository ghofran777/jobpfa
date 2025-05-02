import React, { useEffect, useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecruiterLogin = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecruiterLogin } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === 'Sign Up') {
      if (!isTextDataSubmitted) {
        setIsTextDataSubmitted(true); // Nbadlou l step lel inputs
        return;
      }

      // Tawa ybaath l signup
      console.log("Formulaire envoyé:", { name, email, password, image });

      alert("✅ Compte créé avec succès !");
      setShowRecruiterLogin(false); // Ysakr l modal
      // Reset kol inputs
      setState('Login');
      setIsTextDataSubmitted(false);
      setName('');
      setEmail('');
      setPassword('');
      setImage(false);
      return;
    }

    if (state === 'Login') {
      console.log("Tentative de connexion:", { email, password });

      alert("✅ Connecté avec succès !");
      setShowRecruiterLogin(false);
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-8 rounded-xl text-slate-500 w-[350px]">
        
        {/* Fermer */}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute right-4 top-4 w-5 cursor-pointer"
        />

        <h1 className="text-center text-2xl text-neutral-700 font-medium">Recruiter {state}</h1>
        <p className="text-sm text-center mb-4">Welcome back! Please sign in to continue</p>

        {state === 'Sign Up' && !isTextDataSubmitted && (
          <div className="flex flex-col items-center mb-5">
            <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Logo"
                className="w-20 h-20 object-cover rounded-full mb-2"
              />
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <p className="text-xs text-center">Upload Company Logo</p>
            </label>
          </div>
        )}

        {(state === 'Login' || isTextDataSubmitted) && (
          <>
            {state === 'Sign Up' && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-4">
                <img src={assets.person_icon} alt="person" className="w-5" />
                <input
                  className="outline-none text-sm flex-1"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-4">
              <img src={assets.email_icon} alt="email" className="w-5" />
              <input
                className="outline-none text-sm flex-1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email ID"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-4">
              <img src={assets.lock_icon} alt="lock" className="w-5" />
              <input
                className="outline-none text-sm flex-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-blue-600 mb-4 cursor-pointer text-right">
            Forgot password?
          </p>
        )}

        <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
        </button>

        {state === 'Login' ? (
          <p className="mt-5 text-center text-sm">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState('Sign Up');
                setIsTextDataSubmitted(false);
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState('Login');
                setIsTextDataSubmitted(false);
              }}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RecruiterLogin;
