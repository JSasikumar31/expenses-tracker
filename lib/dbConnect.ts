import mongoose from "mongoose";

type ConnectionObject = {
	isConnected: number;
};

const connection: ConnectionObject = {
	isConnected: 0,
};

export const dbConnect = async (): Promise<void> => {
	if (connection.isConnected) {
		console.log("Already connected to database");
		return;
	}

	const dbUri = process.env.MONGODB_URL as string;

	try {
		const db = await mongoose.connect(dbUri);
		connection.isConnected = db.connections[0].readyState;
		// TODO: Remove the console logs
		console.log("Connections", db.connections);
		console.log("Connection", db.connection);
		console.log(
			"DB connection established with " +
				db.connection.host +
				":" +
				db.connection.port
		);
	} catch (error) {
		console.log("Error connecting to DB:", error);
		process.exit(1);
	}
};
