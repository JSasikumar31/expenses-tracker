import mongoose, { Document, Schema } from "mongoose";

export interface IBudget extends Document {
	amount: number;
	category: Schema.Types.ObjectId;
	year: number;
	month: number;
}

const BudgetSchema = new Schema<IBudget>({
	amount: {
		type: Number,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	year: {
		type: Number,
		default: new Date().getFullYear(),
	},
	month: {
		type: Number,
		default: new Date().getMonth() + 1,
	},
});

const Budget =
	mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
