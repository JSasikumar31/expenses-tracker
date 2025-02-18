"use client";

import { createTransactionSchema } from "@/app/data/validator";
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
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
	createTransaction,
	getTransactionById,
	updateTransaction,
} from "@/lib/actions/transaction";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const TransactionForm: React.FC<{
	id: string;
	type: "create" | "update";
	reFetch: () => void;
}> = ({ id, type, reFetch }) => {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof createTransactionSchema>>({
		resolver: zodResolver(createTransactionSchema),
	});

	useEffect(() => {
		if (type === "update") {
			const fetchTransaction = async () => {
				try {
					const transaction = await getTransactionById(id);
					form.reset(transaction);
				} catch (error) {
					toast({
						title: "Error",
						description: "Failed to fetch transaction data",
						variant: "destructive",
					});
				}
			};

			fetchTransaction();
		}
	}, [id, type, toast]);

	const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
		try {
			if (type === "create") {
				await createTransaction({ ...data, budget: id });
				toast({
					title: "Success",
					description: "Transaction created successfully",
				});
			} else if (type === "update") {
				await updateTransaction(id, data);
				toast({
					title: "Success",
					description: "Transaction updated successfully",
				});
			}

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
				className="flex flex-col gap-4 p-4 border rounded-lg bg-background shadow-sm"
			>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Transaction description"
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
					name="date"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value &&
														"text-muted-foreground"
												)}
											>
												{field.value ? (
													<span>
														{field.value instanceof
														Date
															? field.value.toLocaleDateString()
															: "Invalid Date"}
													</span>
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() ||
												date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
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
						? "Create Transaction"
						: "Update Transaction"}
				</Button>
			</form>
		</Form>
	);
};

export default TransactionForm;
