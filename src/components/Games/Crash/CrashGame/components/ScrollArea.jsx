import React, { useRef, useEffect, useState, forwardRef } from "react";

const ScrollArea = forwardRef(({ children, className = "", height = "300px" }, ref) => {
  const containerRef = ref || useRef(null);
  const thumbRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(0);

  // Calculate thumb height dynamically
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateThumb = () => {
      const scrollRatio = container.clientHeight / container.scrollHeight;
      setThumbHeight(Math.max(container.clientHeight * scrollRatio, 20)); // minimum thumb size
    };

    updateThumb();
    container.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    return () => {
      container.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {/* Scrollable Content */}
      <div
        ref={containerRef}
        className="scroll-content"
      >
        {children}
      </div>

      {/* Custom scrollbar */}
      <div className="scrollbar-track">
        <div ref={thumbRef} className="scrollbar-thumb" style={{ height: thumbHeight }} />
      </div>
    </div>
  );
});

export default ScrollArea;
