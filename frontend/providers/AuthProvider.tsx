// providers/AuthProvider.tsx

"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import { loadUser, endSession } from "@/lib/auth";
import { UserRead } from "@/schemas";

export const AuthContext = createContext<{
  user: UserRead | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
} | null>(null);

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserRead | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const user = await loadUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      await endSession();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
      await fetchUser();
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
