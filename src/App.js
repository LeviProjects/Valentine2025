import './styles/App.css';
import React from "react";
import FloralScene from "./components/FloralScene";
import ValentineComponent from "./components/ValentineComponent";

function App() {
  return (
    <div className="App">
      <ValentineComponent />
      <FloralScene />
    </div>
  );
}

export default App;
