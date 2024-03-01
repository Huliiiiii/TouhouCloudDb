import sequelize from "../database/query";
import {Request, Response} from "express";

import ReleaseModel from "../database/models/release";
import SongModel from "../database/models/song"

import logger from "../utils/logger";

export const listAlbums = async function (req: Request, res: Response) {
    try {
        await sequelize.authenticate();
        const release_data = await ReleaseModel.findAll();
        const formattedDateData = await ReleaseModel.findAll({
            attributes: [[sequelize.fn('DATE_FORMAT', sequelize.col('release_date'), '%Y-%m-%d'), 'ReleaseDate']]
        });
        res.render("list_albums", {
            release_data,
            formattedDateData,
        });
    } catch (error) {
        logger.error(error);
        // TODO:Handle error
    }
};

export const listSongs = async function (req: Request, res: Response) {
    try {
        await sequelize.authenticate();
        const songList = await SongModel.findAll({
            where: {
                is_deleted: "0"
            }
        });
        res.render("list_songs", {songList});
    } catch (error) {
        logger.error(error);
        res.status(500).send("An error occurred while processing the request");
    }
};

