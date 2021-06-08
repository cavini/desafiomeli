import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ResultList from './Components/ResultList/ResultList';
import GlobalState from './Context/GlobalState';
import './App.scss';
import ProductDetail from './Components/ProductDetail/ProductDetail';

function App() {
  return (
    <GlobalState>
      <div>
        <Router>
          <Route path="/" component={Navbar}></Route>

          <Route exact path="/items" component={ResultList} />
          <Route exact path="/items/:id" component={ProductDetail} />
        </Router>
      </div>
    </GlobalState>
  );
}

export default App;
