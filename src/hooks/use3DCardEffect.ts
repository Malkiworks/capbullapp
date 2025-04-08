import { useEffect } from 'react';

/**
 * A custom hook that applies 3D card effects to elements with the 'card-3d' class
 * @param selector Optional CSS selector to target specific card-3d elements (default: '.card-3d')
 */
export const use3DCardEffect = (selector: string = '.card-3d') => {
  useEffect(() => {
    // Function to handle 3D card effects with mouse movement
    const handleCardEffect = () => {
      const cards = document.querySelectorAll(selector);
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          
          const width = rect.width;
          const height = rect.height;
          
          // Calculate rotation based on mouse position
          const rotateY = ((x / width) - 0.5) * 10; // -5 to 5 degrees
          const rotateX = -((y / height) - 0.5) * 10; // -5 to 5 degrees
          
          // Apply transformation
          const htmlCard = card as HTMLElement;
          htmlCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          
          // Add the shine effect
          htmlCard.style.setProperty('--shine-x', `${(x / width) * 100}%`);
          htmlCard.style.setProperty('--shine-y', `${(y / height) * 100}%`);
          htmlCard.style.setProperty('--shine-opacity', '1');
        });
        
        card.addEventListener('mouseleave', () => {
          const htmlCard = card as HTMLElement;
          htmlCard.style.transform = '';
          htmlCard.style.setProperty('--shine-opacity', '0');
        });
      });
    };
    
    // Call the function after components are mounted
    handleCardEffect();
    
    // Cleanup event listeners on component unmount
    return () => {
      const cards = document.querySelectorAll(selector);
      cards.forEach(card => {
        card.replaceWith(card.cloneNode(true));
      });
    };
  }, [selector]);
}; 