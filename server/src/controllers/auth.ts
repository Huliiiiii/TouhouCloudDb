import { Request, Response } from "express";
import { UserModel } from "database/models/user";
export async function login(req: Request, res: Response) {
	try {
		if (!req.body.username && !req.body.password) return;
		const user = await UserModel.findOne({
			where: {
				username: req.body.username,
				password: req.body.password,
			},
		});
		if (user === null) {
			res.send(false);
		}
		res.cookie("test", "123");
		res.send(true);
	} catch (error) {}
}

export async function register(req: Request, res: Response) {
	if (!req.body.username) return;
	if (!(req.body.password && req.body.repeat_password)) return;
	if (req.body.password !== req.body.repeat_password) return;
	const user = await UserModel.findOne({
		where: {
			username: req.body.username,
		},
	});
	if (user !== null) {
		res.send({ message: "Username is already in use", success: "false" });
		return;
	}
	UserModel.create({
		username: req.body.username,
		password: req.body.password,
	});
	res.send({ success: "true" });
}

export async function checkUsername(req: Request, res: Response) {
	const user = await UserModel.findOne({
		where: {
			username: req.body.username,
		},
	});
	if (user !== null) {
		res.send({ message: "Username is already in use", success: "false" });
		return;
	} else if (user === null) {
		res.send({ message: "Username is available", success: "true" });
	}
}
