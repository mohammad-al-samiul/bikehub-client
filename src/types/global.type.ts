import { JwtPayload } from "jwt-decode";

export type TJwtPayload = {
  role: "user" | "admin";
  email: string;
} & JwtPayload;
