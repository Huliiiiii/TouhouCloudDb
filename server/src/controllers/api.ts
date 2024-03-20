/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, Response } from "express";
import { FindAttributeOptions, FindOptions, Model, ModelCtor, Op } from "sequelize";
import ArtistModel from "database/models/artist";
import ReleaseModel from "database/models/release";
import SongModel from "database/models/song";

interface MyGetReq extends Request {
	query: {
		type?: string;
		id?: string;
		keyword?: string;
	};
}

export async function GET(req: MyGetReq, res: Response): Promise<any> {
	try {
		if (!req.query.type && typeof req.query.type !== "string") {
			return res.status(400).end();
		}
		return await DataFetcher(req, res, req.query.type);
	} catch (error: unknown) {
		// TODO:Handle error
		return res.status(400).send(error);
	}
}

const isNumberString = function (str: string): boolean {
	if (typeof str !== "string") return false;
	return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
};

async function DataFetcher(req: MyGetReq, res: Response, type: string) {
	if ((req.query.id && req.query.keyword) ?? (!req.query.id && !req.query.keyword) ?? !isNumberString(req.query.id ?? "null")) {
		return res.status(400).end();
	}
	let model: ModelCtor<Model<any, any>>;
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
			return res.status(400).end();
	}
	if (req.query.id) {
		return await UseID(req, res, model);
	} else if (req.query.keyword) {
		return await UseKW(req, res, model);
	} else {
		return res.status(400).end();
	}
}

// 好像这样不是正确的写type方式
interface option extends FindOptions<any> {
	attributes: FindAttributeOptions;
	where: {
		is_deleted?: "0" | "1";
		id?: string | string[] | object;
		[Op.or]?: object[];
		name?: object;
		name_variant?: object;
		title?: object;
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
async function UseID(req: Request, res: Response, model: ModelCtor<Model<any, any>>) {
	const id = req.query.id as string;
	const id_arr = id.split(",");
	const option = { ...default_option };
	option.where = { ...option.where, id: id_arr.length === 1 ? id : { [Op.in]: id_arr } };
	const result = await model.findAll(option);
	return res.send(result);
}

async function UseKW(req: Request, res: Response, model: ModelCtor<Model<any, any>>) {
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
			// 这种情况不应该发生，但还是做了错误处理
			return res.status(400).end();
	}
	const result = await model.findAll(option);
	return res.send(result);
}

// interface MyPostReq extends Request {
// 	body: any;
// }

export function postSong(req: Request, res: Response) {
	res.send(req.body);
}
export function postArtist() {
	return;
}
export function postRelease() {
	return;
}
