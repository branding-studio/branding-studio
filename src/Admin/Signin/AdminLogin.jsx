import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";
import { useLocalContext } from "../../context/LocalContext";
 import { doc, getDoc } from "firebase/firestore";
import {  db } from "../../firebase/firebaseConfig"; // make sure this path is correct

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  // alias to avoid name confusion with component
  const { adminSignIn } = useAdminContext();
  const { webinfo } = useLocalContext();


const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setIsSubmitting(true);

  try {
  await adminSignIn(email, password); // no return expected
  navigate("/admin/dashboard");
} catch (err) {
  setError(err?.message || "Login failed. Please try again.");
} finally {
  setIsSubmitting(false);
}
};

  return (
    <div className="admin-auth-shell">
      {/* Left / Brand panel */}
      <aside className="admin-auth-brand">
        <div className="brand-inner">
          <div className="brand-badge">{webinfo?.name || "Your Brand"}</div>
          <h1>Admin Console</h1>
          <p>Secure access to your dashboard, content, and analytics.</p>

          <ul className="brand-points">
            <li>• Manage blogs & pages</li>
            <li>• Moderate comments & messages</li>
            <li>• Team & roles ready</li>
          </ul>

          <div className="brand-footer">Protected • Private • Fast</div>
        </div>
      </aside>

      {/* Right / Form panel */}
      <main className="admin-auth-main">
        <form className="auth-card" onSubmit={handleLogin} noValidate>
          <header className="auth-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue</p>
          </header>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!!error}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-field">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                aria-invalid={!!error}
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            <div className="row-between">
              <label className="remember">
                <input type="checkbox" /> Keep me signed in
              </label>
              <span className="link-muted" role="button" tabIndex={0}>
                Forgot password?
              </span>
            </div>
          </div>

          {error && (
            <div className="auth-error" role="alert" aria-live="polite">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner" aria-hidden="true" />
            ) : null}
            {isSubmitting ? "Signing in…" : "Login"}
          </button>

          <div className="auth-meta">
            By continuing, you agree to our{" "}
            <a href="/terms-and-condition">Terms</a> and{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminLogin;
