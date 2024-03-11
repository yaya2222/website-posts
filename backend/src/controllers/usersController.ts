import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";


export const getAuthenticatedUser:RequestHandler=async(req,res,next)=>{
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        next(error)
    }
}


interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !password || !email) {
      throw createHttpError(400, "Parameters missing");
    }

    const exsitingUsername = await UserModel.findOne({ username }).exec();
    if (exsitingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Plase choose a different or log in instead."
      );
    }

    const exsitingEmail = await UserModel.findOne({ email }).exec();
    if (exsitingEmail) {
      throw createHttpError(
        409,
        "Email already taken. Plase choose a different or log in instead."
      );
    }

    const passwordHashed = bcrypt.hashSync(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }
    const user = await UserModel.findOne({ username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    
    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        throw createHttpError(401, "Invalid credentials");
    }
    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};


export const logout:RequestHandler = (req,res,next)=>{
    req.session.destroy(error=>{
        if(error) next(error)
        else res.sendStatus(200)
    })
}