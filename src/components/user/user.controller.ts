import { Request, Response } from "express";
export const getProfileData = async (req: Request, res: Response) => {
  return res.send({ name: "harshal" });
};
