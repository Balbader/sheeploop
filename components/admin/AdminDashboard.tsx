'use client';

import { useEffect, useState } from 'react';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { schema } from '@/components/data-table';
import { z } from 'zod';
import { AdminHeader } from './AdminHeader';

type UserData = z.infer<typeof schema>;

export default function AdminDashboard() {
	const [data, setData] = useState<UserData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUsers() {
			try {
				setLoading(true);
				const response = await fetch('/api/users');
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}
				const users = await response.json();
				// Validate the data with zod schema
				const validatedUsers = z.array(schema).parse(users);
				console.log('Fetched users:', validatedUsers);
				setData(validatedUsers);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Unknown error';
				setError(errorMessage);
				console.error('Error fetching users:', err);
			} finally {
				setLoading(false);
			}
		}

		fetchUsers();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
			<div className="flex flex-1 flex-col">
				<AdminHeader />
				<div className="@container/main flex flex-1 flex-col">
					<div className="max-w-screen-xl mx-auto w-full flex flex-col gap-6 py-6 md:gap-8 md:py-8">
						{/* Stats Section */}
						<div className="px-4 sm:px-6">
							<div className="mb-4">
								<h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
									Overview
									<span className="ml-2 inline-block h-0.5 w-8 bg-green-600"></span>
								</h2>
								<p className="text-sm text-muted-foreground mt-1">
									Key metrics and insights at a glance
								</p>
							</div>
							<SectionCards />
						</div>

						{/* Chart Section */}
						<div className="px-4 sm:px-6">
							<div className="mb-4">
								<h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
									Analytics
									<span className="ml-2 inline-block h-0.5 w-8 bg-green-600"></span>
								</h2>
								<p className="text-sm text-muted-foreground mt-1">
									Track your growth and engagement trends
								</p>
							</div>
							<ChartAreaInteractive />
						</div>

						{/* Users Table Section */}
						<div className="px-4 sm:px-6">
							<div className="mb-4">
								<h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
									Users
									<span className="ml-2 inline-block h-0.5 w-8 bg-green-600"></span>
								</h2>
								<p className="text-sm text-muted-foreground mt-1">
									Manage and view all registered users
								</p>
							</div>
							{loading ? (
								<div className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border shadow-sm">
									<div className="relative">
										<div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
									</div>
									<p className="text-muted-foreground font-medium">
										Loading users...
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										Please wait while we fetch the data
									</p>
								</div>
							) : error ? (
								<div className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-destructive/20 shadow-sm">
									<div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
										<svg
											className="w-6 h-6 text-destructive"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<p className="text-destructive font-semibold">
										Error loading users
									</p>
									<p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
										{error}
									</p>
								</div>
							) : (
								<div className="bg-card rounded-xl border shadow-sm overflow-hidden">
									<DataTable data={data} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
