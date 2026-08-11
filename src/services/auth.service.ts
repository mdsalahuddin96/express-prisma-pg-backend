import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  image?: string;
  role:"User"|"Organizer"|"Admin"
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterData) => {
  const { name, email, password, image,role } = userData;

  // Check existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser && existingUser.deletedAt === null) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image,
      role
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

export const loginUser = async (loginData: LoginData) => {
  const { email, password } = loginData;

  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check soft delete
  if (user.deletedAt !== null) {
    throw new Error("This account has been deleted");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    },
  };
};
