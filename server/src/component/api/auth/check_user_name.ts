import { NextFunction, Request, Response } from "express";
import { FindOptions } from "sequelize";
import { usernameCompiler } from "./auth_schema";
import { UserModel } from "./user_model";

export async function checkUsername(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// 前端具有相应的处理逻辑，所以当发来不合法的数据时返回错误
	if (!usernameCompiler.Check(req.body)) {
		res.send({
			success: false,
			message:
				usernameCompiler.Errors(req.body).First()?.message ?? "Invalid Request",
		});
		return;
	}
	const username = req.body.username;
	const options: FindOptions<UserModel> = {
		where: {
			username: username,
		},
		attributes: ["id"],
		raw: true,
	};
	await UserModel.findOne(options)
		.then((user) => {
			res.send({
				success: true,
				hasUser: user !== null,
			});
		})
		.catch((error) => next(error));
}
