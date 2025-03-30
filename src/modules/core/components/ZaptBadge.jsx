import React from 'react';

function ZaptBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors"
      >
        Made on ZAPT
      </a>
    </div>
  );
}

export default ZaptBadge;