const BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") || "http://localhost:5125";
const API = `${BASE}/api`;

async function http(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

export function createRoom({ roomId, hostId } = {}) {
  return http(`/rooms`, {
    method: "POST",
    body: JSON.stringify({ roomId, hostId }),
  });
}

export function joinRoom(roomId, { playerId, name }) {
  return http(`/rooms/${roomId}/join`, {
    method: "POST",
    body: JSON.stringify({ playerId, name }),
  });
}

export function getRoomState(roomId) {
  return http(`/rooms/${roomId}/state`);
}

export function roll(roomId, { playerId }) {
  return http(`/rooms/${roomId}/roll`, {
    method: "POST",
    body: JSON.stringify({ playerId }),
  });
}

export function health() {
  return http(`/db/health`);
}




