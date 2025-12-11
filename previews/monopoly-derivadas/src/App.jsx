import { useCallback, useEffect, useMemo, useState } from "react";
import Board3D from "./components3d/Board3D.jsx";
import Scene3D from "./components3d/Scene3D.jsx";
import { boardSpaces } from "./data/boardSpaces.js";
import Modal from "./components/Modal.jsx";
import ChallengeCard from "./components/ChallengeCard.jsx";
import { CARD_PENALTY, CARD_REWARD, getRandomCardForTopic, topicKeyFromSpaceName, getCardById } from "./data/derivativeCards.js";
import { getRandomEvent } from "./data/randomEvents.js";
import Token3D from "./components3d/Token3D.jsx";
import ProblemReveal from "./components/ProblemReveal.jsx";
import SetupPlayersModal from "./components/SetupPlayersModal.jsx";
import PlayerPanel from "./components/PlayerPanel.jsx";

export default function App() {
  const [players, setPlayers] = useState([]); // {id,name,color,position,money,hits,dice,rolling}
  const [currentTurn, setCurrentTurn] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [landingOpen, setLandingOpen] = useState(false);
  const [landingSpaceIndex, setLandingSpaceIndex] = useState(0);
  const [justPassedGo, setJustPassedGo] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [eventOpen, setEventOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [eventProb, setEventProb] = useState(0);
  const [revealOpen, setRevealOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(true);
  const [eventPlayerId, setEventPlayerId] = useState(null);

  // Tamaño del tablero (usar antes en callbacks)
  const spacesLen = boardSpaces.length;

  // Animación de movimiento sin evaluar eventos (para eventos de movimiento)
  const animateStepsDelta = useCallback(async (delta, playerId) => {
    const dir = delta >= 0 ? 1 : -1;
    const count = Math.abs(delta);
    for (let i = 0; i < count; i++) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      setPlayers((prev) =>
        prev.map((pl) =>
          pl.id === playerId ? { ...pl, position: (pl.position + dir + spacesLen) % spacesLen } : pl
        )
      );
    }
  }, [spacesLen]);

  const landingSpace = useMemo(() => boardSpaces[landingSpaceIndex], [landingSpaceIndex]);
  const GO_BONUS = 200;

  const getLandingMessage = useCallback((space) => {
    switch (space.type) {
      case "property":
        return "Propiedad: contesta correctamente en el futuro para comprarla.";
      case "chance":
        return "Suerte: en el futuro sacaremos una carta con efecto.";
      case "tax":
        return "Impuesto: paga una pequeña tasa (pendiente de lógica).";
      case "go":
        return `Salida: cobras $${GO_BONUS} al pasar.`;
      case "jail":
        return "Cárcel (Visitas): solo estás de visita.";
      case "go-to-jail":
        return "Ve a la Cárcel: en el futuro te moveremos a la cárcel.";
      case "free":
        return "Parking Libre: descansa sin efectos.";
      default:
        return "Casilla especial.";
    }
  }, [GO_BONUS]);

  const moveSteps = useCallback(async (steps) => {
    setRolling(true);
    const current = players[currentTurn];
    if (!current) { setRolling(false); return; }
    const startIndex = current.position ?? 0;
    for (let i = 0; i < steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 220));
      setPlayers((prev) =>
        prev.map((pl) =>
          pl.id === current.id ? { ...pl, position: (pl.position + 1) % spacesLen } : pl
        )
      );
    }
    const finalIndex = (startIndex + steps) % spacesLen;
    const passedGo = finalIndex < startIndex; // paso por índice 0
    if (passedGo) {
      setPlayers((prev) =>
        prev.map((pl) => (pl.id === current.id ? { ...pl, money: pl.money + GO_BONUS } : pl))
      );
      setJustPassedGo(true);
    } else {
      setJustPassedGo(false);
    }
    setLandingSpaceIndex(finalIndex);

    // Evaluar evento aleatorio del turno
    const triggered = Math.random() < (eventProb || 0);
    if (triggered) {
      const evt = getRandomEvent();
      setEventData(evt);
      setEventPlayerId(current.id);
      // Aplicar efecto de dinero inmediatamente para simplificar UX
      if (evt?.type === "bonus") {
        setPlayers((prev) =>
          prev.map((pl) =>
            pl.id === current.id ? { ...pl, money: pl.money + (evt.amount || 0) } : pl
          )
        );
      } else if (evt?.type === "penalty") {
        setPlayers((prev) =>
          prev.map((pl) =>
            pl.id === current.id ? { ...pl, money: Math.max(0, pl.money - (evt.amount || 0)) } : pl
          )
        );
      }
      setEventOpen(true);
      // No preparamos carta aún; se decidirá tras cerrar el evento
      setActiveCard(null);
    } else {
      // Preparar desafío si caemos en propiedad (si no hubo evento)
      const space = boardSpaces[finalIndex];
      let preparedCard = null;
      if (space?.type === "property") {
        const card =
          space.problemId ? getCardById(space.problemId) :
          (() => {
            const topicKey = topicKeyFromSpaceName(space.name);
            return topicKey ? getRandomCardForTopic(topicKey) : null;
          })();
        preparedCard = card;
        setActiveCard(card);
      } else {
        setActiveCard(null);
      }
      // Abrimos modal con una pequeña espera para sensación de aterrizaje
      setTimeout(() => {
        if (preparedCard) {
          setRevealOpen(true);
        } else {
          setLandingOpen(true);
        }
        setRolling(false);
      }, 150);
      return;
    }

    // Abrimos modal con una pequeña espera para sensación de aterrizaje
    setTimeout(() => {
      if (triggered) {
        // Modal de evento primero
        // landing se abrirá al cerrar el evento si corresponde
      }
      setRolling(false);
    }, 150);
  }, [spacesLen, players, currentTurn, GO_BONUS]);

  const startGame = useCallback((playersCfg) => {
    const initialized = playersCfg.map((p, i) => ({
      id: i,
      name: p.name,
      color: p.color,
      position: 0,
      money: 1500,
      hits: 0,
      dice: [0, 0],
      rolling: false,
    }));
    setPlayers(initialized);
    setCurrentTurn(0);
    setSetupOpen(false);
  }, []);

  const onRollForPlayer = useCallback(async () => {
    if (rolling || players.length === 0) return;
    const current = players[currentTurn];
    if (!current) return;
    // Probabilidad aleatoria del turno (entre 15% y 40%)
    const p = 0.15 + Math.random() * 0.25;
    setEventProb(p);
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setPlayers((prev) =>
      prev.map((pl, idx) =>
        idx === currentTurn ? { ...pl, dice: [d1, d2], rolling: true } : pl
      )
    );
    await moveSteps(d1 + d2);
    setPlayers((prev) =>
      prev.map((pl, idx) => (idx === currentTurn ? { ...pl, rolling: false } : pl))
    );
    // Siguiente turno
    setCurrentTurn((t) => (t + 1) % players.length);
  }, [players, currentTurn, rolling, moveSteps]);

  // Backend eliminado: sin efecto

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-6 items-stretch">
        <div className="flex-1 flex items-center justify-center">
          <Scene3D>
            <Board3D spaces={boardSpaces} />
            {players.map((pl, idx) => {
              const offsets = [
                [0, 0, 0],
                [0.18, 0, 0],
                [0, 0, 0.18],
                [-0.18, 0, 0],
              ];
              const off = offsets[idx % offsets.length];
              return <Token3D key={pl.id} index={pl.position || 0} color={pl.color} offset={off} />;
            })}
          </Scene3D>
        </div>
        {/* Paneles por jugador */}
        <div className="w-full sm:w-96 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {players.map((p, idx) => (
              <PlayerPanel
                key={p.id}
                player={p}
                isTurn={idx === currentTurn}
                onRoll={onRollForPlayer}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animación de carta de problema */}
      <ProblemReveal
        open={revealOpen}
        onComplete={() => {
          setRevealOpen(false);
          setLandingOpen(true);
        }}
      />

      {/* Modal de evento aleatorio */}
      <Modal
        open={eventOpen}
        title={eventData ? `Evento: ${eventData.name}` : "Evento"}
        onClose={() => {
          const evt = eventData;
          const pid = eventPlayerId ?? players[currentTurn]?.id;
          setEventOpen(false);
          if (evt?.type === "move" && typeof evt.steps === "number" && evt.steps !== 0 && pid != null) {
            const player = players.find((x) => x.id === pid);
            const start = player?.position ?? 0;
            (async () => {
              await animateStepsDelta(evt.steps, pid);
              const finalIdx = ((start + evt.steps) % spacesLen + spacesLen) % spacesLen;
              setLandingSpaceIndex(finalIdx);
              const space2 = boardSpaces[finalIdx];
              if (space2?.type === "property") {
                const topicKey2 = topicKeyFromSpaceName(space2.name);
                const card2 = space2.problemId ? getCardById(space2.problemId) : (topicKey2 ? getRandomCardForTopic(topicKey2) : null);
                if (card2) { setActiveCard(card2); setRevealOpen(true); } else { setActiveCard(null); setLandingOpen(true); }
              } else {
                setActiveCard(null); setLandingOpen(true);
              }
            })();
          } else {
            const space = boardSpaces[landingSpaceIndex];
            if (space?.type === "property") {
              const topicKey = topicKeyFromSpaceName(space.name);
              const card = space.problemId ? getCardById(space.problemId) : (topicKey ? getRandomCardForTopic(topicKey) : null);
              if (card) { setActiveCard(card); setRevealOpen(true); } else { setActiveCard(null); setLandingOpen(true); }
            } else { setActiveCard(null); setLandingOpen(true); }
          }
        }}
      >
        <div className="space-y-2">
          <div className="text-sm">
            {eventData?.description ?? "Ocurre un evento inesperado."}
          </div>
          {eventData?.amount != null && (
            <div className="text-sm font-semibold">
              {eventData.type === "bonus" ? `+ $${eventData.amount}` : `- $${eventData.amount}`}
            </div>
          )}
          {eventData?.type === "move" && typeof eventData.steps === "number" && (
            <div className="text-sm font-semibold">
              {eventData.steps > 0 ? `Avanzas ${eventData.steps} casilla(s)` : `Retrocedes ${Math.abs(eventData.steps)} casilla(s)`}
            </div>
          )}
          <div className="text-xs text-neutral-600">
            Probabilidad este turno: {Math.round((eventProb || 0) * 100)}%
          </div>
        </div>
      </Modal>

      <Modal
        open={landingOpen}
        title={activeCard ? `${landingSpace?.name ?? "Propiedad"} — Desafío` : (landingSpace?.name ?? "Casilla")}
        onClose={() => {
          setLandingOpen(false);
          setJustPassedGo(false);
          setActiveCard(null);
        }}
        showDefaultButton={!activeCard}
      >
        {activeCard ? (
          <ChallengeCard
            card={activeCard}
            onComplete={(ok) => {
              if (players.length > 0) {
                const pid = players[(currentTurn - 1 + players.length) % players.length]?.id ?? players[currentTurn]?.id;
                if (ok) {
                  setPlayers((prev) => prev.map((pl) => pl.id === pid ? { ...pl, money: pl.money + CARD_REWARD, hits: pl.hits + 1 } : pl));
                } else {
                  setPlayers((prev) => prev.map((pl) => pl.id === pid ? { ...pl, money: Math.max(0, pl.money - CARD_PENALTY) } : pl));
                }
              }
              setLandingOpen(false);
              setActiveCard(null);
              setJustPassedGo(false);
            }}
          />
        ) : (
          <div className="space-y-2">
            {justPassedGo && (
              <div className="text-xs font-semibold text-emerald-900 bg-emerald-200/80 border border-emerald-300 rounded px-2 py-1">
                Pasaste por Salida: +${GO_BONUS}
              </div>
            )}
            <div className="text-sm">
              <span className="inline-block rounded px-2 py-0.5 text-xs font-semibold bg-neutral-900 text-white">
                {landingSpace?.type ?? "special"}
              </span>
            </div>
            <p className="text-neutral-700 text-sm">
              {landingSpace ? getLandingMessage(landingSpace) : "Has caído en una casilla."}
            </p>
          </div>
        )}
      </Modal>
      <SetupPlayersModal open={setupOpen} onStart={startGame} />
    </div>
  );
}
