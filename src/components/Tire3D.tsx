import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Center, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const TireModel = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Slowly rotate the entire tire assembly
    useFrame((_state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.15;
            groupRef.current.rotation.y -= delta * 0.3;
        }
    });

    // Create tire tread grooves (a highly detailed race slick profile)
    const grooves = useMemo(() => {
        const arr = [];
        const grooveCount = 48;
        for (let i = 0; i < grooveCount; i++) {
            const angle = (i / grooveCount) * Math.PI * 2;
            arr.push(
                <mesh key={`groove-${i}`} rotation={[0, 0, angle]} position={[0, 0, 0]}>
                    <boxGeometry args={[0.3, 4.05, 1.4]} />
                    <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
                </mesh>
            );
        }
        return arr;
    }, []);

    // Create a detailed 5-split-spoke sporting rim
    const spokes = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            arr.push(
                <group key={`spoke-${i}`} rotation={[0, 0, angle]}>
                    <mesh position={[0.4, 0.8, 0]} rotation={[0, 0, 0.1]}>
                        <boxGeometry args={[0.15, 1.5, 0.4]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.9} />
                    </mesh>
                    <mesh position={[-0.4, 0.8, 0]} rotation={[0, 0, -0.1]}>
                        <boxGeometry args={[0.15, 1.5, 0.4]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.9} />
                    </mesh>
                    {/* Inner Accent Stripe */}
                    <mesh position={[0, 1.4, 0.2]}>
                        <boxGeometry args={[0.6, 0.1, 0.05]} />
                        <meshStandardMaterial color="#FF5722" roughness={0.4} metalness={0.6} />
                    </mesh>
                </group>
            );
        }
        return arr;
    }, []);

    return (
        <group ref={groupRef}>
            {/* The Main Rubber Tire (Slick Profile) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[2, 2, 1.5, 64]} />
                <meshStandardMaterial color="#111111" roughness={0.95} metalness={0.1} />
            </mesh>

            {/* Grooves for Tire Profile Detail */}
            {grooves}

            {/* Inner Tire Sidewall curve */}
            <mesh>
                <torusGeometry args={[1.7, 0.35, 32, 64]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.1} />
            </mesh>

            {/* The Outer Rim Edge */}
            <mesh>
                <torusGeometry args={[1.4, 0.15, 32, 100]} />
                <meshStandardMaterial color="#FF5722" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Minor Rim Lip Details */}
            <mesh position={[0, 0, 0.2]}>
                <torusGeometry args={[1.35, 0.05, 16, 100]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.9} />
            </mesh>

            {/* Complex Spokes */}
            {spokes}

            {/* The Inner Rim Barrel */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.3, 1.3, 1.2, 64]} />
                <meshStandardMaterial color="#111111" roughness={0.6} metalness={0.8} />
            </mesh>

            {/* Center Hubcap Detail */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
                <meshStandardMaterial color="#FF5722" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
                <meshStandardMaterial color="#000000" roughness={0.7} metalness={0.5} />
            </mesh>

            {/* Lug Nuts */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={`lug-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[Math.cos((i / 5) * Math.PI * 2) * 0.25, Math.sin((i / 5) * Math.PI * 2) * 0.25, 0.18]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.1, 6]} />
                    <meshStandardMaterial color="#aaaaaa" roughness={0.4} metalness={0.9} />
                </mesh>
            ))}

            {/* Tire Sidewall Writing */}
            {/* "MAGYAR GUMIS" curled along the top edge. We will just use floating 3D text in front of it for the "Writing of the picture at the Front" */}
            <Text
                position={[0, 0, 1.2]}
                fontSize={0.25}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff" // Optional: URL to a .woff font, useful for standard fonts
                outlineWidth={0.01}
                outlineColor="#FF5722"
            >
                MAGYAR GUMIS
            </Text>
            <Text
                position={[0, -0.35, 1.2]}
                fontSize={0.12}
                color="#aaaaaa"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.2}
            >
                PERFORMANCE RACING
            </Text>

            {/* Orange text right on the sidewall rim edge */}
            <Text
                position={[0, 1.5, 0.4]}
                fontSize={0.1}
                color="#FF5722"
                anchorX="center"
                anchorY="middle"
            >
                LASLO REIFEN
            </Text>
        </group>
    );
};

const Tire3D = () => {
    return (
        <div className="w-full h-[500px] relative z-10 rounded-lg shadow-2xl glass-panel overflow-hidden">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                {/* Lighting setup */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <spotLight position={[-5, 5, 5]} angle={0.2} penumbra={1} intensity={2} color="#FF5722" castShadow />
                <pointLight position={[0, -5, -5]} intensity={1} color="#FF5722" />

                {/* Environment reflections */}
                <Environment preset="city" />

                <Float
                    speed={1.5} // Animation speed
                    rotationIntensity={0.8} // xyz rotation intensity
                    floatIntensity={0.5} // Up/down float intensity
                    floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within
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
                    autoRotateSpeed={1.5}
                />
            </Canvas>
        </div>
    );
};

export default Tire3D;
