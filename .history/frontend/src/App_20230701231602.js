import data from "./data";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";

function App () {
  return (
    <BrowserRouter>
      <div >
        <header>
          <a href="/">Umeshop</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
