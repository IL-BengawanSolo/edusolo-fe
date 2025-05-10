import React from "react";
// import Button from "./components/Button.jsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DestinationCard from "./components/Destinationcard.jsx";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh gap-1">
        <Button size="custom">Custom Default</Button>
        <Button size="custom" variant="lite">
          Custom Lite
        </Button>
        <DestinationCard /> 
      </div>
    </>
  );
}

export default App;
