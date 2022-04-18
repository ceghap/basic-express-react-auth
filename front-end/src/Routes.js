import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserInfoPage } from "./pages/UserInfoPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { PrivateRoute } from "./auth/PrivateRoute";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <UserInfoPage />
        </PrivateRoute>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
      </Switch>
    </Router>
  );
};
