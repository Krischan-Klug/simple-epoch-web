import net from "net";

export default async function handler(req, res) {
  const socket = new net.Socket();
  socket.setTimeout(5000); // Timeout auf 5 Sekunden setzen

  socket.on("connect", () => {
    console.log("Verbindung erfolgreich");
    res.status(200).json({ message: "Verbindung erfolgreich" });
    socket.destroy();
  });

  socket.on("timeout", () => {
    console.error("Verbindungs-Timeout");
    res.status(500).json({ error: "Verbindungs-Timeout" });
    socket.destroy();
  });

  socket.on("error", (err) => {
    console.error("Verbindungsfehler:", err);
    res.status(500).json({ error: "Verbindungsfehler", details: err.message });
    socket.destroy();
  });

  socket.connect(2305, "168.119.211.174");
}
