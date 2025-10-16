import { userModel } from "../model/user";
import { IUser, CreateUserInput, UserResult } from "@/types/user";

export const getUsers = async ( req: Request , rep : Response) => {
   try {
    const users = await userModel.find();
    return {
        success: true,
        data: users,
        message:"Users fetched successfully"
    }
   
    

   }
   catch (error){
    return{
        success: false,
        data : [],
        message: "Error fetching users"
    }
   }
}






