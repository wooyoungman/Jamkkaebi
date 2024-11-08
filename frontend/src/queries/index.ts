export * from "@queries/manager/auth";

export const queryKeys = {
  user: ["user"] as const,
  // 다른 쿼리 키들도 여기에 추가
} as const;
