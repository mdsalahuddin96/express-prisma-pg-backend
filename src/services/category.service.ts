
import prisma from "../lib/prisma";

interface CategoryDataType{
  name:        string;
  description?: string;
}
export const createCategory = async (categoryData:CategoryDataType) => {
  try {
    const newCategory=await prisma.category.create({data:categoryData})
    return newCategory;
  } catch (error) {
    console.error(error);

    return error
  }
};
export const getAllCategory = async () => {
  try {
    const allCategory = await prisma.category.findMany();
    return allCategory;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateCategory = async (newData:CategoryDataType,id:string) => {
  
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
    return updatedCategory;
  } catch (error) {
    console.log(error);
    return error
  }
};

export const deleteCategory=async(id:string)=>{
  
  try{
    const deletedCategory=await prisma.category.update({
      where:{
        id:id?.toString()
      },
      data:{
        deletedAt:new Date()
      },
    })
    return deletedCategory;
  }
  catch (error) {
    console.log(error);
    return error
  }
}