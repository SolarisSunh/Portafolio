import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { indexToPosition } from "./boardLayout.js";

export default function Token3D({ index, color = "#fbbf24", offset = [0, 0, 0] }) {
  const ref = useRef();
  const [target, setTarget] = useState(indexToPosition(index));

  useEffect(() => {
    setTarget(indexToPosition(index));
  }, [index]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    // LERP suave hacia el objetivo
    ref.current.position.lerp(
      { x: target[0], y: 0.15, z: target[2] },
      Math.min(1, delta * 6)
    );
    // ligera inclinación para estilo
    ref.current.rotation.y += delta * 0.7;
  });

  return (
    <group ref={ref} position={[target[0] + offset[0], 0.15 + offset[1], target[2] + offset[2]]} castShadow>
      {/* Pie */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.1, 24]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Copa de sombrero */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.24, 24]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.25} />
      </mesh>
      {/* Ala */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.18, 0.035, 16, 32]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.45} roughness={0.25} />
      </mesh>
    </group>
  );
}

Token3D.propTypes = {
  index: PropTypes.number.isRequired,
};




