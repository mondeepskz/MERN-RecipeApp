import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.js';
import { Auth } from './pages/Auth.js';
import { CreateRecipes } from './pages/CreateRecipes.js';
import { SavedRecipes } from './pages/SavedRecipes.js';
import { Navbar } from './component/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipes" element={<CreateRecipes />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>  
  );
}

export default App;
