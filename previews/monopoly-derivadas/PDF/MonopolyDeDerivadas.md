### Monopoly de Derivadas
#### Miguel Abejandro Chavez Jimenez 452 Calculo Diferencia Mr.Javier
#### Objetivo general
Diseñar un juego de mesa digital (SPA React) donde los participantes aplican reglas de derivación (potencia, suma/resta, producto, cociente, cadena y constantes) para avanzar, sumar puntos y completar retos. Evaluar comprensión y aplicación de derivadas mediante situaciones lúdicas.

#### Stack y arquitectura
- Frontend: React 18 + Vite (SPA), Tailwind CSS.
- 3D: Three.js + React Three Fiber (`components3d/*`).
- Sin backend (multijugador local en una sola máquina).
- Datos:
  - Tablero: `src/data/boardSpaces.js` (84 casillas, perímetro).
  - Tarjetas: `src/data/derivativeCards.js` (≥36 problemas).
- UI/Gameplay:
  - `src/App.jsx`: estado principal (jugadores, turnos, eventos, retos).
  - `components/SetupPlayersModal.jsx`: configuración 2–4 jugadores.
  - `components/PlayerPanel.jsx`: panel individual (dados, dinero, aciertos).
  - `components/ChallengeCard.jsx`: tarjeta con opciones; render LaTeX (KaTeX).
  - `components/ProblemReveal.jsx`: animación de carta (keyframes Tailwind).
  - `components3d/Scene3D.jsx`, `Board3D.jsx`, `Token3D.jsx`, `boardLayout.js`.

#### Reglas del juego
- Jugadores: 2–4 (misma máquina).
- Turno:
  1) El jugador en turno lanza sus dados desde su panel.
  2) La ficha avanza animadamente casilla por casilla.
  3) Si cae en “propiedad”, aparece animación de carta y luego un problema.
  4) Correcto: +$100 y +1 acierto. Incorrecto: −$50.
  5) Pasar por “Salida”: +$200 automático.
- Casillas especiales: Suerte/Impuesto/Ir a Cárcel (ajustes simples).

#### Temas matemáticos incluidos
- Potencia, Constante/x, Suma/Restas, Producto, Cociente, Cadena.
- Extras: Raíces, Logaritmos, Exponenciales, Implícita.
- Render con KaTeX (x^2 → exponente real; sqrt(u) → √u).

#### Estructura del proyecto
- `src/App.jsx`: orquestación de turnos, eventos, retos y tablero 3D.
- `src/components/SetupPlayersModal.jsx`: elige 2–4 jugadores y colores visibles.
- `src/components/PlayerPanel.jsx`: UI de cada jugador (dados/turno).
- `src/components/ChallengeCard.jsx`: pregunta/opciones/validación; LaTeX.
- `src/components/ProblemReveal.jsx`: carta animada de entrada.
- `src/components3d/Scene3D.jsx`: cámara, cielo, luces.
- `src/components3d/Board3D.jsx`: casillas perimetrales.
- `src/components3d/Token3D.jsx`: ficha por jugador (color/offset).
- `src/data/boardSpaces.js`: perímetro y `problemId`.
- `src/data/derivativeCards.js`: banco de ejercicios con dificultad y explicación.
- `tailwind.config.js`: fuente, keyframes `cardIn`, `shine`.

#### Flujo de estado
- `players[]`: { id, name, color, position, money, hits, dice, rolling }
- `currentTurn`: índice de jugador en turno.
- `eventProb`: probabilidad de evento por tirada (aleatoria 15–40%).
- `activeCard`, `landingSpaceIndex`, `revealOpen`, `eventOpen`.

#### Mapeo a rúbrica
- Aplicación matemática (30): ≥36 ejercicios variados; validación con explicación breve.
- Diseño (25): tablero 3D, turnos claros, paneles por jugador, animaciones.
- Creatividad/presentación (15): estética Monopoly, animación de carta, cielo 3D.
- Documentación (15): esta guía + arquitectura modular.
- Exposición (15): demo fluida en 10–15 min (setup → 5–6 turnos → Q&A).

#### Ejemplos de tarjetas (texto → LaTeX en UI)
- Potencia: d/dx(4x^5) → 20x^4  
- Suma: d/dx(x^3 + 2x^2 − 5x) → 3x^2 + 4x − 5  
- Producto: d/dx[(x^2)(e^x)] → 2x e^x + x^2 e^x  
- Cociente: d/dx[(x^2+1)/x] → ((x·2x) − (x^2+1)·1)/x^2  
- Cadena: d/dx((3x−1)^4) → 4(3x−1)^3·3  


#### Extensiones posibles en un futuro no cercano
- Dificultad ponderada (recompensas/penalizaciones variables).  
- Temporizador de reto por jugador.  
- Editor de tarjetas en UI (CRUD).  
- Modos alternos (competitivo global y colaborativo).  


