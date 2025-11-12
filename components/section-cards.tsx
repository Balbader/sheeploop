import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { schema } from '@/components/data-table';
import { z } from 'zod';

type UserData = z.infer<typeof schema>;

interface SectionCardsProps {
	data?: UserData[];
}

export function SectionCards({ data = [] }: SectionCardsProps) {
	const metrics = useMemo(() => {
		const totalUsers = data.length;

		// Calculate new users in the last 30 days
		const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
		const newUsersLast30Days = data.filter(
			(user) => user.created_at >= thirtyDaysAgo,
		).length;

		// Calculate previous 30 days for comparison (30-60 days ago)
		const sixtyDaysAgo = Date.now() - 60 * 24 * 60 * 60 * 1000;
		const newUsersPrevious30Days = data.filter(
			(user) =>
				user.created_at >= sixtyDaysAgo &&
				user.created_at < thirtyDaysAgo,
		).length;

		// Calculate growth rate
		const growthRate =
			newUsersPrevious30Days > 0
				? ((newUsersLast30Days - newUsersPrevious30Days) /
						newUsersPrevious30Days) *
				  100
				: newUsersLast30Days > 0
				? 100
				: 0;

		// Active users (users with login_count > 0)
		const activeUsers = data.filter((user) => user.login_count > 0).length;
		const activeUsersPercentage =
			totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

		// Total login count
		const totalLogins = data.reduce(
			(sum, user) => sum + user.login_count,
			0,
		);

		return {
			totalUsers,
			newUsersLast30Days,
			growthRate,
			activeUsers,
			activeUsersPercentage,
			totalLogins,
			isGrowthPositive: growthRate >= 0,
		};
	}, [data]);

	const formatNumber = (num: number) => {
		return new Intl.NumberFormat('en-US').format(num);
	};

	const formatPercentage = (num: number) => {
		return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
	};

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>Total Users</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{formatNumber(metrics.totalUsers)}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
						>
							<IconTrendingUp className="text-green-600 dark:text-green-400" />
							All time
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-400">
						Registered users{' '}
						<IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
					</div>
					<div className="text-muted-foreground">
						Total registered accounts
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>New Users (30 days)</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{formatNumber(metrics.newUsersLast30Days)}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className={
								metrics.isGrowthPositive
									? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400'
									: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400'
							}
						>
							{metrics.isGrowthPositive ? (
								<IconTrendingUp className="text-green-600 dark:text-green-400" />
							) : (
								<IconTrendingDown className="text-red-600 dark:text-red-400" />
							)}
							{formatPercentage(metrics.growthRate)}
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div
						className={`line-clamp-1 flex gap-2 font-medium ${
							metrics.isGrowthPositive
								? 'text-green-700 dark:text-green-400'
								: 'text-red-700 dark:text-red-400'
						}`}
					>
						{metrics.isGrowthPositive
							? 'Growth in new signups'
							: 'Decline in new signups'}{' '}
						{metrics.isGrowthPositive ? (
							<IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
						) : (
							<IconTrendingDown className="size-4 text-red-600 dark:text-red-400" />
						)}
					</div>
					<div className="text-muted-foreground">
						Compared to previous 30 days
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>Active Users</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{formatNumber(metrics.activeUsers)}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
						>
							<IconTrendingUp className="text-green-600 dark:text-green-400" />
							{metrics.activeUsersPercentage.toFixed(1)}%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-400">
						Users with logins{' '}
						<IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
					</div>
					<div className="text-muted-foreground">
						{formatNumber(metrics.totalLogins)} total logins
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>Growth Rate</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{formatPercentage(metrics.growthRate)}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className={
								metrics.isGrowthPositive
									? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400'
									: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400'
							}
						>
							{metrics.isGrowthPositive ? (
								<IconTrendingUp className="text-green-600 dark:text-green-400" />
							) : (
								<IconTrendingDown className="text-red-600 dark:text-red-400" />
							)}
							{formatPercentage(metrics.growthRate)}
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div
						className={`line-clamp-1 flex gap-2 font-medium ${
							metrics.isGrowthPositive
								? 'text-green-700 dark:text-green-400'
								: 'text-red-700 dark:text-red-400'
						}`}
					>
						{metrics.isGrowthPositive
							? 'User growth trend'
							: 'Declining trend'}{' '}
						{metrics.isGrowthPositive ? (
							<IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
						) : (
							<IconTrendingDown className="size-4 text-red-600 dark:text-red-400" />
						)}
					</div>
					<div className="text-muted-foreground">
						Monthly user acquisition rate
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
