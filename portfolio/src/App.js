import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className='App-nav'>
        <button className="Nav-button Home" onClick={() => {
    alert('Home');
  }}>Home</button>
        <button className="Nav-button Projects" onClick={() => {
    alert('Projects');
  }}>Projects</button>
        <button className="Nav-button Contact" onClick={() => {
    alert('Contact');
  }}>Contact</button>
      </nav>
      <header className="App-header">
        <div className="Left-Right-Div">
          <div className="Blurb-left">
            <p>Hello</p>
          </div>
          <div className="Photo-right">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      </header>

    </div>
  );
}

export default App;
