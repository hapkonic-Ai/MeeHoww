import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const user = await sql`
      SELECT id, email, name, password_hash, role 
      FROM users 
      WHERE email = ${email}
    `;

    if (!user || user.length === 0) {
      return null;
    }

    const userData = user[0];
    const passwordMatch = await bcrypt.compare(
      password,
      userData.password_hash
    );

    if (!passwordMatch) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: string = "customer"
): Promise<User | null> {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    const result = await sql`
      INSERT INTO users (id, email, name, password_hash, role, created_at)
      VALUES (${userId}, ${email}, ${name}, ${passwordHash}, ${role}, NOW())
      RETURNING id, email, name, role
    `;

    if (result && result.length > 0) {
      return {
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
        role: result[0].role,
      };
    }

    return null;
  } catch (error) {
    console.error("User creation error:", error);
    return null;
  }
}
