import './App.css';
import EndpointError from './Components/EndPointError';
import Products from './Components/Products';
import { Router } from "@reach/router"

function App() {
  return (
    
    <div>
      <Router>
    <Products path="/"/>
    <EndpointError default/>
    </Router>
    </div>
  );
}

export default App;
