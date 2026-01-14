export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b1220", color: "white", padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: "bold" }}>Picks Dashboards</h1>
      <p style={{ opacity: 0.7 }}>Build tracker + accas (PWA ready)</p>

      <div style={{ marginTop: 16 }}>
        <button style={btn}>Over 2.5</button>
        <button style={btn}>BTTS Yes</button>
        <button style={btn}>Over 1.5</button>
        <button style={btn}>Tracker</button>
        <button style={btn}>Acca Tracker</button>
      </div>

      <div style={{ marginTop: 24, padding: 16, background: "rgba(255,255,255,0.05)", borderRadius: 12 }}>
        <input placeholder="Search team, league, pick" style={input} />
      </div>

      <div style={card}>
        <strong>Sample Match 1</strong>
        <span style={pill}>95%</span>
      </div>

      <div style={card}>
        <strong>Sample Match 2</strong>
        <span style={pill}>92%</span>
      </div>
    </div>
  );
}

const btn = {
  marginRight: 6,
  marginTop: 6,
  padding: "6px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.1)",
  color: "white",
  border: "none"
};

const input = {
  width: "100%",
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
  background: "rgba(255,255,255,0.05)",
  display: "flex",
  justifyContent: "space-between"
};

const pill = {
  background: "green",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12
};
