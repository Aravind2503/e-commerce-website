import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";

function App() {
    // const [products, setProducts] = useState([]);
    return (
        <div className="App">
            <Router>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" exact component={HomePage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={RegisterPage} />
                <Route path="/search" exact component={SearchPage} />
            </Router>
        </div>
    );
}

export default App;
