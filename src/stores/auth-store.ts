import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User) => void;
}

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    name: "Grace Kagho",
    email: "grace.kagho@ivt.baug.ethz.ch",
    avatar:
      "https://s3.amazonaws.com/shecodesio-production/students/avatars/000/197/310/medium/pexels-kebs-visuals-3992656.jpg?1712498883",
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      login: async (_email: string, _password: string) => {
        set({ isLoading: true });

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authentication logic
        const user = MOCK_USERS[0]

        // if (user && password === "password") {
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        // } else {
        //   set({ isLoading: false });
        //   return {
        //     success: false,
        //     error: "Invalid email or password",
        //   };
        // }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: "ech___ub___",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
