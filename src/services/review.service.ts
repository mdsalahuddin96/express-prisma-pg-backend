import { Request, Response } from "express";
import prisma from "../lib/prisma";

interface ReviewDataType {
  userId: string;
  eventId: string;
  rating: number;
  comment?: string;
  deletedAt?: Date;
}
export const createReview = async (reviewData: ReviewDataType) => {
  try {
    const newReview = await prisma.review.create({
      data: reviewData,
    });
    return newReview;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllReview = async () => {
  try {
    const reviews = await prisma.review.findMany();
    return reviews;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateReview = async (newData: ReviewDataType, id: string) => {
  try {
    const updatedReview = await prisma.review.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
    return updatedReview;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteReview = async (id: string) => {
  try {
    const deletedReview = await prisma.review.update({
      where: {
        id: id?.toString(),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedReview;
  } catch (error) {
    console.log(error);
    return error;
  }
};
