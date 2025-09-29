import { authClient } from "@/lib/auth-client";

export const useAuth = authClient.useAuth;
export const AuthProvider = authClient.Provider;