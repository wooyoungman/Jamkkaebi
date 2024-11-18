export * from "@queries/manager/auth";
export * from "@queries/manager/driver";
export * from "@queries/manager/routes";
export * from "@queries/manager/report";

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    login: () => [...queryKeys.auth.all, "login"] as const,
    register: () => [...queryKeys.auth.all, "register"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },
  driver: {
    all: ["driver"] as const,
    list: () => [...queryKeys.driver.all, "list"] as const,
  },
  routes: {
    all: ["routes"] as const,
    list: () => [...queryKeys.routes.all, "list"] as const,
  },
  report: {
    all: ["report"] as const,
    // 단일 report를 위한 키
    detail: (driverId: number) => [...queryKeys.report.all, driverId] as const,
    list: () => [...queryKeys.report.all, "list"] as const,
  },
} as const;
