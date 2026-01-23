import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  trail: { x: number; y: number }[];
}

interface ParticlePlaygroundProps {
  className?: string;
}

const ParticlePlayground: React.FC<ParticlePlaygroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const animationRef = useRef<number>();
  const [particleCount, setParticleCount] = useState(0);
  const [gravity, setGravity] = useState(0.15);
  const [mouseForce, setMouseForce] = useState<'attract' | 'repel' | 'none'>('attract');
  const [showTrails, setShowTrails] = useState(true);
  const [friction, setFriction] = useState(0.995);

  const colors = [
    'rgba(17, 17, 17, 0.9)',
    'rgba(50, 50, 50, 0.9)',
    'rgba(80, 80, 80, 0.9)',
    'rgba(120, 120, 120, 0.8)',
    'rgba(160, 160, 160, 0.7)',
  ];

  const createParticle = useCallback((x: number, y: number, vx = 0, vy = 0): Particle => {
    const radius = Math.random() * 8 + 4;
    return {
      x,
      y,
      vx: vx + (Math.random() - 0.5) * 4,
      vy: vy + (Math.random() - 0.5) * 4,
      radius,
      mass: radius * radius,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
    };
  }, []);

  const spawnParticles = useCallback((x: number, y: number, count: number = 5) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(x, y));
    }
    setParticleCount(particlesRef.current.length);
  }, [createParticle]);

  const clearParticles = useCallback(() => {
    particlesRef.current = [];
    setParticleCount(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isPressed = true;
      const rect = canvas.getBoundingClientRect();
      spawnParticles(e.clientX - rect.left, e.clientY - rect.top, 8);
    };

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
    };

    // Touch event handlers
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      mouseRef.current.isPressed = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      spawnParticles(touch.clientX - rect.left, touch.clientY - rect.top, 8);
    };

    const handleTouchEnd = () => {
      mouseRef.current.isPressed = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Spawn initial particles
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push(
        createParticle(
          Math.random() * rect.width,
          Math.random() * rect.height * 0.5
        )
      );
    }
    setParticleCount(particlesRef.current.length);

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < rect.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply gravity
        p.vy += gravity;

        // Apply mouse force
        if (mouseForce !== 'none') {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200 * 0.5;
            const forceDir = mouseForce === 'attract' ? 1 : -1;
            p.vx += (dx / dist) * force * forceDir;
            p.vy += (dy / dist) * force * forceDir;
          }
        }

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls with energy loss
        const bounceLoss = 0.7;
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx *= -bounceLoss;
        } else if (p.x + p.radius > rect.width) {
          p.x = rect.width - p.radius;
          p.vx *= -bounceLoss;
        }
        
        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy *= -bounceLoss;
        } else if (p.y + p.radius > rect.height) {
          p.y = rect.height - p.radius;
          p.vy *= -bounceLoss;
          
          // Add small random horizontal velocity when resting
          if (Math.abs(p.vy) < 0.5) {
            p.vx += (Math.random() - 0.5) * 0.3;
          }
        }

        // Particle-particle collisions
        for (let j = i - 1; j >= 0; j--) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p.radius + p2.radius;

          if (dist < minDist && dist > 0) {
            // Collision response
            const nx = dx / dist;
            const ny = dy / dist;
            
            // Relative velocity
            const dvx = p.vx - p2.vx;
            const dvy = p.vy - p2.vy;
            const dvn = dvx * nx + dvy * ny;
            
            // Only resolve if particles are moving towards each other
            if (dvn > 0) {
              const restitution = 0.8;
              const impulse = (2 * dvn) / (p.mass + p2.mass) * restitution;
              
              p.vx -= impulse * p2.mass * nx;
              p.vy -= impulse * p2.mass * ny;
              p2.vx += impulse * p.mass * nx;
              p2.vy += impulse * p.mass * ny;
            }
            
            // Separate overlapping particles
            const overlap = (minDist - dist) / 2;
            p.x -= overlap * nx;
            p.y -= overlap * ny;
            p2.x += overlap * nx;
            p2.y += overlap * ny;
          }
        }

        // Update trail
        if (showTrails) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 15) {
            p.trail.shift();
          }
        } else {
          p.trail = [];
        }

        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color.replace('0.9', '0.2').replace('0.8', '0.15').replace('0.7', '0.1');
          ctx.lineWidth = p.radius * 0.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Inner highlight
        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Remove particles that are too slow and off-screen
        if (p.y > rect.height + 100) {
          particles.splice(i, 1);
          setParticleCount(particles.length);
        }
      }

      // Draw mouse indicator
      if (mouseForce !== 'none') {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = mouseForce === 'attract' ? 'rgba(17, 17, 17, 0.3)' : 'rgba(200, 50, 50, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Outer ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gravity, mouseForce, showTrails, friction, createParticle, spawnParticles]);

  return (
    <div className={`relative w-full h-full ${className}`}>
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
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 p-4 font-mono text-xs space-y-4 max-w-[200px]"
      >
        <div className="border-b border-gray-200 pb-2 mb-2">
          <span className="text-gray-400">// CONTROLS</span>
        </div>

        {/* Particle Count */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">particles:</span>
          <span className="text-black font-semibold">{particleCount}</span>
        </div>

        {/* Gravity */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">gravity:</span>
            <span className="text-black">{gravity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={gravity}
            onChange={(e) => setGravity(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Friction */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">friction:</span>
            <span className="text-black">{((1 - friction) * 100).toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="0.95"
            max="1"
            step="0.001"
            value={friction}
            onChange={(e) => setFriction(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Mouse Force */}
        <div className="space-y-2">
          <span className="text-gray-500">mouse_force:</span>
          <div className="flex gap-1">
            {(['attract', 'repel', 'none'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setMouseForce(mode)}
                className={`px-2 py-1 text-[10px] border transition-colors ${
                  mouseForce === mode
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Trails Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">trails:</span>
          <button
            onClick={() => setShowTrails(!showTrails)}
            className={`px-2 py-1 text-[10px] border transition-colors ${
              showTrails
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {showTrails ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearParticles}
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors"
        >
          CLEAR
        </button>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 p-3 font-mono text-[10px] text-gray-500 max-w-[180px]"
      >
        <div className="text-gray-400 mb-2">// INSTRUCTIONS</div>
        <div>→ Click to spawn particles</div>
        <div>→ Move mouse to influence</div>
        <div>→ Watch physics unfold</div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute top-4 right-4 font-mono text-[10px] text-gray-400"
      >
        <div>FPS: 60</div>
        <div>RENDER: CANVAS_2D</div>
      </motion.div>
    </div>
  );
};

export default ParticlePlayground;
