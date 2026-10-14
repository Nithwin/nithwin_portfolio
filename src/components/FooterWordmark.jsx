import React, { useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function FooterWordmark() {
  const { isDark } = useTheme() || { isDark: true };
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let targetX = canvas.width * 0.5;
    let targetY = canvas.height * 0.54;
    let mx = targetX;
    let my = targetY;
    let isHovered = false;

    const updateCoords = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (clientX - rect.left) * (canvas.width / rect.width);
      targetY = (clientY - rect.top) * (canvas.height / rect.height);
      isHovered = true;
    };

    const handleMouseMove = (e) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetX = canvas.width * 0.5;
      targetY = canvas.height * 0.54;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleMouseLeave);

    const renderFooterWordmark = () => {
      const W = canvas.width;
      const H = canvas.height;
      const isL = !isDark;

      // Smooth kinetic follow
      mx += (targetX - mx) * 0.18;
      my += (targetY - my) * 0.18;

      ctx.clearRect(0, 0, W, H);

      ctx.font = "900 142px 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textX = W * 0.5;
      const textY = H * 0.54;

      // 1. Base architectural wireframe outline
      ctx.strokeStyle = isL ? "rgba(17, 17, 19, 0.22)" : "rgba(244, 243, 239, 0.2)";
      ctx.lineWidth = 2.5;
      ctx.strokeText("NITHWIN", textX, textY);

      // 2. Clipped spotlight fill following cursor
      const spotRadius = isHovered ? 230 : 190;
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, spotRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = isL ? "#0038FF" : "#FF3B1D";
      ctx.fillText("NITHWIN", textX, textY);
      ctx.restore();

      // 3. Subtle ambient electric aura ring
      if (isHovered) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, spotRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isL ? "rgba(0, 56, 255, 0.28)" : "rgba(255, 59, 29, 0.32)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(renderFooterWordmark);
    };

    animId = requestAnimationFrame(renderFooterWordmark);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      id="footer-wordmark-canvas"
      width={1280}
      height={170}
      className="footer-wordmark-canvas"
      data-cursor="LIGHTNING SPOTLIGHT"
      aria-label="NITHWIN"
    />
  );
}
