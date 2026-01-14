import { useState } from "react";
import picks from "./data/picks";

export default function App() {
  const [league, setLeague] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const leagues = ["All", ...new Set(picks.map(p => p.league))];

  const filtered = picks.filter(p => {
    if (league !== "All" && p.league !== league) return false;
    if (from && p.date < from) return false;
    if (to && p.date > to) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0b1220", color: "white", padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: "bold" }}>Picks Dashboards</h1>
      <p style={{ opacity: 0.7 }}>League & date filters</p>

      {/* Filters */}
      <div style={card}>
        <select value={league} onChange={e => setLeague(e.target.value)} style={input}>
          {leagues.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={input} />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} style={input} />
      </div>

      {/* Picks */}
      {filtered.map(p => (
        <div key={p.id} style={card}>
          <div>
            <strong>{p.match}</strong>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{p.league} · {p.date}</div>
          </div>
          <span style={pill}>{Math.round(p.probability * 100)}%</span>
        </div>
      ))}
    </div>
  );
}

const input = {
  width: "100%",
  marginTop: 6,
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: "rgba(0,0,0,0.4)",
  color: "white"
};

const card = {
  marginTop: 16,
  padding: 16,
  borderRadius: 12,
  background: "rgba(255,255,255,0.05)"
};

const pill = {
  background: "green",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  height: "fit-content"
};
