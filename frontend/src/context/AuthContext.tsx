import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { getCurrentUser } from "../api/userApi";
import {
  login as loginRequest,
  register as registerRequest,
} from "../api/authApi";
import { getToken, removeToken, setToken } from "../utils/storage";
import type { LoginRequest, RegisterRequest } from "../types/auth";
import type { User } from "../types/user";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const refreshUser = useCallback(async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = getToken();

      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        await refreshUser();
      } catch {
        removeToken();
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    void init();
  }, [refreshUser]);

  const login = async (data: LoginRequest) => {
    const response = await loginRequest(data);
    setToken(response.token);
    await refreshUser();
  };

  const register = async (data: RegisterRequest) => {
    const response = await registerRequest(data);
    setToken(response.token);
    await refreshUser();
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isInitializing, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}