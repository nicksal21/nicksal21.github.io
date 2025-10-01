'use client';

import { useEffect, useState } from 'react';

export default function PowerBIEmbed({ url, height = '800px', width = '100%', embedConfig = {} }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render on client side
  if (!isClient) {
    return (
      <div style={{ 
        width, 
        height, 
        backgroundColor: '#f3f4f6', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}>
        <p>Loading Power BI visualization...</p>
      </div>
    );
  }

  // Convert Power BI share URL to embed URL if needed
  const getEmbedUrl = (shareUrl) => {
    // If it's already an embed URL, return as is
    if (shareUrl.includes('embed?')) {
      return shareUrl;
    }
    
    // Convert share URL to embed URL
    // Example: https://app.powerbi.com/view?r=eyJrIjoiXXX...
    // To: https://app.powerbi.com/reportEmbed?reportId=XXX&autoAuth=true&ctid=XXX
    
    // For "Publish to web" URLs, just add embed parameters
    if (shareUrl.includes('app.powerbi.com/view')) {
      const separator = shareUrl.includes('?') ? '&' : '?';
      return `${shareUrl}${separator}embedded=true`;
    }
    
    return shareUrl;
  };

  const embedUrl = getEmbedUrl(url);

  const defaultConfig = {
    showNavContent: true,
    showFilterPane: false,
    showPageNavigator: true,
    ...embedConfig
  };

  // Build URL parameters
  const params = new URLSearchParams();
  Object.entries(defaultConfig).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      params.append(key, value.toString());
    } else if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });

  const finalUrl = `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}${params.toString()}`;

  return (
    <div className='powerbi-placeholder' style={{ width, height }}>
      <iframe
        src={finalUrl}
        width={width}
        height={height}
        frameBorder="0"
        style={{ border: 'none' }}
        allowFullScreen
        title="Power BI Report"
      />
    </div>
  );
}