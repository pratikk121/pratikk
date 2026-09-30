"use client";

import { useEffect, useRef, useState } from "react";

export default function LiquidGlassPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [refractIntensity, setRefractIntensity] = useState<"standard" | "high">("standard");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Web Audio Procedural Synthesis for AetherOS Ambient Soundscape
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioActive) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.05);
        setTimeout(() => {
          if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
          }
        }, 100);
      }
      setIsAudioActive(false);
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 220Hz ambient tone with subtle low modulation
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsAudioActive(true);
      } catch {
        setIsAudioActive(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL Context
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    let animationFrameId: number;

    if (gl) {
      const vsSource = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      // Iris Violet refraction caustics shader
      const fsSource = `
        precision mediump float;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform float u_hover;
        uniform float u_intensity;

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          vec2 mouse = u_mouse;
          
          // Distance from cursor
          float dist = distance(uv, mouse);
          
          // Refractive liquid wave displacement
          float wave = sin(dist * (24.0 * u_intensity) - u_time * 2.5) * exp(-dist * 3.5);
          vec2 disp = (uv - mouse) * wave * (0.05 + 0.09 * u_hover);
          
          // Dispersion offsets
          vec2 uvR = uv + disp * 1.35;
          vec2 uvG = uv + disp;
          vec2 uvB = uv + disp * 0.7;
          
          // Substrate grid patterns
          float gridR = step(0.96, fract(uvR.x * 24.0)) * 0.5 + step(0.96, fract(uvR.y * 14.0)) * 0.5;
          float gridG = step(0.96, fract(uvG.x * 24.0)) * 0.5 + step(0.96, fract(uvG.y * 14.0)) * 0.5;
          float gridB = step(0.96, fract(uvB.x * 24.0)) * 0.5 + step(0.96, fract(uvB.y * 14.0)) * 0.5;
          
          // Refractive glass caustic highlight
          float caustic = pow(max(0.0, 1.0 - abs(wave) * 4.0), 3.0) * 0.5;
          
          // Pure black foundation with Iris Violet (#9281f7) caustics
          vec3 base = vec3(0.0, 0.0, 0.0);
          // Violet grid spectral components
          vec3 rCol = vec3(0.573, 0.506, 0.969) * gridR * 0.4;
          vec3 gCol = vec3(0.231, 0.620, 1.0) * gridG * 0.35;
          vec3 bCol = vec3(0.729, 0.655, 1.0) * gridB * 0.45;
          
          vec3 finalColor = base + (rCol + gCol + bCol);
          // Iris Violet Glow caustics
          finalColor += vec3(0.729, 0.655, 1.0) * caustic * (0.65 + 0.5 * u_hover);
          
          // Vignette
          float vig = 1.0 - smoothstep(0.4, 0.95, length(uv - 0.5));
          finalColor *= vig;

          gl_FragColor = vec4(finalColor, 0.96);
        }
      `;

      const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ]),
        gl.STATIC_DRAW
      );

      const posAttr = gl.getAttribLocation(program, "position");
      const resUniform = gl.getUniformLocation(program, "u_resolution");
      const mouseUniform = gl.getUniformLocation(program, "u_mouse");
      const timeUniform = gl.getUniformLocation(program, "u_time");
      const hoverUniform = gl.getUniformLocation(program, "u_hover");
      const intensityUniform = gl.getUniformLocation(program, "u_intensity");

      let hoverWeight = 0.2;
      let currentMouseX = 0.5;
      let currentMouseY = 0.5;

      const render = (time: number) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }

        // Mouse coordinates smooth lerp
        currentMouseX += (mousePos.x - currentMouseX) * 0.1;
        currentMouseY += (mousePos.y - currentMouseY) * 0.1;
        hoverWeight += ((isHovered ? 1.0 : 0.2) - hoverWeight) * 0.08;

        gl.useProgram(program);
        gl.enableVertexAttribArray(posAttr);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(resUniform, canvas.width, canvas.height);
        gl.uniform2f(mouseUniform, currentMouseX, currentMouseY);
        gl.uniform1f(timeUniform, time * 0.001);
        gl.uniform1f(hoverUniform, hoverWeight);
        gl.uniform1f(intensityUniform, refractIntensity === "high" ? 1.4 : 1.0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    } else {
      // 2D Canvas fallback
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const render2d = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(146, 129, 247, 0.1)";
        ctx.lineWidth = 1;
        const step = 20;
        for (let x = 0; x < canvas.width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        animationFrameId = requestAnimationFrame(render2d);
      };
      animationFrameId = requestAnimationFrame(render2d);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, isHovered, refractIntensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL Y is inverted
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#0b0e14] border border-[#292d30] select-none group/preview"
    >
      {/* Real-time WebGL Shader Canvas with Violet Refraction Caustics */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Subtle Vignette Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#000000]/80 via-transparent to-[#000000]/40" />

      {/* Floating Compositor Mini-Window (6px radius, #000000 bg, 1px #292d30 border) */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-80 rounded-md bg-[#000000] border border-[#292d30] p-3 transition-transform duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#292d30] mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5f56]/80"></span>
            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/80"></span>
            <span className="w-2 h-2 rounded-full bg-[#27c93f]/80"></span>
            <span className="text-xs font-semibold text-[#f0f0f0] ml-1.5 font-mono">
              AetherOS Compositor
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#9281f7] bg-[#000000] border border-[#292d30] px-2 py-0.5 rounded-md">
            GLSL Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#0b0e14] p-2 rounded-md border border-[#292d30] flex flex-col justify-between">
            <span className="text-[10px] text-[#a1a4a5] uppercase font-semibold">Caustics</span>
            <span className="text-[#9281f7] font-mono font-bold mt-0.5">Violet Oklab</span>
          </div>
          <div className="bg-[#0b0e14] p-2 rounded-md border border-[#292d30] flex flex-col justify-between">
            <span className="text-[10px] text-[#a1a4a5] uppercase font-semibold">Framerate</span>
            <span className="text-[#3ad389] font-mono font-bold mt-0.5">60.0 FPS</span>
          </div>
        </div>
      </div>

      {/* Floating Action Controls (Strict 6px radius) */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {/* Soundscape Synthesizer Toggle */}
        <button
          onClick={toggleSound}
          className={`px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            isAudioActive
              ? "bg-[#0b0e14] text-[#9281f7] border-[#9281f7]"
              : "bg-[#000000] text-[#a1a4a5] border-[#292d30] hover:border-[#ffffff] hover:text-[#ffffff]"
          }`}
          title={isAudioActive ? "Mute Web Audio Synth" : "Play Web Audio Ambient Synth"}
        >
          <i className={isAudioActive ? "ri-volume-vibrate-line text-[#9281f7]" : "ri-volume-mute-line text-[#6e727a]"}></i>
          <span className="font-mono text-[11px]">{isAudioActive ? "SYNTH ON" : "AUDIO"}</span>
        </button>

        {/* Refraction Mode Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRefractIntensity((prev) => (prev === "standard" ? "high" : "standard"));
          }}
          className="px-2.5 py-1.5 rounded-md bg-[#000000] border border-[#292d30] hover:border-[#ffffff] text-xs font-medium font-mono text-[#a1a4a5] hover:text-[#ffffff] transition-all cursor-pointer"
          title="Toggle Wave Refraction Intensity"
        >
          <span>{refractIntensity === "high" ? "HIGH WAVE" : "STANDARD"}</span>
        </button>
      </div>

      {/* Interactive Cursor Hint Pill */}
      <div className="absolute bottom-3 right-3 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#000000] border border-[#292d30] text-xs font-mono text-[#a1a4a5]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9281f7] animate-ping"></span>
        <span>Tilt cursor to refract</span>
      </div>
    </div>
  );
}
