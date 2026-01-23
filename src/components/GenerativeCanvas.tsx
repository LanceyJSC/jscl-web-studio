import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
}

interface GeometricShape {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  type: 'triangle' | 'square' | 'hexagon' | 'circle';
  color: string;
  alpha: number;
  rotationSpeed: number;
}

const GenerativeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const shapesRef = useRef<GeometricShape[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDrawing: false });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const hueRef = useRef(0);
  
  const [brushSize, setBrushSize] = useState(3);
  const [symmetry, setSymmetry] = useState(6);
  const [trailLength, setTrailLength] = useState(50);
  const [colorMode, setColorMode] = useState<'rainbow' | 'monochrome' | 'gradient'>('rainbow');
  const [shapeMode, setShapeMode] = useState<'lines' | 'shapes' | 'particles'>('lines');
  const [isRecording, setIsRecording] = useState(false);

  const colors = {
    rainbow: () => `hsl(${hueRef.current}, 70%, 50%)`,
    monochrome: () => `hsl(0, 0%, ${20 + Math.random() * 30}%)`,
    gradient: () => `hsl(${200 + Math.sin(hueRef.current * 0.01) * 40}, 60%, 45%)`,
  };

  const drawShape = useCallback((ctx: CanvasRenderingContext2D, shape: GeometricShape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    ctx.scale(shape.scale, shape.scale);
    ctx.globalAlpha = shape.alpha;
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = 1.5;
    ctx.fillStyle = shape.color.replace(')', ', 0.1)').replace('hsl', 'hsla');

    ctx.beginPath();
    
    switch (shape.type) {
      case 'triangle':
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3 - Math.PI / 2;
          const x = Math.cos(angle) * 15;
          const y = Math.sin(angle) * 15;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;
      case 'square':
        ctx.rect(-10, -10, 20, 20);
        break;
      case 'hexagon':
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6;
          const x = Math.cos(angle) * 12;
          const y = Math.sin(angle) * 12;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;
      case 'circle':
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        break;
    }
    
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    pointsRef.current = [];
    shapesRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Fill with background
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const pos = getPos(e);
      mouseRef.current = { ...pos, isDrawing: true };
      lastMouseRef.current = pos;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const pos = getPos(e);
      
      if (mouseRef.current.isDrawing) {
        const dx = pos.x - lastMouseRef.current.x;
        const dy = pos.y - lastMouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Add points along the path for smoother lines
        const steps = Math.max(1, Math.floor(dist / 3));
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          pointsRef.current.push({
            x: lastMouseRef.current.x + dx * t,
            y: lastMouseRef.current.y + dy * t,
            age: 0,
            vx: dx * 0.1,
            vy: dy * 0.1,
          });
        }

        // Add shapes occasionally
        if (shapeMode === 'shapes' && Math.random() < 0.15) {
          const types: GeometricShape['type'][] = ['triangle', 'square', 'hexagon', 'circle'];
          shapesRef.current.push({
            x: pos.x,
            y: pos.y,
            rotation: Math.random() * Math.PI * 2,
            scale: 0.5 + Math.random() * 1.5,
            type: types[Math.floor(Math.random() * types.length)],
            color: colors[colorMode](),
            alpha: 0.8,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
          });
        }

        lastMouseRef.current = pos;
      }
      
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
    };

    const handleEnd = () => {
      mouseRef.current.isDrawing = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Fade effect for trails
      ctx.fillStyle = 'rgba(250, 250, 250, 0.03)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      hueRef.current = (hueRef.current + 0.5) % 360;

      // Draw symmetrical lines
      const points = pointsRef.current;
      
      for (let i = 0; i < symmetry; i++) {
        const angle = (i * Math.PI * 2) / symmetry;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.translate(-centerX, -centerY);

        for (let p = 0; p < points.length - 1; p++) {
          const point = points[p];
          const nextPoint = points[p + 1];
          
          if (point.age > trailLength) continue;
          
          const alpha = 1 - point.age / trailLength;
          const color = colors[colorMode]();
          
          ctx.beginPath();
          ctx.strokeStyle = color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
          ctx.lineWidth = brushSize * (1 - point.age / trailLength * 0.5);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          if (shapeMode === 'particles') {
            // Draw particles
            ctx.beginPath();
            ctx.arc(point.x, point.y, brushSize * alpha, 0, Math.PI * 2);
            ctx.fillStyle = color.replace(')', `, ${alpha * 0.8})`).replace('hsl', 'hsla');
            ctx.fill();
          } else {
            // Draw lines
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.stroke();
          }

          // Mirror effect
          if (i % 2 === 1) {
            ctx.beginPath();
            const mirrorX = centerX * 2 - point.x;
            if (shapeMode === 'particles') {
              ctx.arc(mirrorX, point.y, brushSize * alpha, 0, Math.PI * 2);
              ctx.fillStyle = color.replace(')', `, ${alpha * 0.5})`).replace('hsl', 'hsla');
              ctx.fill();
            } else {
              ctx.moveTo(mirrorX, point.y);
              ctx.lineTo(centerX * 2 - nextPoint.x, nextPoint.y);
              ctx.stroke();
            }
          }
        }
        
        ctx.restore();
      }

      // Draw and update shapes
      shapesRef.current.forEach((shape, index) => {
        shape.rotation += shape.rotationSpeed;
        shape.alpha -= 0.002;
        
        for (let i = 0; i < symmetry; i++) {
          const angle = (i * Math.PI * 2) / symmetry;
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);
          ctx.translate(-centerX, -centerY);
          drawShape(ctx, shape);
          ctx.restore();
        }

        if (shape.alpha <= 0) {
          shapesRef.current.splice(index, 1);
        }
      });

      // Age points and remove old ones
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1;
        points[i].x += points[i].vx;
        points[i].y += points[i].vy;
        points[i].vx *= 0.98;
        points[i].vy *= 0.98;
        
        if (points[i].age > trailLength * 2) {
          points.splice(i, 1);
        }
      }

      // Draw center indicator when not drawing
      if (!mouseRef.current.isDrawing) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fill();
        
        // Draw symmetry guides
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < symmetry; i++) {
          const angle = (i * Math.PI * 2) / symmetry;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * 50,
            centerY + Math.sin(angle) * 50
          );
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [symmetry, brushSize, trailLength, colorMode, shapeMode, colors, drawShape]);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `generative-art-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="relative w-full h-full">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ touchAction: 'none' }}
      />

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 p-4 font-mono text-xs space-y-4 w-[180px] shadow-lg"
      >
        <div className="border-b border-gray-200 pb-2">
          <span className="text-gray-400">// CONTROLS</span>
        </div>

        {/* Symmetry */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">symmetry:</span>
            <span className="text-black font-semibold">{symmetry}</span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            step="1"
            value={symmetry}
            onChange={(e) => setSymmetry(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Brush Size */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">brush:</span>
            <span className="text-black font-semibold">{brushSize}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Trail Length */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">trail:</span>
            <span className="text-black font-semibold">{trailLength}</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={trailLength}
            onChange={(e) => setTrailLength(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Color Mode */}
        <div className="space-y-2">
          <span className="text-gray-500">color:</span>
          <div className="flex gap-1 flex-wrap">
            {(['rainbow', 'monochrome', 'gradient'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setColorMode(mode)}
                className={`px-2 py-1 text-[9px] border transition-colors ${
                  colorMode === mode
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Shape Mode */}
        <div className="space-y-2">
          <span className="text-gray-500">style:</span>
          <div className="flex gap-1 flex-wrap">
            {(['lines', 'shapes', 'particles'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setShapeMode(mode)}
                className={`px-2 py-1 text-[9px] border transition-colors ${
                  shapeMode === mode
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-200">
          <button
            onClick={clearCanvas}
            className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors text-[10px]"
          >
            CLEAR
          </button>
          <button
            onClick={downloadCanvas}
            className="flex-1 py-2 bg-black hover:bg-gray-800 text-white border border-black transition-colors text-[10px]"
          >
            SAVE
          </button>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 p-3 font-mono text-[10px] text-gray-500 max-w-[160px] shadow-lg"
      >
        <div className="text-gray-400 mb-2">// INSTRUCTIONS</div>
        <div>→ Click & drag to draw</div>
        <div>→ Art mirrors {symmetry}x</div>
        <div>→ Trails fade over time</div>
        <div>→ Save your creation</div>
      </motion.div>

      {/* Title Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-4 right-4 font-mono text-[10px] text-gray-400 text-right"
      >
        <div className="text-black font-semibold">GENERATIVE_ART</div>
        <div>CANVAS_2D</div>
      </motion.div>
    </div>
  );
};

export default GenerativeCanvas;
