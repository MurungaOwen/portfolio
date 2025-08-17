import React, { useEffect, useRef } from 'react';

interface CredlyBadgeProps {
  badgeId: string;
  width?: number;
  height?: number;
}

const CredlyBadge: React.FC<CredlyBadgeProps> = ({ 
  badgeId, 
  width = 150, 
  height = 270 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Function to inject the Credly embed div
    const injectCredlyBadge = () => {
      if (!containerRef.current) return;

      // Clear previous content
      containerRef.current.innerHTML = '';

      // Create the Credly div element
      const credlyDiv = document.createElement('div');
      credlyDiv.setAttribute('data-iframe-width', width.toString());
      credlyDiv.setAttribute('data-iframe-height', height.toString());
      credlyDiv.setAttribute('data-share-badge-id', badgeId);
      credlyDiv.setAttribute('data-share-badge-host', 'https://www.credly.com');

      containerRef.current.appendChild(credlyDiv);

      // Load or reload the Credly script
      if (!scriptLoaded.current) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = '//cdn.credly.com/assets/utilities/embed.js';
        
        script.onload = () => {
          scriptLoaded.current = true;
        };

        document.body.appendChild(script);
      } else {
        // If script is already loaded, manually trigger the embed
        // This is a workaround since Credly doesn't provide a reinit method
        const newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.async = true;
        newScript.src = '//cdn.credly.com/assets/utilities/embed.js?' + Date.now();
        document.body.appendChild(newScript);
        
        // Clean up the temporary script after a delay
        setTimeout(() => {
          if (newScript.parentNode) {
            newScript.parentNode.removeChild(newScript);
          }
        }, 1000);
      }
    };

    // Inject badge with a small delay to ensure React has rendered
    const timeoutId = setTimeout(injectCredlyBadge, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [badgeId, width, height]);

  return <div ref={containerRef} className="credly-badge-container inline-block" />;
};

export default CredlyBadge;