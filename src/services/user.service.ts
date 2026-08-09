import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createUser = async (req:Request, res:Response) => {
  const userData = req.body;
  try {
    const data = await prisma.user.create({data:userData});
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
