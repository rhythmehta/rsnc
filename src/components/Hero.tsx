import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import type React from "react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import BlurEffect from "react-progressive-blur";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface HelixRingsProps {
    levelsUp?: number;
    levelsDown?: number;
    stepY?: number;
    rotationStep?: number;
}

const HelixRings: React.FC<HelixRingsProps> = ({
    levelsUp = 10,
    levelsDown = 10,
    stepY = 0.85,
    rotationStep = Math.PI / 16,
}) => {
    const groupRef = useRef<THREE.Group>(new THREE.Group());

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });

    const ringGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        const radius = 0.35;
        shape.absarc(0, 0, radius, 0, Math.PI * 2, false);

        const depth = 10;
        const extrudeSettings: THREE.ExtrudeGeometryOptions = {
            depth,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelSegments: 4,
            curveSegments: 64,
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.translate(0, 0, -depth / 2);

        return geometry;
    }, []);

    const elements = [] as { id: string; y: number; rotation: number }[];
    for (let i = -levelsDown; i <= levelsUp; i++) {
        elements.push({
            id: `helix-ring-${i}`,
            y: i * stepY,
            rotation: i * rotationStep,
        });
    }

    return (
        <group
            scale={1}
            position={[5, 0, 0]}
            ref={groupRef}
            rotation={[0, 0, 0]}
        >
            {elements.map((el) => (
                <mesh
                    key={el.id}
                    geometry={ringGeometry}
                    position={[0, el.y, 0]}
                    rotation={[0, Math.PI / 2 + el.rotation, 0]}
                    castShadow
                >
                    <meshPhysicalMaterial
                        color="#45BFD3"
                        metalness={0.7}
                        roughness={0.5}
                        clearcoat={0}
                        clearcoatRoughness={0.15}
                        reflectivity={0}
                        iridescence={0.96}
                        iridescenceIOR={1.5}
                        iridescenceThicknessRange={[100, 400]}
                    />
                </mesh>
            ))}
        </group>
    );
};

const Scene: React.FC = () => {
    return (
        <Canvas
            className="h-full w-full"
            orthographic
            shadows
            camera={{
                zoom: 70,
                position: [0, 0, 7],
                near: 0.1,
                far: 1000,
            }}
            gl={{ antialias: true }}
            style={{ background: "#ffffff" }}
        >
            <hemisphereLight color={"#cfe8ff"} groundColor={"#ffffff"} intensity={2} />

            <directionalLight
                position={[10, 10, 5]}
                intensity={2}
                castShadow
                color={"#ffeedd"}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            <HelixRings />

            <EffectComposer multisampling={8}>
                <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.6} />
                <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
            </EffectComposer>
            {/* <Perf position="top-left" /> */}
        </Canvas>
    );
};

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  serviceLine?: string;
  ctaText?: string;
  ctaSupport?: string;
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow,
  title,
  description,
  serviceLine,
  ctaText = "Let's Talk",
  ctaSupport,
  onCtaClick,
}) => {
  return (
    <section className="relative min-h-screen w-screen overflow-hidden bg-white font-sans tracking-tight text-gray-900">
      {/* Top-left logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30 select-none">
        <img
          src="/rsnc-tech-company-logo.png"
          alt="Resonance Technology logo"
          className="h-48 w-auto"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div className="absolute inset-x-4 bottom-4 z-20 md:inset-x-auto md:bottom-10 md:left-10">
        <div className="max-w-xl rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-light tracking-tight text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed font-light tracking-tight text-slate-700 md:text-lg">
            {description}
          </p>
          {serviceLine ? (
            <p className="mt-4 text-sm tracking-tight text-slate-600">
              {serviceLine}
            </p>
          ) : null}
          <div className="mt-6">
          <InteractiveHoverButton
            text={ctaText}
            className="bg-white/80 text-gray-900 backdrop-blur-sm"
            onClick={onCtaClick}
          />
            {ctaSupport ? (
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                {ctaSupport}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <BlurEffect className="absolute bg-gradient-to-b from-transparent to-white/20 h-1/2 md:h-1/3 w-full bottom-0" position="bottom" intensity={50} />
      <BlurEffect className="absolute bg-gradient-to-b from-white/20 to-transparent h-1/2 md:h-1/3 w-full top-0" position="top" intensity={50} />
    </section>
  );
};

export default Hero;
