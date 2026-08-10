
import prisma from "../lib/prisma";

// export const createUser = async (req: Request, res: Response) => {
//   const userData = req.body;
//   try {
//     const newUser = await prisma.user.create({ data: userData });
//     res.status(201).json({
//       success: true,
//       message: "User Created Successfully",
//       data: newUser,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

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