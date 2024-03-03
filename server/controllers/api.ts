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
			return null;
	}
	if (req.query.id) {
		UseID(req, res, model);
	} else if (req.query.keyword) {
		UseKW(req, res, model);
	}
};

// 好像这样不是正确的写type方式
interface options extends FindOptions<any> {
	attributes: FindAttributeOptions;
	where: {
		is_deleted: "0" | "1";
		[Op.or]: object[];
	};
}

// TODO: 想一个比query更好的变量名
var options: options = {
	attributes: { exclude: ["create_time", "update_time"] },
	where: {
		is_deleted: "0",
		[Op.or]: [],
	},
};
const WHERE_OR = (...option: object[]) => {
	options.where[Op.or]!.push(...option);
};
// TODO: 将sequelize.define改为更新并适配ts的extends Model方法
// 见：https://sequelize.org/master/manual/model-basics.html
const UseID = async function (req: Request, res: Response, model: ModelCtor<Model>) {
	const id = req.query.id!.toString().split(",");
	WHERE_OR({ id: id.length === 1 ? { [Op.eq]: id } : { [Op.in]: id } });
	const result = await model.findAll(options);
	res.send(result);
};

const UseKW = async function (req: Request, res: Response, model: ModelCtor<Model>) {
	var kw = req.query.keyword;
	let result: object;
	if (isNaN(Number(kw)) === false) {
		WHERE_OR({ id: { [Op.eq]: kw } });
	}
	switch (model) {
		case ArtistModel:
			WHERE_OR(
				{
					name: {
						[Op.substring]: kw,
					},
				},
				{
					name_variant: {
						[Op.substring]: kw,
					},
				},
			);
			break;
		case ReleaseModel:
			WHERE_OR({
				title: {
					[Op.substring]: kw,
				},
			});
			break;
		case SongModel:
			WHERE_OR({
				title: {
					[Op.substring]: kw,
				},
			});
			break;
		default:
			break;
	}
	result = await model.findAll(options);
	res.send(result);
};
