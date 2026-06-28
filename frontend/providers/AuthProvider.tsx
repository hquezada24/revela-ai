// providers/AuthProvider.tsx

"use client";
import { createContext, useState, useEffect } from "react";
import { loadUser, authenticate, endSession } from "@/lib/auth";
import { UserResponse } from "@/schemas";

export const AuthContext = createContext<{
  user: UserResponse | null;
  isLoading: boolean;
  login: (loginParam: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
} | null>(null);

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserResponse | null>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const user = await loadUser();
      setUser(user);
    } catch (error) {
      console.error("Load user error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (loginParam: string, password: string) => {
    try {
      setIsLoading(true);
      await authenticate(loginParam, password);
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    } finally {
      setIsLoading(false);
      await fetchUser();
    }
  };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
