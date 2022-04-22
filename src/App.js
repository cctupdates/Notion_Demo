import React from "react";
import TaskList from "./pages/TaskList";
import { ItemProvider } from "./context/ItemFunctions";

const App = () => {
  return (
    <ItemProvider>
      <TaskList />
    </ItemProvider>
  );
};

export default App;
