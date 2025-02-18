import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
	amount: number;
	description: string;
	date: Date;
	budget: Schema.Types.ObjectId;
}

const TransactionSchema = new Schema<ITransaction>({
	amount: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: new Date(),
	},
	budget: {
		type: Schema.Types.ObjectId,
		ref: "Budget",
		required: true,
	},
});

const Transaction =
	mongoose.models.Transaction ||
	mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
