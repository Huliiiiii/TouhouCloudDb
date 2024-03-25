import { NextFunction, Request, Response } from "express";
import { userCompiler } from "./auth_schema";
import { UserModel } from "./user_model";

export async function login(req: Request, res: Response, next: NextFunction) {
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

		if (!user) {
			res.send({ success: false, message: "User not found" });
		} else if (password !== user.password) {
			res.send({ success: false, message: "Incorrect password" });
		} else {
			res.cookie("test", "123");
			res.send({ success: true });
		}
	} catch (error) {
		next(error);
	}
}
