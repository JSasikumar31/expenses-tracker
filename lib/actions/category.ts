"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import { handleError } from "@/lib/utils";

export const createCategory = async (name: string) => {
	try {
		await dbConnect();
		const existingCategory = await Category.findOne({ name });
		if (existingCategory) {
			throw new Error("Category already exists");
		}

		const category = await Category.create({ name });
		return JSON.parse(JSON.stringify(category));
	} catch (error) {
		handleError(error);
	}
};

export const getCategories = async () => {
	try {
		await dbConnect();
		const categories = await Category.find();
		return JSON.parse(JSON.stringify(categories));
	} catch (error) {
		handleError(error);
	}
};

export const deleteCategory = async (id: string) => {
	try {
		await dbConnect();
		const category = await Category.findByIdAndDelete(id);
		if (!category) {
			throw new Error("Category not found");
		}

		return JSON.parse(JSON.stringify(category));
	} catch (error) {
		handleError(error);
	}
};

export const updateCategory = async (id: string, name: string) => {
    try {
        await dbConnect();
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            throw new Error("Category not found");
        }

        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        handleError(error);
    }
};