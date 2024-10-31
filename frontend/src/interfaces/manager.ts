export interface LoginRequest {
  id: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  role: "manager" | "driver";
  company: string;
  phone: string;
  employeeId: string;
  location: string;
  status: "운행 중" | "휴일";
}
