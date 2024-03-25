import { NextFunction, Request, Response } from "express";
import { userCompiler } from "./auth_schema";
import { UserModel } from "./user_model";

export async function register(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!userCompiler.Check(req.body)) {
			res.send({ success: false, message: "Invalid Request" });
			return;
		}
		const { username, password } = req.body;
		const user = await UserModel.findOne({
			where: {
				username: username,
			},
		});
		if (user) {
			res.send({ success: false, message: "User already exists" });
		} else {
			await UserModel.create({
				username: username,
				password: password,
			});
			res.send({ success: true });
		}
	} catch (error) {
		next(error);
	}
}
