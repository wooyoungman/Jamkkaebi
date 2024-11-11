export * from "@queries/manager/auth";

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    login: () => [...queryKeys.auth.all, "login"] as const,
    register: () => [...queryKeys.auth.all, "register"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },
} as const;
