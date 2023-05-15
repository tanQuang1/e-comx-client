import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function CustomToast() {
  // toast.error('Wow so easy!');
  // or toast(message, {type: "info"});
  return (
    <ToastContainer
      icon={false}
      style={{
        fontSize: '1.6rem',
      }}
      position='bottom-right'
      autoClose={1000}
      hideProgressBar
      limit={3}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme='colored'
    />
  );
}
