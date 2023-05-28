import React, { useRef, useEffect } from 'react';

const AutoClickButton = ({ fn}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buttonRef.current.click();
        }
      });
    });
    observer.observe(buttonRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = fn;

  return (
    <div>
      <button  ref={buttonRef} onClick={handleClick}>
      </button>
    </div>
  );
};

export default AutoClickButton;
