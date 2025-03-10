export interface IUser {
  userId: string;
  name: string;
  email: string;
  isActive?: boolean;
  role: "user" | "admin";
  phone?: string;
  address?: string;
  iat?: number;
  exp?: number;
}
