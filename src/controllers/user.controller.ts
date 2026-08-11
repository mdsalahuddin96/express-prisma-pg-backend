import { Request, Response } from "express";
import {
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../services/user.service";
import { AuthenticatedRequest } from "../lib/auth.types";
import prisma from "../lib/prisma";

export const get = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, role } = req.user!;
  try {
    let users;
    if (role === "Admin") {
      users = await getUser();
    } else {
      users = await getUserById(userId.toString());
    }
    res.status(200).json({
      success: true,
      message:
        role === "Admin"
          ? "Retrieve All User Successfully"
          : "User Info retrieve successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const update = async (req: AuthenticatedRequest, res: Response) => {
  const targetUserId =
    typeof req.params.id === "string" ? req.params.id.trim() : undefined;
  const { userId, role } = req.user!;
  const newData =
    role === "Admin"
      ? {
          name: req.body.name,
          image: req.body.image,
          role: req.body.role,
        }
      : {
          name: req.body.name,
          image: req.body.image,
        };
  if (!targetUserId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (role !== "Admin" && targetUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can't update other info",
      });
    }
    const updatedUser = await updateUser(
      newData,
      targetUserId?.toString() || "",
    );
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const userDelete = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, role } = req.user!;

  const targetUserId =
    typeof req.params.id === "string" ? req.params.id.trim() : undefined;

  if (!targetUserId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (role !== "Admin" && targetUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own account",
      });
    }

    const deletedUser = await deleteUser(targetUserId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
