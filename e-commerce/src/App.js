import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage2";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import CartPage from "./components/CartPage";
import ProfilePage from "./components/ProfilePage";
import DetailsPage from "./components/DetailsPage";
import { UserInfoProvider } from "./context/UserInfo";
import { CartInfoProvider } from "./context/CartInfo";
import FashionDetailsPage from "./components/FashionDetailsPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderPage from "./components/OrderPage";

function App() {
    // const [products, setProducts] = useState([]);
    return (
        <div className="App">
            <Router>
                <UserInfoProvider>
                    <CartInfoProvider>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/home" exact component={HomePage} />
                        <Route path="/login" exact component={LoginPage} />
                        <Route
                            path="/register"
                            exact
                            component={RegisterPage}
                        />
                        <Route path="/search" exact component={SearchPage} />
                        <Route path="/cart" exact component={CartPage} />
                        <Route path="/profile" exact component={ProfilePage} />
                        <Route path="/details" exact component={DetailsPage} />
                        <Route
                            path="/detailsfashion"
                            exact
                            component={FashionDetailsPage}
                        />
                        <Route
                            path="/checkout"
                            exact
                            component={CheckoutPage}
                        />
                        <Route path="/order" exact component={OrderPage} />
                    </CartInfoProvider>
                </UserInfoProvider>
            </Router>
        </div>
    );
}

export default App;
