import { useState } from "react";
import picks from "./data/picks";
import useTracker from "./hooks/useTracker";

export default function App() {
  const [league, setLeague] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tab, setTab] = useState("picks");

  const { tracker, addPick, removePick, clearTracker } = useTracker();
const accaProbability =
  tracker.length >= 2
    ? tracker.reduce((acc, p) => acc * p.probability, 1)
    : 0;

const accaOdds =
  accaProbability > 0 ? (1 / accaProbability).toFixed(2) : null;
  
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

      {/* Tabs */}
      <div style={{ marginTop: 12 }}>
        <button style={tabBtn(tab==="picks")} onClick={()=>setTab("picks")}>Picks</button>
        <button style={tabBtn(tab==="tracker")} onClick={()=>setTab("tracker")}>
          Tracker ({tracker.length})
        </button>
      </div>

      {tab === "picks" && (
        <>
          {/* Filters */}
          <div style={card}>
            <select value={league} onChange={e=>setLeague(e.target.value)} style={input}>
              {leagues.map(l => <option key={l}>{l}</option>)}
            </select>
            <input type="date" value={from} onChange={e=>setFrom(e.target.value)} style={input}/>
            <input type="date" value={to} onChange={e=>setTo(e.target.value)} style={input}/>
          </div>

          {/* Picks */}
          {filtered.map(p => (
            <div key={p.id} style={card}>
              <div>
                <strong>{p.match}</strong>
                <div style={sub}>{p.league} · {p.date}</div>
              </div>
              <div>
                <span style={pill}>{Math.round(p.probability*100)}%</span>
                <button style={addBtn} onClick={()=>addPick(p)}>Add</button>
              </div>
            </div>
          ))}
        </>
      )}

      {tab === "tracker" && (
        <>
          {tracker.length === 0 && <p style={{opacity:.6}}>No picks added</p>}
{tracker.length >= 2 && (
  <div style={{
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    background: "rgba(0,255,0,0.08)",
    border: "1px solid rgba(0,255,0,0.3)"
  }}>
    <strong>Acca Summary</strong>
    <div style={{ fontSize: 14, marginTop: 6 }}>
      Picks: {tracker.length}
    </div>
    <div style={{ fontSize: 14 }}>
      Probability: {(accaProbability * 100).toFixed(2)}%
    </div>
    <div style={{ fontSize: 14 }}>
      Decimal Odds: {accaOdds}
    </div>
  </div>
)}
          
          {tracker.map(p => (
            <div key={p.id} style={card}>
              <div>
                <strong>{p.match}</strong>
                <div style={sub}>{p.league} · {p.date}</div>
              </div>
              <button style={removeBtn} onClick={()=>removePick(p.id)}>Remove</button>
            </div>
          ))}

          {tracker.length > 0 && (
            <button style={clearBtn} onClick={clearTracker}>
              Clear tracker
            </button>
          )}
        </>
      )}
    </div>
  );
}

/* styles */
const card = {
  marginTop: 16,
  padding: 16,
  borderRadius: 12,
  background: "rgba(255,255,255,0.05)"
};
const input = {
  width: "100%",
  marginTop: 6,
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: "rgba(0,0,0,0.4)",
  color: "white"
};
const pill = {
  background: "green",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12
};
const addBtn = {
  display: "block",
  marginTop: 6,
  padding: "6px 10px",
  borderRadius: 8,
  background: "rgba(255,255,255,0.15)",
  color: "white",
  border: "none"
};
const removeBtn = {
  padding: "6px 10px",
  borderRadius: 8,
  background: "#b00020",
  color: "white",
  border: "none"
};
const clearBtn = {
  marginTop: 20,
  width: "100%",
  padding: 10,
  borderRadius: 10,
  background: "#b00020",
  color: "white",
  border: "none"
};
const sub = { fontSize: 12, opacity: .7 };
const tabBtn = (active) => ({
  marginRight: 6,
  padding: "6px 12px",
  borderRadius: 999,
  background: active ? "white" : "rgba(255,255,255,0.15)",
  color: active ? "black" : "white",
  border: "none"
});
