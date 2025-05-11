import React from "react";
import { Button } from "@/components/ui/button";
import DestinationCard from "./components/DestinationCard.jsx";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh gap-1">
        <Button size="custom">Custom Default</Button>
        <Button size="custom" variant="lite">
          Custom Lite
        </Button>
        <DestinationCard variant="col" /> 
        <DestinationCard variant="row" /> 
      </div>
    </>
  );
}

export default App;
