import React, { useEffect } from 'react';
import './InstagramFeed.css'; 

const InstagramFeed = () => {
  useEffect(() => {
    // Load the Elfsight script dynamically
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="instagram-section">
      
      {/* 1. Badge Section */}
      <div className="badge-container">
        <span className="badge">
           <span className="badge-dot"></span>
           Social Media
        </span>
      </div>

      {/* 2. Main Heading */}
      <h2 className="section-heading">
        Follow us on <span className="highlight-text">Instagram</span>
      </h2>

      {/* 3. Subtext */}
      <p className="section-subtext">
        Stay updated with our latest projects, behind-the-scenes content, and design inspiration directly from our studio.
      </p>

      {/* 4. The Elfsight Widget Code */}
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