import React from 'react';
import './App.css';
import Chat from './components/chatComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Broadcast from './components/broadcast.jsx';
import Viewer from './components/Viewer.jsx';


function App() {
  return (
    // <React.StrictMode>
    <Router>
      <div>
        {/* Define the Routes */}
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/stream" element={<Broadcast />} />
          <Route path="/listen" element={<Viewer />} />
          {/* <Route path="/stream" element={<StreamClient />} /> */}
          {/* Catch-all route for undefined paths */}
        </Routes>
      </div>
    </Router>
    // </React.StrictMode>
  );
  
}

export default App;
