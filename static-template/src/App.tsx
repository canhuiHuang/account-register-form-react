import React, { useState } from "react";
import "./App.css";
import Content from "./Content";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <div className='main-container'>
        <Content />
        <header className='dummy-header'>
          <h1>Dummy Heading</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptates hic id aut voluptatibus ullam quod aperiam impedit. Amet.</p>
        </header>
      </div>
    </div>
  );
}

export default App;
