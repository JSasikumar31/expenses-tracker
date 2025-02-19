import { MongooseCache } from "@/types/global";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (typeof global !== "undefined") {
	const cached: MongooseCache = global.mongoose || {
		conn: null,
		promise: null,
	};

	if (!global.mongoose) {
		global.mongoose = cached;
	}
}

async function dbConnect(): Promise<mongoose.Connection> {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI, {
				bufferCommands: false,
			})
			.then((mongooseInstance) => mongooseInstance.connection);
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;
