import { List } from "./components/List/List.tsx";
import { Title } from "./components/Title/Title.tsx";
import { Context } from "./contexts/ItemsContext.tsx";
import {Buttons} from "./components/Buttons/Buttons.tsx";

function App() {
  return (
    <Context>
      <Title />
      <List />
      <Buttons/>
    </Context>
  );
}

export default App;
