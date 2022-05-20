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

export const history = createBrowserHistory();

function App() {
  return (
    <div>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" auth={true} element={<Products />} />
        </Routes>
      </HistoryRouter>

    </div>
  );
}

export default App;
