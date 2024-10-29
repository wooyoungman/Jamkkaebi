export interface LoginRequest {
    id: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    role: 'manager' | 'driver';
  }