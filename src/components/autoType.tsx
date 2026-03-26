import React from 'react';
import Typed from 'typed.js';

function AutoType(props) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  console.log(props.name);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [props.name],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [props]);

  return (
    <span
      style={{
        color: '#07C51A',
      }}
      ref={el}
    />
  );
}

export default AutoType;
