import { Request, Response } from "express";
import { Model, ModelCtor, Op } from "sequelize";
import ArtistModel from "../database/models/artist";
import ReleaseModel from "../database/models/release";
import SongModel from "../database/models/song";
import logger from "../utils/logger";

export const API = async function (req: Request, res: Response) {
	try {
		if (!req.query.type) return null;
		const type = typeof req.query.type !== "string" ? req.query.type.toString() : req.query.type;
		DataFetcher(req, res, type);
	} catch (error) {
		logger.error(error);
		// TODO:Handle error
	}
};

const isNumber = function (str: any) {
	// 0-9, 英文逗号，空格
	const regex = /^[0-9,\s]+$/;
	return regex.test(str);
};

const reqHandler = function (req: Request, res: Response) {
	if ((!req.query.id && !req.query.keyword) || (req.query.id && req.query.keyword) || (req.query.id && !isNumber(req.query.id))) {
		res.status(400).end();
		return false;
	} else return true;
};

// prettier-ignore

// TODO: 将sequelize.define改为更新并适配ts的extends Model方法
// 见：https://sequelize.org/master/manual/model-basics.html
const UseID = async function (req: Request, res: Response, model: ModelCtor<Model>) {
	const id = req.query.id!.toString().split(",");
	const result = await model.findAll({
		where: {
			id: id.length === 1 ? { [Op.eq]: id } : { [Op.in]: id },
			is_deleted: "0",
		},
	});
	res.send(result);
};

const UseKW = async function (req: Request, res: Response, model: ModelCtor<Model>) {
	const kw = req.query.keyword;
	let result;
	let query;
	switch (model) {
		case ArtistModel:
			query = {
				where: {
					name: {
						[Op.substring]: kw,
					},
					is_deleted: "0",
				},
			};
			break;
		case ReleaseModel:
			query = {
				where: {
					title: {
						[Op.substring]: kw,
					},
					is_deleted: "0",
				},
			};
			break;
		case SongModel:
			query = {
				where: {
					name: {
						[Op.substring]: kw,
					},
					is_deleted: "0",
				},
			};
			break;
		default:
			break;
	}
	if (!isNaN(kw as any)) {
		result = await model.findAll({
			where: {
				id: kw,
				is_deleted: "0",
			},
		});
	} else {
		result = await model.findAll(query);
	}
	res.send(result);
};

const DataFetcher = async function (req: Request, res: Response, type: string) {
	if (reqHandler(req, res) === false) return null;
	let model;
	switch (type) {
		case "song":
			model = SongModel;
			break;
		case "artist":
			model = ArtistModel;
			break;
		case "release":
			model = ReleaseModel;
			break;
		default:
			return null;
	}
	if (req.query.id) {
		UseID(req, res, model);
	} else if (req.query.keyword) {
		UseKW(req, res, model);
	}
};
