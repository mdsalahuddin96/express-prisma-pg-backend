import { Request } from "express";

interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}