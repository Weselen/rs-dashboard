import './styles/App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;