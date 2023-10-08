import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Hero,
  Nav,
  SummarizePDF,
  SummarizeURL,
  SummarizePPTX,
  SummarizeWORD,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <Router>
      <main>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">
          <Nav />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/summarize-url" element={<SummarizeURL />} />
            <Route path="/summarize-pdf" element={<SummarizePDF />} />
            <Route path="/summarize-pptx" element={<SummarizePPTX />} />
            <Route path="/summarize-word" element={<SummarizeWORD />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
