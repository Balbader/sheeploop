import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>Total Revenue</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						$1,250.00
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
						>
							<IconTrendingUp className="text-green-600 dark:text-green-400" />
							+12.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-400">
						Trending up this month{' '}
						<IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
					</div>
					<div className="text-muted-foreground">
						Visitors for the last 6 months
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>New Customers</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						1,234
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingDown />
							-20%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Down 20% this period{' '}
						<IconTrendingDown className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Acquisition needs attention
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>Active Accounts</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						45,678
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
						>
							<IconTrendingUp className="text-green-600 dark:text-green-400" />
							+12.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-400">
						Strong user retention{' '}
						<IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
					</div>
					<div className="text-muted-foreground">
						Engagement exceed targets
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
				<CardHeader>
					<CardDescription>Growth Rate</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						4.5%
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
						>
							<IconTrendingUp className="text-green-600 dark:text-green-400" />
							+4.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-400">
						Steady performance increase{' '}
						<IconTrendingUp className="size-4 text-green-600 dark:text-green-400" />
					</div>
					<div className="text-muted-foreground">
						Meets growth projections
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
