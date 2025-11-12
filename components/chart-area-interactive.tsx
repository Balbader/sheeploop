'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { schema } from '@/components/data-table';
import { z } from 'zod';

export const description = 'An interactive area chart';

type UserData = z.infer<typeof schema>;

interface ChartAreaInteractiveProps {
	data?: UserData[];
}

const chartConfig = {
	users: {
		label: 'Users',
	},
	registrations: {
		label: 'New Registrations',
		color: 'hsl(142, 76%, 36%)', // green-600
	},
} satisfies ChartConfig;

export function ChartAreaInteractive({ data = [] }: ChartAreaInteractiveProps) {
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = React.useState('90d');

	React.useEffect(() => {
		if (isMobile) {
			setTimeRange('7d');
		}
	}, [isMobile]);

	// Transform user data into chart format
	const chartData = useMemo(() => {
		if (data.length === 0) {
			return [];
		}

		// Group users by date
		const dateMap = new Map<string, number>();

		data.forEach((user) => {
			const date = new Date(user.created_at);
			const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
			dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
		});

		// Convert to array and sort by date
		const chartDataArray = Array.from(dateMap.entries())
			.map(([date, count]) => ({
				date,
				registrations: count,
			}))
			.sort((a, b) => a.date.localeCompare(b.date));

		return chartDataArray;
	}, [data]);

	const filteredData = useMemo(() => {
		if (chartData.length === 0) {
			return [];
		}

		const now = new Date();
		let daysToSubtract = 90;
		if (timeRange === '30d') {
			daysToSubtract = 30;
		} else if (timeRange === '7d') {
			daysToSubtract = 7;
		}

		const startDate = new Date(now);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		startDate.setHours(0, 0, 0, 0);

		// Filter data within the time range
		const filtered = chartData.filter((item) => {
			const itemDate = new Date(item.date);
			itemDate.setHours(0, 0, 0, 0);
			return itemDate >= startDate;
		});

		// Fill in missing dates with 0 to create a continuous timeline
		if (filtered.length === 0) {
			return [];
		}

		const filledData: Array<{ date: string; registrations: number }> = [];
		const dataMap = new Map(
			filtered.map((item) => [item.date, item.registrations]),
		);

		for (
			let d = new Date(startDate);
			d <= now;
			d.setDate(d.getDate() + 1)
		) {
			const dateKey = d.toISOString().split('T')[0];
			filledData.push({
				date: dateKey,
				registrations: dataMap.get(dateKey) || 0,
			});
		}

		return filledData;
	}, [chartData, timeRange]);

	const totalRegistrations = useMemo(() => {
		return filteredData.reduce((sum, item) => sum + item.registrations, 0);
	}, [filteredData]);

	return (
		<Card className="@container/card transition-all hover:shadow-md hover:-translate-y-0.5">
			<CardHeader>
				<CardTitle>User Registrations</CardTitle>
				<CardDescription>
					<span className="hidden @[540px]/card:block">
						{totalRegistrations} new users in selected period
					</span>
					<span className="@[540px]/card:hidden">
						{totalRegistrations} new users
					</span>
				</CardDescription>
				<CardAction>
					<ToggleGroup
						type="single"
						value={timeRange}
						onValueChange={setTimeRange}
						variant="outline"
						className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
					>
						<ToggleGroupItem value="90d">
							Last 3 months
						</ToggleGroupItem>
						<ToggleGroupItem value="30d">
							Last 30 days
						</ToggleGroupItem>
						<ToggleGroupItem value="7d">
							Last 7 days
						</ToggleGroupItem>
					</ToggleGroup>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger
							className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
							size="sm"
							aria-label="Select a value"
						>
							<SelectValue placeholder="Last 3 months" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem value="90d" className="rounded-lg">
								Last 3 months
							</SelectItem>
							<SelectItem value="30d" className="rounded-lg">
								Last 30 days
							</SelectItem>
							<SelectItem value="7d" className="rounded-lg">
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				{filteredData.length === 0 ? (
					<div className="flex items-center justify-center h-[250px] text-muted-foreground">
						<div className="text-center">
							<p className="text-sm font-medium">
								No data available
							</p>
							<p className="text-xs mt-1">
								User registration data will appear here
							</p>
						</div>
					</div>
				) : (
					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-[250px] w-full"
					>
						<AreaChart data={filteredData}>
							<defs>
								<linearGradient
									id="fillRegistrations"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="var(--color-registrations)"
										stopOpacity={1.0}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-registrations)"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={(value) => {
									const date = new Date(value);
									return date.toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									});
								}}
							/>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={(value) => {
											return new Date(
												value,
											).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
											});
										}}
										indicator="dot"
									/>
								}
							/>
							<Area
								dataKey="registrations"
								type="natural"
								fill="url(#fillRegistrations)"
								stroke="var(--color-registrations)"
								strokeWidth={2}
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
