import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, resetUser } from 'stores/user';
import { useWindowSize } from 'hooks/useWindowSize';

import Logo from 'assets/images/logo.svg';
import LogoBlack from 'assets/images/logo-black.svg';
import Background from 'assets/images/get-started.png';
// import Message1 from 'assets/images/message1.svg';
// import Message2 from 'assets/images/message2.svg';
// import Message3 from 'assets/images/message3.svg';
// import Message4 from 'assets/images/message4.svg';

const GetStarted = () => {
  const [width, height] = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('mymarvin_token');
  const logged = localStorage.getItem('mymarvin_logged');
  const { user } = useSelector((state) => state.userStore);
  const [mode, setMode] = useState('light');

  const handleRegister = () => {
    navigate('/auth/register');
  };

  const onSelectMode = (mode) => {
    setMode(mode);
  };

  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => onSelectMode(e.matches ? 'dark' : 'light'));

    // Setup dark/light mode for the first time
    onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Remove listener
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
    };
  }, []);

  useEffect(() => {
    if (token && logged) {
      dispatch(getProfile());
    }

    return () => {
      dispatch(resetUser());
    };
  }, [token]);

  if (user && user.ainame && user.verify) {
    navigate('/home');
  } else if (user && !user.verify) {
    navigate('/welcome');
  } else if (user && !user.ainame) {
    navigate(`/auth/create-ai?token=${token}`);
  } else {
    return (
      <div
        className="w-full h-full max-w-3xl py-6  !bg-contain mx-auto overflow-y-auto overflow-x-hidden flex"
        style={{
          background: `url(${Background}) no-repeat center center`
        }}
      >
        <div className="w-full h-full ">
          <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-12 text-center sm:px-6 bg-header-linear-light dark:bg-header-linear">
            {mode === 'dark' ? (
              <img alt="" src={Logo} style={{ height: '30px' }} />
            ) : (
              <img alt="" src={LogoBlack} style={{ height: '30px' }} />
            )}
          </div>

          <div className="w-full">
            <div
              className="w-full h-[380px] sm:h-[430px] overflow-hidden flex items-end"
              style={{
                height: height < 569 ? '260px' : ''
              }}
            >
              {/* <div className="w-full px-4 sm:px-6">
                <div className="flex justify-end w-full">
                  <img alt="chat1" src={Message1} />
                </div>
                <div className="flex justify-start w-full mt-3">
                  <img alt="chat2" src={Message2} />
                </div>
                <div className="flex justify-end w-full mt-3">
                  <img alt="chat3" src={Message3} />
                </div>
                <div className="flex justify-start w-full mt-3">
                  <img alt="chat4" src={Message4} />
                </div>
              </div> */}
            </div>

            <div className="w-full px-4 mt-6 text-center sm:px-6 sm:mt-12 ">
              <h2
                className="max-w-[60%] sm:max-w-sm mx-auto text-2xl sm:text-4xl font-semibold text-black dark:text-white"
                style={{
                  fontSize: width < 321 ? '20px' : ''
                }}
              >
                Introducing your personal AI
              </h2>

              <button
                onClick={handleRegister}
                className="w-full bg-[#1570EF] rounded-full p-3 mt-6 sm:mt-12 text-white text-md sm:text-lg font-medium"
              >
                Get started
              </button>

              <div className="flex justify-center mt-4 sm:mt-6">
                <p className="text-base font-normal text-gray-700 dark:text-[#9AA4B2]">
                  Have an account?{' '}
                  <Link
                    to="/auth/login"
                    className="text-base font-semibold text-black dark:text-white"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default GetStarted;
