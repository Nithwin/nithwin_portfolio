import React, { useEffect, useRef } from "react";

/**
 * CursorGlow — a subtle ambient glow that follows the mouse cursor.
 * Uses lerp-based RAF animation for silky 60fps tracking.
 * Only visible on desktop pointer devices.
 */
const CursorGlow = () => {
  const glowRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const inner = innerRef.current;
    if (!glow || !inner) return;

    // Check if device has a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0;
    let ix = 0, iy = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let rafId;
    let visible = false;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        glow.style.opacity = "1";
        inner.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      glow.style.opacity = "0";
      inner.style.opacity = "0";
    };

    const animate = () => {
      // Outer glow — slow, dreamy follow
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      glow.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;

      // Inner dot — snappy follow
      ix += (targetX - ix) * 0.2;
      iy += (targetY - iy) * 0.2;
      inner.style.transform = `translate3d(${ix - 4}px, ${iy - 4}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer ambient glow */}
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,255,0.07) 0%, rgba(0,212,255,0.03) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.6s ease",
        }}
      />
      {/* Inner crisp dot */}
      <div
        ref={innerRef}
        className="cursor-glow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(123,47,255,0.5)",
          boxShadow: "0 0 12px rgba(123,47,255,0.3)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.4s ease",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
};

export default CursorGlow;
