import { Request, Response } from "express";
import { FindAttributeOptions, FindOptions, Model, ModelCtor, Op } from "sequelize";
import ArtistModel from "../database/models/artist";
import ReleaseModel from "../database/models/release";
import SongModel from "../database/models/song";
import logger from "../utils/logger";
export { GET };

async function GET(req: Request, res: Response): Promise<void> {
	try {
		if (!req.query.type) {
			res.status(400).end();
		} else {
			const type = typeof req.query.type !== "string" ? req.query.type.toString() : req.query.type;
			DataFetcher(req, res, type);
		}
	} catch (error) {
		logger.error(error);
		// TODO:Handle error
	}
}
// TODO: No Anyscript
const isNumber = function (str: any) {
	// 0-9, 英文逗号，空格
	const regex = /^[0-9,\s]+$/;
	return regex.test(str);
};

const DataFetcher = async function (req: Request, res: Response, type: string): Promise<null | void> {
	// prettier-ignore
	if ((!req.query.id && !req.query.keyword) ||
		(req.query.id && req.query.keyword) ||
		(req.query.id && !isNumber(req.query.id))) {
			res.status(400).end();
	}
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
			res.status(400).end();
			return;
	}
	if (req.query.id) {
		UseID(req, res, model);
	} else if (req.query.keyword) {
		UseKW(req, res, model);
	}
};

// 好像这样不是正确的写type方式
interface option extends FindOptions<any> {
	attributes: FindAttributeOptions;
	where: {
		is_deleted?: "0" | "1";
		id?: string | string[] | {};
		[Op.or]?: object[];
		name?: {};
		name_variant?: {};
		title?: {};
	};
}

const default_option: option = {
	attributes: { exclude: ["create_time", "update_time"] },
	where: {
		is_deleted: "0",
	},
};

// TODO: 将sequelize.define改为更新并适配ts的extends Model方法
// 见：https://sequelize.org/master/manual/model-basics.html
const UseID = async function (req: Request, res: Response, model: ModelCtor<Model<any, any>>) {
	const id = req.query.id as string;
	const id_arr = id.split(",");
	const option = { ...default_option };
	option.where = { ...option.where, id: id_arr.length === 1 ? id : { [Op.in]: id_arr } };
	const result = await model.findAll(option);
	res.send(result);
};

const UseKW = async function (req: Request, res: Response, model: ModelCtor<Model<any, any>>) {
	const kw = req.query.keyword as string;
	const option = { ...default_option };
	if (!isNaN(Number(kw))) {
		option.where = { ...option.where, id: kw };
	}
	switch (model) {
		case ArtistModel:
			option.where = {
				...option.where,
				name: {
					[Op.substring]: kw,
				},
				name_variant: {
					[Op.substring]: kw,
				},
			};
			break;
		case ReleaseModel:
			option.where = {
				...option.where,
				title: {
					[Op.substring]: kw,
				},
			};
			break;
		case SongModel:
			option.where = {
				...option.where,
				title: {
					[Op.substring]: kw,
				},
			};
			break;
		default:
			break;
	}
	const result = await model.findAll(option);
	res.send(result);
};
