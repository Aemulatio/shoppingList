import { List } from "./components/List/List.tsx";
import { Title } from "./components/Title/Title.tsx";
import { Context } from "./contexts/ItemsContext.tsx";

function App() {
  return (
    <Context>
      <Title />
      <List />
    </Context>
  );
}

export default App;
