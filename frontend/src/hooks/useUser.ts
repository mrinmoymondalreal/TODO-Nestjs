import { useEffect, useState } from "react";
import { getAuthInstance } from "../service/api";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | {
    email: string;
    name: string;
    id: string;
  }>(null);

  async function refreshUser() {
    setLoading(true);
    try {
      const response = await getAuthInstance().get("/auth/me");
      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      const user = response.data;
      setUser(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return {
    loading,
    user,
    refreshUser,
  };
};
