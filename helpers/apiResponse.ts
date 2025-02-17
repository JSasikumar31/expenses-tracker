import { ErrorResponse, SuccessResponse } from "@/types/apiResponse";

export function createErrorResponse(
	message: string,
	errorDetails?: string
): ErrorResponse {
	return {
		success: false,
		message,
		errorDetails,
	};
}

export function createSuccessResponse<T>(
	message: string,
	data: T
): SuccessResponse<T> {
	return {
		success: true,
		message,
		data,
	};
}
