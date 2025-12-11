import PropTypes from "prop-types";
import { useMemo } from "react";
import { indexToPosition, TILE, GAP, SIZE, HALF } from "./boardLayout.js";
import { Text } from "@react-three/drei";

function Tile({ position, color = "#1e3a8a", stripe = null }) {
  const [x, y, z] = position;
  return (
    <group position={[x, y, z]}>
      {/* base del tile */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[TILE, 0.08, TILE]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* franja para propiedades */}
      {stripe && (
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[TILE, 0.02, TILE]} />
          <meshStandardMaterial color={stripe} />
        </mesh>
      )}
    </group>
  );
}

Tile.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string,
  stripe: PropTypes.string,
};

export default function Board3D({ spaces }) {
  const tiles = useMemo(() => {
    return spaces.map((s, idx) => {
      const pos = indexToPosition(idx);
      const isProperty = s.type === "property";
      // map tailwind-like colors to hex approx
      const stripeHex = isProperty ? mapTailwindToHex(s.color) : null;
      return { idx, pos, stripeHex, s };
    });
  }, [spaces]);

  return (
    <group>
      {/* mesa central */}
      <mesh position={[0, -0.06, 0]} receiveShadow castShadow>
        <boxGeometry args={[SIZE + 2, 0.1, SIZE + 2]} />
        <meshStandardMaterial color="#0a2245" />
      </mesh>

      {/* marco perimetral: tiles */}
      {tiles.map(({ idx, pos, stripeHex, s }) => (
        <Tile
          key={s.id}
          position={pos}
          color={s.type === "chance" ? "#fde047" : s.type === "tax" ? "#f59e0b" : "#1d4ed8"}
          stripe={stripeHex}
        />
      ))}

      {/* título tablero */}
      <Text position={[0, 0.2, 0]} fontSize={0.8} color="#c7d2fe" anchorX="center" anchorY="middle">
        Monopoly de Derivadas
      </Text>
    </group>
  );
}

Board3D.propTypes = {
  spaces: PropTypes.array.isRequired,
};

function mapTailwindToHex(cl) {
  // mapeo breve para nuestros colores más usados
  const map = {
    "bg-red-600": "#dc2626",
    "bg-blue-600": "#2563eb",
    "bg-amber-500": "#f59e0b",
    "bg-purple-600": "#9333ea",
    "bg-emerald-500": "#10b981",
    "bg-rose-600": "#e11d48",
    "bg-cyan-600": "#0891b2",
    "bg-lime-500": "#84cc16",
    "bg-fuchsia-600": "#c026d3",
    "bg-teal-500": "#14b8a6",
    "bg-yellow-300": "#fde047",
  };
  return map[cl] || null;
}




