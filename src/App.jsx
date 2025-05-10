import React from "react";
// import Button from "./components/Button.jsx";
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-1">
      <Button size="custom">Custom Default</Button>
      <Button size="custom" variant="lite">Custom Lite</Button>
    </div>
  );
}

export default App;
