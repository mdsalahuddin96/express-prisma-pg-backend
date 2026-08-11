
import prisma from "../lib/prisma";


interface UserDataType{
  name: string;
  email:string;
  password:string;
  image?:string;
  role: "User"|"Organizer"|"Admin"
}

export const getUser=async()=>{
  const users = await prisma.user.findMany();
  return users;
}
export const updateUser = async (userData:UserDataType,email:string) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: userData,
    });
    return updateUser;
  } catch (error) {
    console.log(error);
    return error
  }
};

export const deleteUser=async(email:string)=>{
  try{
   const deletedUser=await prisma.user.update({
      where:{
        email:email?.toString()
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