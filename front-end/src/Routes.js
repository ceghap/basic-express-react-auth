import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserInfoPage } from "./pages/UserInfoPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { SuccessSignupPage } from "./pages/SuccessSignupPage";
import { EmailVerificationPage } from "./pages/EmailVerificationPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";

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
        <Route path="/success-signup">
          <SuccessSignupPage />
        </Route>
        <Route path="/verify-email/:verificationString">
          <EmailVerificationPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password/:passwordResetCode">
          <PasswordResetPage />
        </Route>
      </Switch>
    </Router>
  );
};
