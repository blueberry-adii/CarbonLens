import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [allEntries, setAllEntries] = useState(null);
  const [weeklyTrend, setWeeklyTrend] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState(null);

  async function getUser() {
    const res = await axios.get("http://localhost:5000/api/v1/auth/me", {
      withCredentials: true,
    });
    return res.data.data;
  }

  async function getAchievements() {
    const res = await axios.get(
      "http://localhost:5000/api/v1/users/achievements",
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }

  async function getDashboard() {
    const res = await axios.get(
      "http://localhost:5000/api/v1/analytics/dashboard",
      { withCredentials: true }
    );
    return res.data.data;
  }

  async function getWeeklyTrend() {
    const res = await axios.get(
      "http://localhost:5000/api/v1/analytics/weekly-trend",
      { withCredentials: true }
    );
    return res.data.data;
  }

  async function getAllEntries() {
    const res = await axios.get("http://localhost:5000/api/v1/carbon/entries", {
      withCredentials: true,
    });
    return res.data.data;
  }

  useEffect(() => {
    async function loadApp() {
      try {
        const [user, achievements, dashboard, weeklyTrend, allEntries] =
          await Promise.all([
            getUser(),
            getAchievements(),
            getDashboard(),
            getWeeklyTrend(),
            getAllEntries(),
          ]);

        console.log(dashboard);

        setUser(user);
        setAchievements(achievements);
        setDashboard(dashboard);
        setWeeklyTrend(weeklyTrend);
        setAllEntries(allEntries);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadApp();
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
      value={{
        user,
        setUser,
        loading,
        logout,
        setSettings,
        achievements,
        dashboard,
        weeklyTrend,
        allEntries,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
