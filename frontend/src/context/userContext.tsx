import { generateAvatar } from "@/config/avatars";
import { get, post } from "@/utils/api";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

// Define User type
interface User {
  username: string;
  id: number;
  avatar: string;
}

// Define LoginData type
export interface FormData {
  username: string;
  password: string;
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    data: FormData
  ) => Promise<{ success: boolean; user?: User; message?: string }>;
  signup: (data: FormData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<{ success: boolean; message?: string }>;
}

// Response structure for API
interface ApiResponse {
  success: boolean;
  message: string;
  user?: User;
}

// Create context with default placeholder value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => ({ success: false }),
});

// Props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    me();
  }, []);

  const signup = async (data: FormData) => {
    try {
      setLoading(true);
      const response: ApiResponse = await post("/users/register", {
        ...data,
        avatar: generateAvatar(),
      });

      if (response.success) {
        toast.success("User created");
        navigate("/auth/login");
      }

      return { success: false, message: response.message };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || "Register failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: FormData) => {
    try {
      setLoading(true);
      const response: ApiResponse = await post("/users/login", data);

      if (response.success && response.user) {
        setUser(response.user);
        toast.success("Login successful");
        navigate("/");
        return { success: true, user: response.user };
      }

      return { success: false, message: response.message };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || "Login failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const me = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await get("/users/me");

      if (response.success && response.user) {
        setUser(response.user);
        navigate("/");
        return { success: true, user: response.user };
      }

      return { success: false, message: response.message };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || "Login failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await post("/users/logout");

      if (response.success) {
        setUser(null);
        toast.success("Logged out");
        navigate("/");
        return { success: true, user: response.user };
      }

      return { success: false, message: response.message };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || "Logout failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const value = { user, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
