'use client'
import React, { useEffect } from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Import the theme

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

function ChapterContent({
    chapter,
    content,
}) {

    useEffect(() => {
        //console.log('This is content', content)
        //console.log('This is vidID', content?.videoId)
    }, [content])

    const removePrecodeTags = (code) => {
      return code.replace(/<\/?precode>/g, ''); // Replace <precode> and </precode> with an empty string
    };
    useEffect(() => {
      // Trigger Prism.js to highlight the code after the component mounts or updates
      Prism.highlightAll();
    }, [content]);


  return (
    <div className='p-10'>
        <h2 className='font-medium text-2xl'>{chapter?.chapterName}</h2>
        <h2 className='text-gray-500 mt-5'>{chapter?.about}</h2>

        {/* Video */}
        {content?.videoId && (
    <div className='flex justify-center my-6'>
        <YouTube videoId={content.videoId} opts={opts} />
    </div>
)}


<div>
        {content?.content?.explanation?.map((item, index) => (
          <div key={index} className='p-5 bg-slate-50 mb-5 rounded-lg'>
            <h2 className='font-medium text-2xl mb-3'>{item?.title}</h2>
            <ReactMarkdown className='text-lg'>{item?.description}</ReactMarkdown>

           
            {item.code && (
              <div className='p-4 bg-black text-lg back text-white rounded-lg mt-3 overflow-x-auto'>
                <pre className='whitespace-pre-wrap'>
                  <code className='language-javascript'>
                   {removePrecodeTags(item?.code)}
                  </code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* content */}
    </div>
  );
}

export default ChapterContent;