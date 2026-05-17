"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollAnimationProps {
  frameCount: number;
  folderPath: string;
  scrollHeight?: string; // e.g. "500vh"
}

export default function ScrollAnimation({
  frameCount = 48,
  folderPath = "/assets/frames/hero",
  scrollHeight = "500vh",
}: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, "0");
      img.src = `${folderPath}/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount) {
          setIsLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount) setIsLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [frameCount, folderPath]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(latest);
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      drawFrame(idx);
    }
  });

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-[#050510]">
            <div className="loader-ring" />
            <span className="text-white/30 text-sm tracking-widest uppercase">
              Loading Experience — {loadProgress}%
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
          style={{ display: isLoaded ? "block" : "none" }}
        />
        <div className="gradient-top absolute inset-x-0 top-0 h-40 pointer-events-none z-10" />
        <div className="gradient-bottom absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10" />
      </div>
    </div>
  );
}
