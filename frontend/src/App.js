import './App.css';
import Header from "./components/layout/Header.jsx"
// import Footer from "./components/layout/Footer.jsx"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
  <Router>
    <Header />
  </Router>
  );
}

export default App;
