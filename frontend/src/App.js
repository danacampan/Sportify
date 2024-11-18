import React from "react";
import EventPage from "./pages/EventPage"; // Import din folderul pages
import "./index.css"; // Importă stilurile globale

function App() {
  return (
    <div>
      {/* EventPage funcționează cu fallback */}
      <EventPage event={null} />
    </div>
  );
}

export default App;
