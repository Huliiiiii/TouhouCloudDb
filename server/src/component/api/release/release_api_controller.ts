import { NextFunction, Request, Response } from "express";
import { FindOptions, Op } from "sequelize";
import {
	GetQuery,
	getQueryCompiler,
	idQueryCompiler,
} from "../music_data_schema";
import { ReleaseModel } from "./release_model";

export async function getReleaseDataController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.query || !getQueryCompiler.Check(req.query)) {
			res.status(400).send({
				success: false,
				message: "Expected Value",
			});
			return;
		}
		const options = getOptions(req.query);
		const relesaeData = await ReleaseModel.findAll(options);
		res.send({
			success: true,
			data: relesaeData.length !== 0 ? relesaeData : null,
		});
	} catch (error) {
		next(error);
	}
}

function getOptions(query: GetQuery) {
	if ("id" in query) {
		const options: FindOptions<ReleaseModel> = {
			where: {
				id: query.id,
			},
		};
		return options;
	} else if (idQueryCompiler.Check(query.keyword)) {
		const options: FindOptions<ReleaseModel> = {
			where: {
				[Op.or]: {
					title: { [Op.substring]: query.keyword },
					id: query.keyword,
				},
			},
		};
		return options;
	} else {
		const options: FindOptions<ReleaseModel> = {
			where: {
				title: { [Op.substring]: query.keyword },
			},
		};
		return options;
	}
}
