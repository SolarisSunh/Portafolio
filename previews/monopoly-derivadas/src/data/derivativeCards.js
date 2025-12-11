// Banco de problemas por tema. Representación en texto usando ^ y sqrt().
// Recompensas/sanciones se manejan en la lógica del juego; aquí solo preguntas.

export const CARD_REWARD = 100;
export const CARD_PENALTY = 50;

const cardsByTopic = {
  constantes: [
    {
      id: "const-1",
      difficulty: "easy",
      question: "d/dx (7)",
      options: ["0", "1", "7", "x"],
      correctIndex: 0,
      explanation: "La derivada de una constante es 0.",
    },
    {
      id: "const-2",
      difficulty: "easy",
      question: "d/dx (x)",
      options: ["0", "1", "x", "2x"],
      correctIndex: 1,
      explanation: "La derivada de x es 1.",
    },
    {
      id: "const-3",
      difficulty: "easy",
      question: "d/dx (12)",
      options: ["0", "1", "12", "x"],
      correctIndex: 0,
      explanation: "La derivada de una constante es 0.",
    },
  ],
  potencias: [
    {
      id: "pow-1",
      difficulty: "easy",
      question: "d/dx (3x^2 - 5x + 7)",
      options: ["6x - 5", "3x^2 - 5", "6x + 7", "6x"],
      correctIndex: 0,
      explanation: "Regla de la potencia y linealidad: 6x - 5.",
    },
    {
      id: "pow-2",
      difficulty: "medium",
      question: "d/dx (x^5)",
      options: ["5x^4", "x^4", "5x^5", "x^6"],
      correctIndex: 0,
      explanation: "d/dx(x^n) = n x^(n-1).",
    },
    {
      id: "pow-3",
      difficulty: "easy",
      question: "d/dx (x^7)",
      options: ["7x^6", "x^6", "7x^7", "x^8"],
      correctIndex: 0,
      explanation: "d/dx(x^n) = n x^(n-1).",
    },
    {
      id: "pow-4",
      difficulty: "easy",
      question: "d/dx (5x^3)",
      options: ["15x^2", "5x^2", "3x^2", "15x^3"],
      correctIndex: 0,
      explanation: "Constante por potencia: 5·3x^2.",
    },
    {
      id: "pow-5",
      difficulty: "easy",
      question: "d/dx (x^4)",
      options: ["4x^3", "4x^4", "x^3", "3x^4"],
      correctIndex: 0,
      explanation: "d/dx(x^n) = n x^(n-1).",
    },
  ],
  sumas: [
    {
      id: "sum-1",
      difficulty: "easy",
      question: "d/dx (2x^3 + 4x - 9)",
      options: ["6x^2 + 4", "6x^2 + 4x", "2x^2 + 4", "6x + 4"],
      correctIndex: 0,
      explanation: "Se deriva término a término: 6x^2 + 4.",
    },
    {
      id: "sum-2",
      difficulty: "medium",
      question: "d/dx (x^4 - 2x^2 + 3x - 1)",
      options: ["4x^3 - 4x + 3", "4x^3 - 2x + 3", "x^3 - 4x + 3", "4x^2 - 4x + 3"],
      correctIndex: 0,
      explanation: "Linealidad: 4x^3 - 4x + 3.",
    },
    {
      id: "sum-3",
      difficulty: "easy",
      question: "d/dx (x^3 + x^2 + x)",
      options: ["3x^2 + 2x + 1", "3x^2 + 2x", "x^2 + x + 1", "3x + 2x + 1"],
      correctIndex: 0,
      explanation: "Deriva cada término.",
    },
  ],
  producto: [
    {
      id: "prod-1",
      difficulty: "medium",
      question: "d/dx [(x^2)(e^x)]",
      options: [
        "2x e^x + x^2 e^x",
        "2x e^x",
        "x^2 e^x",
        "e^x",
      ],
      correctIndex: 0,
      explanation:
        "Producto: (u·v)' = u'v + uv'. Aquí u=x^2, v=e^x ⇒ 2x e^x + x^2 e^x.",
    },
    {
      id: "prod-2",
      difficulty: "medium",
      question: "d/dx [(x^2)(x^3)]",
      options: ["5x^4", "x^5", "2x^3 + 3x^2", "5x^5"],
      correctIndex: 0,
      explanation: "u=x^2, v=x^3 ⇒ u'v + uv' = 2x·x^3 + x^2·3x^2 = 5x^4.",
    },
    {
      id: "prod-3",
      difficulty: "medium",
      question: "d/dx [(x)(x^2 - 1)]",
      options: ["3x^2 - 1", "x^2 - 1 + 2x^2", "x^2 - 1", "2x"],
      correctIndex: 1,
      explanation: "u=x, v=x^2-1 ⇒ 1·(x^2-1) + x·2x = x^2-1+2x^2.",
    },
  ],
  cociente: [
    {
      id: "quo-1",
      difficulty: "medium",
      question: "d/dx [(x^2 + 1) / x]",
      options: [
        "(x·2x - (x^2 + 1)·1) / x^2",
        "((x^2 + 1)·1 - x·2x) / x^2",
        "2x / x",
        "1 / x^2",
      ],
      correctIndex: 1,
      explanation:
        "Cociente: (u/v)' = (v u' - u v')/v^2. u=x^2+1, v=x ⇒ (x·2x - (x^2+1)·1)/x^2 con orden correcto del numerador.",
    },
    {
      id: "quo-2",
      difficulty: "medium",
      question: "d/dx [(x^3)/x]",
      options: ["2x", "3x^2/x - x^3/x^2", "x^2", "3x^2/x"],
      correctIndex: 0,
      explanation: "u=x^3, v=x ⇒ (x·3x^2 - x^3·1)/x^2 = 2x.",
    },
    {
      id: "quo-3",
      difficulty: "hard",
      question: "d/dx [(x^2 + 2x)/(x+1)]",
      options: [
        "((x+1)(2x+2) - (x^2+2x)·1)/(x+1)^2",
        "((x^2+2x)·1 - (x+1)(2x+2))/(x+1)^2",
        "(2x+2)/(x+1)",
        "(x^2+2x)/(x+1)^2",
      ],
      correctIndex: 0,
      explanation: "Cociente con u=x^2+2x, v=x+1.",
    },
  ],
  raices: [
    {
      id: "sqrt-1",
      difficulty: "easy",
      question: "d/dx (sqrt(x))",
      options: ["1 / (2 sqrt(x))", "1 / sqrt(x)", "sqrt(x)", "2 sqrt(x)"],
      correctIndex: 0,
      explanation: "d/dx(sqrt(x)) = 1 / (2 sqrt(x)).",
    },
    {
      id: "sqrt-2",
      difficulty: "medium",
      question: "d/dx (sqrt(3x + 1))",
      options: [
        "3 / (2 sqrt(3x + 1))",
        "1 / (2 sqrt(3x + 1))",
        "sqrt(3x + 1)",
        "3 sqrt(3x + 1)",
      ],
      correctIndex: 0,
      explanation:
        "Cadena: (sqrt(u))' = u' / (2 sqrt(u)); u=3x+1 ⇒ u'=3.",
    },
    {
      id: "sqrt-3",
      difficulty: "medium",
      question: "d/dx (sqrt(x^2 + 4))",
      options: ["x / sqrt(x^2 + 4)", "2x / (x^2 + 4)", "sqrt(x^2 + 4)", "2 / sqrt(x^2 + 4)"],
      correctIndex: 0,
      explanation: "u=x^2+4 ⇒ u'=2x; (sqrt u)' = u'/(2 sqrt u) ⇒ x/sqrt(x^2+4).",
    },
    {
      id: "sqrt-4",
      difficulty: "easy",
      question: "d/dx (sqrt(5x))",
      options: ["5/(2 sqrt(5x))", "1/(2 sqrt(5x))", "sqrt(5x)", "5"],
      correctIndex: 0,
      explanation: "u=5x ⇒ u'=5; (sqrt u)' = u'/(2 sqrt u).",
    },
    {
      id: "sqrt-5",
      difficulty: "medium",
      question: "d/dx (sqrt(x^3))",
      options: ["(3x^2) / (2 sqrt(x^3))", "3x^2", "sqrt(x^3)", "3/(2 sqrt(x^3))"],
      correctIndex: 0,
      explanation: "u=x^3 ⇒ u'=3x^2; (sqrt u)' = u'/(2 sqrt u).",
    },
  ],
  logaritmos: [
    {
      id: "ln-1",
      difficulty: "easy",
      question: "d/dx (ln x)",
      options: ["1/x", "x", "e^x", "ln x"],
      correctIndex: 0,
      explanation: "d/dx(ln x) = 1/x.",
    },
    {
      id: "ln-2",
      difficulty: "medium",
      question: "d/dx (ln(2x^2 + 1))",
      options: [
        "(4x) / (2x^2 + 1)",
        "1 / (2x^2 + 1)",
        "2 / x",
        "4x",
      ],
      correctIndex: 0,
      explanation:
        "Cadena: (ln u)' = u'/u con u=2x^2+1 ⇒ u'=4x.",
    },
    {
      id: "ln-3",
      difficulty: "easy",
      question: "d/dx (ln(5x - 2))",
      options: ["5/(5x - 2)", "1/(5x - 2)", "5x - 2", "5"],
      correctIndex: 0,
      explanation: "Cadena: u=5x-2 ⇒ u'=5; (ln u)' = u'/u.",
    },
    {
      id: "ln-4",
      difficulty: "medium",
      question: "d/dx (ln(x^2 + 3x))",
      options: ["(2x + 3)/(x^2 + 3x)", "2x + 3", "1/(x^2 + 3x)", "2/(x+3)"],
      correctIndex: 0,
      explanation: "u=x^2+3x ⇒ u'=2x+3; (ln u)' = u'/u.",
    },
    {
      id: "ln-5",
      difficulty: "medium",
      question: "d/dx (log_a(x))",
      options: ["1/(x ln a)", "ln a / x", "a^x", "1/x"],
      correctIndex: 0,
      explanation: "d/dx(log_a x) = 1/(x ln a).",
    },
    {
      id: "ln-6",
      difficulty: "medium",
      question: "d/dx (log_a(3x+1))",
      options: ["3 / ((3x+1) ln a)", "1 / ((3x+1) ln a)", "3 ln a", "ln(3x+1)"],
      correctIndex: 0,
      explanation: "Cadena: (log_a u)' = u'/(u ln a); u'=3.",
    },
  ],
  exponenciales: [
    {
      id: "exp-1",
      difficulty: "easy",
      question: "d/dx (e^x)",
      options: ["e^x", "x e^x", "1", "0"],
      correctIndex: 0,
      explanation: "d/dx(e^x) = e^x.",
    },
    {
      id: "exp-2",
      difficulty: "medium",
      question: "d/dx (e^{3x})",
      options: ["3 e^{3x}", "e^{3x}", "x e^{3x}", "e^x"],
      correctIndex: 0,
      explanation: "Cadena: (e^u)' = e^u u'; u=3x ⇒ u'=3.",
    },
    {
      id: "exp-3",
      difficulty: "medium",
      question: "d/dx (a^x)",
      options: ["a^x ln a", "ln a", "x a^x", "a^{x-1}"],
      correctIndex: 0,
      explanation: "d/dx(a^x) = a^x ln(a).",
    },
    {
      id: "exp-4",
      difficulty: "medium",
      question: "d/dx (a^{2x+1})",
      options: ["a^{2x+1} ln a · 2", "a^{2x+1} ln a", "2 ln a", "a^{2x}"],
      correctIndex: 0,
      explanation: "Cadena: u=2x+1 ⇒ u'=2; (a^u)' = a^u ln a · u'.",
    },
    {
      id: "exp-5",
      difficulty: "hard",
      question: "d/dx (e^{x^2})",
      options: ["2x e^{x^2}", "e^{x^2}", "x e^{x^2}", "2 e^x"],
      correctIndex: 0,
      explanation: "Cadena: u=x^2 ⇒ u'=2x; (e^u)' = e^u u'.",
    },
    {
      id: "exp-6",
      difficulty: "medium",
      question: "d/dx (e^{5x-4})",
      options: ["5 e^{5x-4}", "e^{5x-4}", "5 e^{x}", "e^{x}"],
      correctIndex: 0,
      explanation: "u=5x-4 ⇒ u'=5; (e^u)' = e^u u'.",
    },
  ],
  // inversas removidas
  cadena: [
    {
      id: "chain-1",
      difficulty: "medium",
      question: "d/dx ((3x - 1)^4)",
      options: [
        "4(3x - 1)^3 · 3",
        "4(3x - 1)^4",
        "3(3x - 1)^4",
        "(3x - 1)^3",
      ],
      correctIndex: 0,
      explanation: "Cadena: (u^n)' = n u^{n-1} u'; u=3x-1 ⇒ u'=3.",
    },
    {
      id: "chain-2",
      difficulty: "medium",
      question: "d/dx ((2x + 5)^5)",
      options: ["5(2x+5)^4 · 2", "5(2x+5)^5", "2(2x+5)^5", "(2x+5)^4"],
      correctIndex: 0,
      explanation: "u=2x+5 ⇒ u'=2; (u^n)' = n u^{n-1} u'.",
    },
    {
      id: "chain-3",
      difficulty: "medium",
      question: "d/dx (ln((x^2)+1))",
      options: ["(2x)/((x^2)+1)", "2x+1", "1/(x^2+1)", "2/(x+1)"],
      correctIndex: 0,
      explanation: "u=x^2+1 ⇒ u'=2x; (ln u)' = u'/u.",
    },
    {
      id: "chain-4",
      difficulty: "medium",
      question: "d/dx (e^{(3x^2-2)})",
      options: ["6x e^{3x^2-2}", "e^{3x^2-2}", "3x e^{3x^2-2}", "6 e^{x}"],
      correctIndex: 0,
      explanation: "u=3x^2-2 ⇒ u'=6x; (e^u)' = e^u u'.",
    },
    {
      id: "chain-5",
      difficulty: "hard",
      question: "d/dx (log_a(x^2+2x))",
      options: ["(2x+2)/((x^2+2x) ln a)", "2/ln a", "1/((x^2+2x) ln a)", "(x^2+2x)/ln a"],
      correctIndex: 0,
      explanation: "u=x^2+2x ⇒ u'=2x+2; (log_a u)' = u'/(u ln a).",
    },
  ],
  implicita: [
    {
      id: "impl-1",
      difficulty: "hard",
      question: "Si x^2 + y^2 = 1, dy/dx = ?",
      options: ["-x/y", "x/y", "-y/x", "y/x"],
      correctIndex: 0,
      explanation:
        "2x + 2y y' = 0 ⇒ y' = -x/y (derivación implícita).",
    },
    {
      id: "impl-2",
      difficulty: "hard",
      question: "Si xy = 1, dy/dx = ?",
      options: ["-y/x", "-1/x^2", "1/x^2", "-x/y"],
      correctIndex: 0,
      explanation: "Derivar: x y' + y = 0 ⇒ y' = -y/x.",
    },
    {
      id: "impl-3",
      difficulty: "hard",
      question: "Si x^2 + xy + y^2 = 3, dy/dx = ?",
      options: ["-(2x + y)/(x + 2y)", "(2x + y)/(x + 2y)", "-(x + 2y)/(2x + y)", "y/x"],
      correctIndex: 0,
      explanation: "2x + (x y' + y) + 2y y' = 0 ⇒ (x + 2y) y' = -(2x + y).",
    },
    {
      id: "impl-4",
      difficulty: "hard",
      question: "Si e^y = x^2 + 1, dy/dx = ?",
      options: ["(2x)/e^y", "2x", "e^y · 2x", "1/(2x)"],
      correctIndex: 0,
      explanation: "e^y y' = 2x ⇒ y' = 2x / e^y.",
    },
  ],
};

export function topicKeyFromSpaceName(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("constantes")) return "constantes";
  if (n.includes("potencias")) return "potencias";
  if (n.includes("sumas")) return "sumas";
  if (n.includes("producto")) return "producto";
  if (n.includes("cociente")) return "cociente";
  if (n.includes("raíces") || n.includes("raices")) return "raices";
  if (n.includes("logaritmos")) return "logaritmos";
  if (n.includes("exponenciales")) return "exponenciales";
  if (n.includes("cadena")) return "cadena";
  if (n.includes("implícita") || n.includes("implicita")) return "implicita";
  return null;
}

export function getRandomCardForTopic(topicKey) {
  const list = cardsByTopic[topicKey];
  if (!list || list.length === 0) return null;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

export function getCardById(id) {
  for (const key of Object.keys(cardsByTopic)) {
    const found = cardsByTopic[key].find((c) => c.id === id);
    if (found) return found;
  }
  return null;
}

export function getAllCardsForBoard() {
  const topics = ["constantes", "potencias", "sumas", "producto", "cociente", "raices", "logaritmos", "exponenciales", "cadena", "implicita"];
  const result = [];
  for (const t of topics) {
    const list = cardsByTopic[t] || [];
    for (const c of list) result.push(c);
  }
  return result;
}


