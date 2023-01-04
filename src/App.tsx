import React, { FC } from "react";

import "./App.css";
import Hangman from "./components/Hangman";
import TodoList from "./components/TodoList";

const App: FC = () => {
  return (
    <div className="App">
      {/* <TodoList /> */}
      <Hangman />
    </div>
  );
};

export default App;
