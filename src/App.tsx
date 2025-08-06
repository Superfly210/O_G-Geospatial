import React from 'react';
import MapViewer from './components/MapViewer';
import Header from './components/Header';

function App() {
  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex-1 relative">
        <MapViewer />
      </div>
    </div>
  );
}

export default App;