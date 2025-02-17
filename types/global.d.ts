import mongoose from "mongoose";

export interface MongooseCache {
	conn: mongoose.Connection | null;
	promise: Promise<mongoose.Connection> | null;
}

declare global {
	var mongoose: MongooseCache | undefined;
}
