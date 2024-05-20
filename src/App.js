import {Routes,Route} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<>Landing</>}/>
        <Route path="/login" element={<>Login</>}/>
        <Route path="/signup" element={<>signup</>}/>
        <Route path="/home" element={<>Home</>}/>
        <Route path="/profile" element={<>Profile</>}/>
        <Route path="/search/:search" element={<>Search here</>}/>
        <Route path="/*" element={<>Oops</>}/>

      </Routes>
    </div>
  );
}

export default App;
