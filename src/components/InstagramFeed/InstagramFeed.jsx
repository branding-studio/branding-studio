import React, { useEffect } from 'react';
import './InstagramFeed.css'; 

const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="instagram-section">
      
      <div className="badge-container">
        <span className="badge">
           <span className="badge-dot"></span>
           Social Media
        </span>
      </div>

      <h2 className="section-heading">
        Follow us on <span className="highlight-text">Instagram</span>
      </h2>

      <p className="section-subtext">
        Stay updated with our latest projects, behind-the-scenes content, and design inspiration directly from our studio.
      </p>

      <div className="instagram-widget-wrapper">
        <div 
          className="elfsight-app-7b07f3d1-11ee-4414-a072-415bbee45151" 
          data-elfsight-app-lazy
        ></div>
      </div>

    </section>
  );
};

export default InstagramFeed;