import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
	return (
		<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
			<div className="relative h-40">
				<Skeleton className="h-full w-full rounded-lg" />
			</div>
			<div className="relative h-52">
				<Skeleton className="h-full w-full rounded-lg" />
			</div>
			<div className="relative h-52">
				<Skeleton className="h-full w-full rounded-lg" />
			</div>
			<div className="relative h-52">
				<Skeleton className="h-full w-full rounded-lg" />
			</div>
		</div>
	);
};

export default CardSkeleton;
