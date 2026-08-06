import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Text } from '@react-three/drei';
import { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';

// Shared scroll progress (0..1 of document)
const scrollRef = { value: 0, raw: 0 };

// Scrollable distance is cached and refreshed only when the document actually
// resizes. Reading scrollHeight every frame forces a synchronous layout on the
// main thread 60x/sec, which is the single most expensive thing this scene did.
let scrollRange = 0;

const useScrollListener = () => {
  useEffect(() => {
    const measure = () => {
      scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
};

// Silver palette
const SKY = '#C8C8C8';
const CYAN = '#888888';
const DEEP = '#2A2A2A';
const ICE = '#E8E8E8';

function CameraRig() {
  useFrame(({ camera, clock }) => {
    // window.scrollY is a cheap read (no forced layout) now that the scroll
    // range is cached, so sampling it here replaces the old standalone rAF loop.
    scrollRef.raw = scrollRange > 0 ? window.scrollY / scrollRange : 0;

    // Smooth interpolate
    scrollRef.value += (scrollRef.raw - scrollRef.value) * 0.06;
    const s = scrollRef.value;
    const t = clock.getElapsedTime();

    // Camera flies through chapters
    camera.position.x = Math.sin(s * Math.PI * 2) * 4 + Math.sin(t * 0.15) * 0.3;
    camera.position.y = -s * 12 + Math.cos(t * 0.2) * 0.2;
    camera.position.z = 8 - s * 3;
    camera.lookAt(0, -s * 12, 0);
  });
  return null;
}

function SolidBlob({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.4}
          distort={0.35}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const [geom] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  });

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial color={SKY} size={0.045} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function TechBadge({
  position,
  label,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.25 * speed;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.1}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <Text
          position={[0, 0, 1.05]}
          fontSize={0.42}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color={SKY} />
      <pointLight position={[-5, -10, 3]} intensity={1.1} color={CYAN} />

      <Stars radius={60} depth={40} count={1800} factor={3} fade speed={0.5} />
      <Particles count={500} />

      {/* Chapter 1 — Hero: tech badges float around */}
      <TechBadge position={[-3.5, 1.2, -2]} label="React" color={SKY} scale={1.1} />
      <TechBadge position={[3.2, -0.8, -1]} label="TS" color={CYAN} scale={0.9} />
      <TechBadge position={[-2, -2, -3]} label="HTML" color="#f97316" scale={0.8} speed={1.3} />
      <TechBadge position={[2.5, 2.5, -3]} label="CSS" color={ICE} scale={0.85} />
      <SolidBlob position={[0, 0, -5]} color={DEEP} scale={1.8} />

      {/* Chapter 2 — What I Do */}
      <TechBadge position={[-4, -8, -3]} label="Node" color="#4ade80" scale={1} />
      <TechBadge position={[4, -10, -2]} label="Java" color="#fb923c" scale={0.9} speed={1.5} />
      <TechBadge position={[0, -9, -4]} label="Python" color="#fbbf24" scale={0.95} />
      <SolidBlob position={[0, -12, -5]} color={SKY} scale={1.5} />

      {/* Chapter 3 — Experience */}
      <TechBadge position={[3, -20, -3]} label="PHP" color="#818cf8" scale={1.1} />
      <TechBadge position={[-3, -22, -2]} label="Laravel" color="#f87171" scale={0.9} speed={0.7} />
      <TechBadge position={[0, -21, -4]} label="MySQL" color={CYAN} scale={0.85} />

      {/* Chapter 4 — Work */}
      <TechBadge position={[-4, -32, -3]} label="Next" color="#e5e7eb" scale={1} speed={1.2} />
      <SolidBlob position={[3, -34, -4]} color={CYAN} scale={1.4} />
      <TechBadge position={[2, -33, -2]} label="Tailwind" color={SKY} scale={0.8} />

      {/* Chapter 5 — Techstack */}
      <TechBadge position={[0, -44, -3]} label="C++" color="#60a5fa" scale={1.3} speed={0.8} />
      <TechBadge position={[-4, -46, -2]} label="Docker" color={SKY} scale={0.95} />
      <TechBadge position={[4, -45, -2]} label="Git" color="#f97316" scale={0.9} />
      <TechBadge position={[0, -47, -4]} label="AWS" color="#fbbf24" scale={0.9} />

      {/* Chapter 6 — Contact */}
      <SolidBlob position={[0, -56, -4]} color={SKY} scale={2.2} />
      <TechBadge position={[-3, -54, -2]} label="GraphQL" color="#f472b6" scale={0.9} speed={1.5} />
      <TechBadge position={[3, -55, -2]} label="Redis" color="#ef4444" scale={0.85} />

      <CameraRig />
    </>
  );
}

const Scene3D = () => {
  // The >=768px gate now lives in the parent, which keeps this whole chunk
  // (three.js + drei) from being downloaded on mobile at all.
  useScrollListener();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
