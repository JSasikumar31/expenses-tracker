"use client";

import { createBudgetSchema } from "@/app/data/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
	createBudget,
	getBudgetById,
	updateBudget,
} from "@/lib/actions/budget";
import { useEffect } from "react";

const BudgetForm: React.FC<{
	onClose: () => void;
	reFetch: () => void;
	type: "create" | "update";
	id?: string;
}> = ({ onClose, reFetch, type, id }) => {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof createBudgetSchema>>({
		resolver: zodResolver(createBudgetSchema),
	});

	useEffect(() => {
		if (type === "update" && id) {
			const fetchExistingBudget = async () => {
				try {
					const data = await getBudgetById(id);
					form.reset(data);
				} catch (error) {
					const errorMessage =
						error instanceof Error
							? error.message
							: "An unknown error occurred";

					toast({
						title: "Error",
						description: errorMessage,
						variant: "destructive",
					});
				}
			};
			fetchExistingBudget();
		}
	}, [id, type, form]);

	const onSubmit = async (data: z.infer<typeof createBudgetSchema>) => {
		try {
			if (type === "create") {
				await createBudget(data);
				toast({
					title: "Success",
					description: "Budget created successfully",
				});
			} else if (type === "update" && id) {
				await updateBudget(id, data);
				toast({
					title: "Success",
					description: "Budget updated successfully",
				});
			}
			onClose();
			reFetch();
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unknown error occurred";

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5 py-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Enter name"
									{...field}
									className="input-field"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Enter amount"
									{...field}
									className="input-field"
									type="number"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Dropdown
									onChangeHandler={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="month"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Month : e.g. 1 for January, 2 for February"
									{...field}
									className="input-field"
									type="number"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="year"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Year : e.g. 2024, 2025"
									{...field}
									className="input-field"
									type="number"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={form.formState.isSubmitting}
					type="submit"
					className="w-fit"
				>
					{form.formState.isSubmitting
						? "Saving..."
						: type === "create"
						? "Create"
						: "Update"}
				</Button>
			</form>
		</Form>
	);
};

export default BudgetForm;
