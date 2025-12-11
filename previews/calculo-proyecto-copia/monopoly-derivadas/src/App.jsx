import { useCallback, useMemo, useState } from "react";
import Board from "./components/Board.jsx";
import GameHud from "./components/GameHud.jsx";
import { boardSpaces } from "./data/boardSpaces.js";
import Modal from "./components/Modal.jsx";
import ChallengeCard from "./components/ChallengeCard.jsx";
import { CARD_PENALTY, CARD_REWARD, getRandomCardForTopic, topicKeyFromSpaceName, getCardById } from "./data/derivativeCards.js";
import { getRandomEvent } from "./data/randomEvents.js";

export default function App() {
  const [tokenPosition, setTokenPosition] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [dice, setDice] = useState([0, 0]);
  const [money, setMoney] = useState(1500);
  const [hits, setHits] = useState(0);
  const [landingOpen, setLandingOpen] = useState(false);
  const [landingSpaceIndex, setLandingSpaceIndex] = useState(0);
  const [justPassedGo, setJustPassedGo] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [eventOpen, setEventOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [eventProb, setEventProb] = useState(0);

  // Tamaño del tablero (usar antes en callbacks)
  const spacesLen = boardSpaces.length;

  // Animación de movimiento sin evaluar eventos (para eventos de movimiento)
  const animateStepsDelta = useCallback(async (delta) => {
    const dir = delta >= 0 ? 1 : -1;
    const count = Math.abs(delta);
    for (let i = 0; i < count; i++) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      setTokenPosition((prev) => (prev + dir + spacesLen) % spacesLen);
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
    const startIndex = tokenPosition;
    for (let i = 0; i < steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 220));
      setTokenPosition((prev) => (prev + 1) % spacesLen);
    }
    const finalIndex = (startIndex + steps) % spacesLen;
    const passedGo = finalIndex < startIndex; // paso por índice 0
    if (passedGo) {
      setMoney((m) => m + GO_BONUS);
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
      // Aplicar efecto de dinero inmediatamente para simplificar UX
      if (evt?.type === "bonus") {
        setMoney((m) => m + (evt.amount || 0));
      } else if (evt?.type === "penalty") {
        setMoney((m) => Math.max(0, m - (evt.amount || 0)));
      }
      setEventOpen(true);
      // No preparamos carta aún; se decidirá tras cerrar el evento
      setActiveCard(null);
    } else {
      // Preparar desafío si caemos en propiedad (si no hubo evento)
      const space = boardSpaces[finalIndex];
      if (space?.type === "property") {
        const card =
          space.problemId ? getCardById(space.problemId) :
          (() => {
            const topicKey = topicKeyFromSpaceName(space.name);
            return topicKey ? getRandomCardForTopic(topicKey) : null;
          })();
        setActiveCard(card);
      } else {
        setActiveCard(null);
      }
    }

    // Abrimos modal con una pequeña espera para sensación de aterrizaje
    setTimeout(() => {
      if (triggered) {
        // Modal de evento primero
        // landing se abrirá al cerrar el evento si corresponde
      } else {
        setLandingOpen(true);
      }
      setRolling(false);
    }, 150);
  }, [spacesLen, tokenPosition, GO_BONUS]);

  const onRoll = useCallback(() => {
    if (rolling) return;
    // Probabilidad aleatoria del turno (entre 15% y 40%)
    const p = 0.15 + Math.random() * 0.25;
    setEventProb(p);
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDice([d1, d2]);
    moveSteps(d1 + d2);
  }, [rolling, moveSteps]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-6 items-stretch">
        <div className="flex-1 flex items-center justify-center">
          <Board spaces={boardSpaces} tokenPosition={tokenPosition} />
        </div>
        <GameHud money={money} hits={hits} dice={dice} rolling={rolling} onRoll={onRoll} eventProb={eventProb} />
      </div>

      {/* Modal de evento aleatorio */}
      <Modal
        open={eventOpen}
        title={eventData ? `Evento: ${eventData.name}` : "Evento"}
        onClose={() => {
          const evt = eventData;
          setEventOpen(false);
          if (evt?.type === "move" && typeof evt.steps === "number" && evt.steps !== 0) {
            const start = tokenPosition;
            (async () => {
              await animateStepsDelta(evt.steps);
              const finalIdx = ((start + evt.steps) % spacesLen + spacesLen) % spacesLen;
              setLandingSpaceIndex(finalIdx);
              const space2 = boardSpaces[finalIdx];
              if (space2?.type === "property") {
                const card2 =
                  space2.problemId ? getCardById(space2.problemId) :
                  (() => {
                    const topicKey2 = topicKeyFromSpaceName(space2.name);
                    return topicKey2 ? getRandomCardForTopic(topicKey2) : null;
                  })();
                if (card2) {
                  setActiveCard(card2);
                } else {
                  setActiveCard(null);
                }
              } else {
                setActiveCard(null);
              }
              setLandingOpen(true);
            })();
          } else {
            const space = boardSpaces[landingSpaceIndex];
            if (space?.type === "property") {
              const card =
                space.problemId ? getCardById(space.problemId) :
                (() => {
                  const topicKey = topicKeyFromSpaceName(space.name);
                  return topicKey ? getRandomCardForTopic(topicKey) : null;
                })();
              if (card) {
                setActiveCard(card);
                setLandingOpen(true);
              } else {
                setActiveCard(null);
                setLandingOpen(true);
              }
            } else {
              setActiveCard(null);
              setLandingOpen(true);
            }
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
              if (ok) {
                setMoney((m) => m + CARD_REWARD);
                setHits((h) => h + 1);
              } else {
                setMoney((m) => Math.max(0, m - CARD_PENALTY));
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
    </div>
  );
}
