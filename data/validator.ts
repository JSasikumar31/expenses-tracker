import z from "zod";

export const createBudgetSchema = z.object({
	name: z.string().min(1, "Name is required"),

	amount: z
		.union([
			z
				.string()
				.min(1, "Amount must be greater than 0")
				.transform((val) => {
					const num = parseFloat(val);
					if (isNaN(num) || num < 1) {
						throw new Error(
							"Amount must be a valid number greater than 0"
						);
					}
					return num;
				}),
			z.number().min(1, "Amount must be greater than 0"),
		])
		.refine((val) => typeof val === "number" && val > 0, {
			message: "Amount must be a valid number greater than 0",
		}),

	category: z
		.string({
			required_error: "Category is required",
		})
		.min(1, "Category is required"),

	year: z
		.union([
			z
				.string()
				.min(1, "Year must be greater than 0")
				.transform((val) => {
					const num = parseInt(val, 10);
					if (isNaN(num) || num < 1) {
						throw new Error(
							"Year must be a valid number greater than 0"
						);
					}
					return num;
				}),
			z.number().min(1, "Year must be greater than 0"),
		])
		.refine((val) => typeof val === "number" && val > 0, {
			message: "Year must be a valid number greater than 0",
		}),

	month: z
		.union([
			z
				.string()
				.min(1, "Month must be greater than 0")
				.transform((val) => {
					const num = parseInt(val, 10);
					if (isNaN(num) || num < 1 || num > 12) {
						throw new Error(
							"Month must be a valid number between 1 and 12"
						);
					}
					return num;
				}),
			z
				.number()
				.min(1, "Month must be greater than 0")
				.max(12, "Month must be between 1 and 12"),
		])
		.refine((val) => typeof val === "number" && val >= 1 && val <= 12, {
			message: "Month must be a valid number between 1 and 12",
		}),
});

export const createTransactionSchema = z.object({
	description: z
		.string({
			required_error: "Description is required",
		})
		.min(1, "Description is required"),
	amount: z
		.union([
			z
				.string()
				.min(1, "Amount must be greater than 0")
				.transform((val) => {
					const num = parseFloat(val);
					if (isNaN(num) || num < 1) {
						throw new Error(
							"Amount must be a valid number greater than 0"
						);
					}
					return num;
				}),
			z.number().min(1, "Amount must be greater than 0"),
		])
		.refine((val) => typeof val === "number" && val > 0, {
			message: "Amount must be a valid number greater than 0",
		}),
	date: z.date({
		required_error: "Date is required",
	}),
});
