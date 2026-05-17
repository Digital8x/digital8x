"use client";

import React, { useEffect, useRef, useState } from "react";

interface FrameAnimationProps {
  frameCount: number;
  folderPath: string;
  className?: string;
  trigger?: "scroll" | "loop";
}

export default function FrameAnimation({
  frameCount,
  folderPath,
  className = "",
  trigger = "scroll",
}: FrameAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `${folderPath}/frame-${frameNumber}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };
      preloadedImages.push(img);
    }
    setImages(preloadedImages);
  }, [frameCount, folderPath]);

  // Render Loop
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId: number;

    const render = () => {
      const img = images[currentFrameRef.current];
      if (img) {
        // Clear and Draw
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Cover logic
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      if (trigger === "loop") {
        currentFrameRef.current = (currentFrameRef.current + 1) % frameCount;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images, frameCount, trigger]);

  // Scroll Sync
  useEffect(() => {
    if (trigger !== "scroll") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = window.scrollY / scrollHeight;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollProgress * frameCount)
      );
      currentFrameRef.current = frameIndex;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [frameCount, trigger]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
