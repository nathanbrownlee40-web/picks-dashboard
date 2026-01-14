export function exportTrackerCSV(tracker) {
  if (!tracker.length) return;

  const headers = ["Match", "League", "Date", "Probability (%)"];

  const rows = tracker.map(p => [
    p.match,
    p.league,
    p.date,
    p.probability
  ]);

  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tracker.csv";
  a.click();

  URL.revokeObjectURL(url);
}

