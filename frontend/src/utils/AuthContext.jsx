import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [settings, setSetting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.data);
        setSetting(res.data.data.settings);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  function setSettings({ dailyReminders, weeklyReports, carbonGoal }) {
    axios
      .put(
        "http://localhost:5000/api/v1/users/settings",
        { dailyReminders, weeklyReports, carbonGoal },
        { withCredentials: true }
      )
      .then((res) => {
        setUser((prev) => {
          return { ...prev, settings: res.data.data };
        });
        setSetting(res.data.data);
      });
  }

  function logout() {
    axios
      .post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setUser(null);
        window.location.reload();
      });
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, settings, setSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
