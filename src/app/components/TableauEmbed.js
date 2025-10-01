// app/components/TableauEmbed.js
'use client';

import { useEffect, useState } from 'react';

export default function TableauEmbed({ url, height = '800px', width = '100%' }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render on client side
  if (!isClient) {
    return (
      <div style={{ width, height, backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading visualization...</p>
      </div>
    );
  }

  // Extract the view name from the full URL
  // Example: https://public.tableau.com/views/TB_per_capita/TuberculosisallformsPrevalenceperCapita?:language=en-US...
  // We need: TB_per_capita/TuberculosisallformsPrevalenceperCapita
  const extractViewPath = (fullUrl) => {
    const match = fullUrl.match(/\/views\/([^?]+)/);
    return match ? match[1] : '';
  };

  const viewPath = extractViewPath(url);

  return (
    <div className='tableauPlaceholder' style={{ width, height }}>
      <iframe
        src={`https://public.tableau.com/views/${viewPath}?:embed=y&:display_count=yes&:showVizHome=no`}
        width={width}
        height={height}
        frameBorder="0"
        style={{ border: 'none' }}
        allowFullScreen
      />
    </div>
  );
}