import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Day1 from './pages/days/Day1';
import Day2 from './pages/days/Day2';
import Day3 from './pages/days/Day3';
import Day4 from './pages/days/Day4';
import Day5 from './pages/days/Day5';
import Day6 from './pages/days/Day6';
import Day7 from './pages/days/Day7';
import Day8 from './pages/days/Day8';
import Day9 from './pages/days/Day9';
import Day10 from './pages/days/Day10';
import Day11 from './pages/days/Day11';
import Day12 from './pages/days/Day12';
import Day13 from './pages/days/Day13';
import Day14 from './pages/days/Day14';
import Day15 from './pages/days/Day15';
import Day16 from './pages/days/Day16';
import Day17 from './pages/days/Day17';
import Day18 from './pages/days/Day18';
import Day19 from './pages/days/Day19';
import FinalSurprisePage from './pages/FinalSurprisePage';
import { UnlockProvider } from './context/UnlockContext';
import ItineraryPage from './pages/ItineraryPage';

function App() {
  return (
    <UnlockProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/day-1" element={<Day1 />} />
            <Route path="/day-2" element={<Day2 />} />
            <Route path="/day-3" element={<Day3 />} />
            <Route path="/day-4" element={<Day4 />} />
            <Route path="/day-5" element={<Day5 />} />
            <Route path="/day-6" element={<Day6 />} />
            <Route path="/day-7" element={<Day7 />} />
            <Route path="/day-8" element={<Day8 />} />
            <Route path="/day-9" element={<Day9 />} />
            <Route path="/day-10" element={<Day10 />} />
            <Route path="/day-11" element={<Day11 />} />
            <Route path="/day-12" element={<Day12 />} />
            <Route path="/day-13" element={<Day13 />} /> 
            <Route path="/day-14" element={<Day14 />} />
            <Route path="/day-15" element={<Day15 />} />
            <Route path="/day-16" element={<Day16 />} />
            <Route path="/day-17" element={<Day17 />} /> 
            <Route path="/day-18" element={<Day18 />} />
            <Route path="/day-19" element={<Day19 />} />
            <Route path="/final-surprise" element={<FinalSurprisePage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
          </Routes>
        </div>
      </Router>
    </UnlockProvider>
  );
}

export default App; 