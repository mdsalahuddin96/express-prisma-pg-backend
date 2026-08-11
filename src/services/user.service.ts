
import prisma from "../lib/prisma";


interface UserDataType{
  name: string;
  image?:string;
  role?: "User"|"Organizer"|"Admin"
}

export const getUser=async()=>{
  const users = await prisma.user.findMany();
  return users;
}
export const getUserById=async(userId:string)=>{
  const user=await prisma.user.findUnique({
    where:{
      id:userId
    }
  })
  return user;
}
export const updateUser = async (userData:UserDataType,userId:string) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userData,
    });
    return updateUser;
  } catch (error) {
    console.log(error);
    return error
  }
};

export const deleteUser=async(userId:string)=>{
  try{
   const deletedUser=await prisma.user.update({
      where:{
        id:userId?.toString()
      },
      data:{
        deletedAt:new Date()
      },
    })
    return deletedUser;
  }
  catch (error) {
    console.log(error);
    return error
  }
}