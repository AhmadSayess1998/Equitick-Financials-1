import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Posts1 from "./pages/Post1";

function App() {
  var user1 = localStorage.getItem("user");
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={!user || !user1 ? <Login /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard"
            element={user || user1 ? <Dashboard /> : <Navigate to="/" />}
          >
            <Route
              path="posts"
              element={user || user1 ? <Posts /> : <Navigate to="/" />}
            />
              <Route
              path="postsone"
              element={user || user1 ? <Posts1 /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
