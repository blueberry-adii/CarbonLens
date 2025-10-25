import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getAchievements() {
    const res = await axios.get(`${apiUrl}/api/v1/users/achievements`, {
      withCredentials: true,
    });
    return res.data.data;
  }

  async function getProfile() {
    const res = await axios.get(`${apiUrl}/api/v1/users/profile`, {
      withCredentials: true,
    });
    return res.data.data;
  }

  async function getDashboard() {
    const res = await axios.get(`${apiUrl}/api/v1/analytics/dashboard`, {
      withCredentials: true,
    });
    return res.data.data;
  }

  async function getWeeklyTrend() {
    const res = await axios.get(`${apiUrl}/api/v1/analytics/weekly-trend`, {
      withCredentials: true,
    });
    return res.data.data;
  }

  async function getAllEntries() {
    const res = await axios.get(`${apiUrl}/api/v1/carbon/entries`, {
      withCredentials: true,
    });
    return res.data.data;
  }

  useEffect(() => {
    async function loadApp() {
      try {
        const [profile, achievements] = await Promise.all([
          getProfile(),
          getAchievements(),
        ]);

        setProfile(profile);
        setAchievements(achievements);
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
        `${apiUrl}/api/v1/users/settings`,
        { dailyReminders, weeklyReports, carbonGoal },
        { withCredentials: true }
      )
      .then((res) => {
        setProfile((prev) => {
          return { ...prev, settings: res.data.data };
        });
      });
  }

  function logout() {
    axios
      .post(`${apiUrl}/api/v1/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        setProfile(null);
        window.location.reload();
      });
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        logout,
        setSettings,
        achievements,
        profile,
        getDashboard,
        getWeeklyTrend,
        getAllEntries,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
