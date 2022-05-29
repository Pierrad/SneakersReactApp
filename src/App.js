import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';

import GuardedRoute from "./router/GuardedRoute";

import Landing from './pages/Landing';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import User from "./pages/User";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Header />
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<GuardedRoute Component={Products} />} />
          <Route path="user" element={<GuardedRoute Component={User} />} />
        </Routes>
      </HistoryRouter>
      <Footer />
    </div>
  );
}

export default App;
