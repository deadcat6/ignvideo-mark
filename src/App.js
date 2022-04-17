
import './App.css';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";

import {AmainPage} from "./ui/AmainPage.tsx"
import {Users} from "./api/Users.tsx"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AmainPage/>}/>
        <Route path="/place" element={<div>place</div>}/>
        <Route path="/videos">
          <Route path=':vid'element={<AmainPage/>}/>
          <Route path="" element={<AmainPage />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
