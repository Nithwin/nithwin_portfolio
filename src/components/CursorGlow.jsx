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

    // Interactive hover with event delegation (works for both static and dynamic elements)
    const onOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor], [role='button'], input[type='submit']");
      if (target) {
        ringRef.current?.classList.add("active");
        if (textRef.current) {
          textRef.current.textContent = target.dataset.cursor || "EXPLORE";
        }
      }
    };

    const onOut = (e) => {
      const target = e.target.closest("a, button, [data-cursor], [role='button'], input[type='submit']");
      if (target) {
        const related = e.relatedTarget?.closest?.("a, button, [data-cursor], [role='button'], input[type='submit']");
        if (!related) {
          ringRef.current?.classList.remove("active");
        }
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
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
