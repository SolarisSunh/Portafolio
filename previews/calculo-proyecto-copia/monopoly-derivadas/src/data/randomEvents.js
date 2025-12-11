// Eventos aleatorios simples centrados en dinero para mantener UX clara
// type: "bonus" | "penalty"
export const randomEvents = [
  {
    id: "evt-bonus-100",
    name: "Beca sorpresa",
    description: "Recibes una beca por tu rendimiento.",
    type: "bonus",
    amount: 100,
  },
  {
    id: "evt-move-fwd-1",
    name: "Avance rápido",
    description: "Avanzas 1 casilla adicional.",
    type: "move",
    steps: 1,
  },
  {
    id: "evt-move-fwd-2",
    name: "Atajo",
    description: "Encuentras un atajo y avanzas 2 casillas.",
    type: "move",
    steps: 2,
  },
  {
    id: "evt-move-back-1",
    name: "Retroceso",
    description: "Te distraes y retrocedes 1 casilla.",
    type: "move",
    steps: -1,
  },
  {
    id: "evt-move-back-3",
    name: "Contratiempo",
    description: "Un contratiempo te hace retroceder 3 casillas.",
    type: "move",
    steps: -3,
  },
  {
    id: "evt-bonus-150",
    name: "Premio concurso",
    description: "Ganas un premio por un concurso académico.",
    type: "bonus",
    amount: 150,
  },
  {
    id: "evt-penalty-50",
    name: "Compra de materiales",
    description: "Debes comprar materiales de estudio.",
    type: "penalty",
    amount: 50,
  },
  {
    id: "evt-penalty-75",
    name: "Tasa administrativa",
    description: "Pagas una tasa administrativa imprevista.",
    type: "penalty",
    amount: 75,
  },
];

export function getRandomEvent() {
  const idx = Math.floor(Math.random() * randomEvents.length);
  return randomEvents[idx];
}


