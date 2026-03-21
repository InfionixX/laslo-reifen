import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

const TireModel = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Slowly rotate the entire tire assembly
    useFrame((_state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.2;
            groupRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {/* The Rubber Tire */}
            <mesh>
                {/* tube radius, radialSegments, tubularSegments */}
                <torusGeometry args={[2, 0.8, 32, 100]} />
                <meshStandardMaterial
                    color="#111111"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* The Outer Rim Edge */}
            <mesh>
                <torusGeometry args={[1.2, 0.15, 16, 100]} />
                <meshStandardMaterial
                    color="#FF5722" // Brand Orange
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* The Inner Rim Center */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.1, 1.1, 0.2, 32]} />
                <meshStandardMaterial
                    color="#1f1f1f" // Brand Gray
                    roughness={0.4}
                    metalness={0.9}
                />
            </mesh>

            {/* Hubcap Center Logo / Accent */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.15]}>
                <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
                <meshStandardMaterial
                    color="#FF5722"
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.15]}>
                <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
                <meshStandardMaterial
                    color="#FF5722"
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>

            {/* Spokes */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh
                    key={i}
                    rotation={[0, 0, (i * Math.PI * 2) / 5]}
                    position={[0, 0, 0]}
                >
                    <boxGeometry args={[0.15, 2.2, 0.15]} />
                    <meshStandardMaterial
                        color="#333333"
                        roughness={0.5}
                        metalness={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
};

const Tire3D = () => {
    return (
        <div className="w-full h-[500px] relative z-10 rounded-lg shadow-2xl glass-panel overflow-hidden">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                {/* Lighting setup */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF5722" />

                {/* Environment reflections */}
                <Environment preset="city" />

                <Float
                    speed={2} // Animation speed
                    rotationIntensity={0.5} // xyz rotation intensity
                    floatIntensity={0.5} // Up/down float intensity
                    floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within
                >
                    <Center>
                        <TireModel />
                    </Center>
                </Float>

                {/* Controls allowing the user to rotate the object */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={1.0}
                />
            </Canvas>
        </div>
    );
};

export default Tire3D;
