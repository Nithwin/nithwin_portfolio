import React, { useEffect, useRef } from "react";

const CursorGlow = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3.5}px, ${pos.current.y - 3.5}px) translate(-50%, -50%) translate(3.5px, 3.5px)`;
        dotRef.current.style.left = pos.current.x + "px";
        dotRef.current.style.top = pos.current.y + "px";
      }
      if (ringRef.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top = ringPos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Interactive hover
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    const onEnter = (e) => {
      ringRef.current?.classList.add("active");
      if (textRef.current) {
        textRef.current.textContent = e.currentTarget.dataset.cursor || "OPEN";
      }
    };
    const onLeave = () => {
      ringRef.current?.classList.remove("active");
    };
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef}>
        <span id="cursor-text" ref={textRef} />
      </div>
    </>
  );
};

export default CursorGlow;
