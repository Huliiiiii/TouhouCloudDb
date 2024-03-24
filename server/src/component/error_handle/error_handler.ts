import { logger } from "component/logger/logger";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

function errorHandlingFunction(
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	logger.error(err);
	if (err instanceof Error) {
		return res.status(500).json({ success: false, message: err.message });
	} else {
		return res.status(500).json({ success: false, message: err });
	}
}

export const errorHandler: ErrorRequestHandler = errorHandlingFunction;
