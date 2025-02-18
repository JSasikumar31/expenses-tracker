import mongoose, { Document, Schema } from "mongoose";

export interface IBudget extends Document {
	name: string;
	amount: number;
	category: mongoose.Schema.Types.ObjectId;
	year: number;
	month: number;
}

const BudgetSchema = new Schema<IBudget>({
	name: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	year: {
		type: Number,
		default: () => new Date().getFullYear(),
	},
	month: {
		type: Number,
		default: () => new Date().getMonth() + 1,
	},
});

const Budget =
	mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
