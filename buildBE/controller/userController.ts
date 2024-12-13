import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import cloudinary from "../utils/cloudinary";

export const createUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { password, userName, email } = req.body;

    console.log("here1");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    console.log("here2", req.file);
    const { secure_url, public_id }: any = await cloudinary.uploader.upload(
      req.file.path
    );

    console.log("here3");
    const user = await userModel.create({
      password: hashed,
      userName,
      email,
      avatar: secure_url,
      avatarID: public_id,
    });

    console.log("here4");
    return res.status(201).json({
      message: "creating user",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error creating user",
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (user) {
      if (user.password === password) {
        return res.status(201).json({
          message: "error creating user",
          status: 201,
          data: user,
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "error reading user's password",
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "error reading user's email address",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error creating user",
    });
  }
};

export const readOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "reading user",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error reading user",
    });
  }
};

export const readAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "reading all user",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error reading all user",
    });
  }
};
