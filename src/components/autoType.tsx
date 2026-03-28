import React from "react";
import Typed from "typed.js";

type Props = {
  text: string;
  className?: string;
};

const AutoType: React.FC<Props> = ({ text, className }) => {
  const el = React.useRef<HTMLSpanElement | null>(null);
  const typedRef = React.useRef<InstanceType<typeof Typed> | null>(null);

  React.useEffect(() => {
    if (!el.current) return;

    // destroy previous instance if any
    if (typedRef.current) {
      typedRef.current.destroy();
      typedRef.current = null;
    }

    typedRef.current = new Typed(el.current, {
      strings: [text || ""],
      typeSpeed: 1,
      showCursor: true,
      cursorChar: "|",
      backSpeed: 20,
      backDelay: 1500,
      loop: false,
    });

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
        typedRef.current = null;
      }
    };
  }, [text]);

  return <span ref={el} className={className} />;
};

export default AutoType;
