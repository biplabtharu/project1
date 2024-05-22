import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;
export const PORT = process.env.PORT;
