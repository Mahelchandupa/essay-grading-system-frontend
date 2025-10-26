import React from 'react';
import { ToastContainer } from 'react-toastify';
import { configureToast } from '../utils/toast';

export const ToastProvider = ({ children }) => {
  const toastConfig = configureToast();

  return (
    <>
      {children}
      <ToastContainer
        position={toastConfig.position}
        autoClose={toastConfig.autoClose}
        hideProgressBar={toastConfig.hideProgressBar}
        newestOnTop={false}
        closeOnClick={toastConfig.closeOnClick}
        rtl={false}
        pauseOnFocusLoss
        draggable={toastConfig.draggable}
        pauseOnHover={toastConfig.pauseOnHover}
        theme={toastConfig.theme}
        style={{
          zIndex: 9999,
        }}
        toastStyle={toastConfig.style}
        progressStyle={toastConfig.progressStyle}
      />
    </>
  );
};

export default ToastProvider;