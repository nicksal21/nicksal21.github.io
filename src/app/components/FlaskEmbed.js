'use client';

import { useEffect, useState } from 'react';

export default function FlaskEmbed({ url, height = '720px', width = '100%', title = 'Live application demo' }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!url) {
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <p>Live demo URL is not configured yet.</p>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className="flask-embed" style={{ width, height }}>
      <iframe
        src={url}
        width={width}
        height={height}
        frameBorder="0"
        style={{ border: 'none', borderRadius: '8px' }}
        title={title}
        allow="clipboard-write"
      />
    </div>
  );
}
