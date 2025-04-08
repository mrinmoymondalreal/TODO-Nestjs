import React from "react";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";

export const AuthContext = React.createContext<{
  user: { email: string; name: string; id: string } | null;
  loading: boolean;
  refreshUser: () => void;
}>({
  user: null,
  loading: false,
  refreshUser: () => {},
});

export const AuthProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, refreshUser } = useUser();
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Unauthorized <Link to="/sign-in">Sign In</Link>
      </div>
    );
  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
