import React from 'react';

export default function PageNotFound() {
  //------------------- Render GUI ----------------------
  return (
    <div className='flex justify-center items-start w-full min-h-mainWindow p-5 overflow-hidden bg-gradient-radial-bottom from-gray-800 to-black box-border'>
      <div className='relative flex flex-col justify-start items-center w-[800px] max-w-full h-full mb-14 box-border'>
        <div className='flex justify-between items-center flex-col w-full max-w-2xl p-5 bg-white bg-opacity-25 rounded-2xl mt-7 z-0 md:flex-row'>
          <div className='w-auto'>
            <div className='text-gray-100 font-bold' style={{ WebkitTextStroke: '1px black' }}>
              <h1
                className='text-5xl font-MyFont-bold mb-7'
                style={{
                  background: '-webkit-linear-gradient(90deg, #f85c5c, rgb(238, 116, 136) 50%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {/* <div>{t(`pages.articles.readingTime`, { readingTime })}</div> */}
                Error 4<span className='text-4xl'>💔</span>4
              </h1>
              <h2 className='text-2xl'>
                Oopse...
                <span>&nbsp;🙄</span>
                <br />
                something went wrong
              </h2>
            </div>
          </div>
          <div className='w-auto'></div>
        </div>
        <div className='relative flex justify-center items-center w-full max-w-2xl rounded-2xl bg-transparent'>
          <div>💔 💔 💔</div>
        </div>
        <p className='w-full max-w-2xl p-5 bg-orange-100 rounded-2xl text-lg text-left font-MyFont z-0 bg-opacity-90 mt-3'>
          This page most likely doesn't exists. If however you know that it's should be, please contact us!
        </p>
      </div>
    </div>
  );
}
