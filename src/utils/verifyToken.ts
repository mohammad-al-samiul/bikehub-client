import { jwtDecode, JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  role: string; // Add your custom fields here
}

export const verifyToken = (token: string): CustomJwtPayload | null => {
  return jwtDecode(token);
};
