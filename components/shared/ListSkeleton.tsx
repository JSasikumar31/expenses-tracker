import { Skeleton } from "../ui/skeleton";

export default function ListSkeleton() {
	return (
		<div className="w-full flex flex-col gap-2">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-12 w-full" />
			<Skeleton className="h-12 w-full" />
			<Skeleton className="h-12 w-full" />
		</div>
	);
}
