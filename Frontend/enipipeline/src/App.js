import './App.css';
import '@fontsource/roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Environment from './components/Environment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginScreen}></Route>
          <Route exact path="/home" component={HomeScreen}></Route>
          <Route exact path="/environment" component={Environment}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
