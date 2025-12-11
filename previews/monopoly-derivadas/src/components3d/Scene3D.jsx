import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";

export default function Scene3D({ children }) {
  return (
    <div className="w-full h-[80vh] rounded-xl overflow-hidden border border-blue-950/40 shadow-2xl bg-transparent">
      <Canvas
        camera={{ position: [20, 16, 20], fov: 45, near: 0.1, far: 200 }}
        shadows
      >
        {/* Cielo */}
        <color attach="background" args={["#87CEEB"]} />
        <Sky sunPosition={[100, 40, 50]} turbidity={6} rayleigh={1.2} mieCoefficient={0.01} mieDirectionalG={0.8} />
        {/* Luces */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2.1} />
        {children}
      </Canvas>
    </div>
  );
}

Scene3D.propTypes = {
  children: PropTypes.node,
};


