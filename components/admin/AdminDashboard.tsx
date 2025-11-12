'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { schema } from '@/components/data-table';
import { z } from 'zod';

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
		<div className="min-h-screen bg-background">
			<SidebarProvider
				style={
					{
						'--sidebar-width': 'calc(var(--spacing) * 72)',
						'--header-height': 'calc(var(--spacing) * 12)',
					} as React.CSSProperties
				}
			>
				<AppSidebar variant="inset" />
				<SidebarInset className="bg-background">
					<SiteHeader />
					<div className="flex flex-1 flex-col bg-background">
						<div className="@container/main flex flex-1 flex-col gap-2">
							<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
								<SectionCards />
								<div className="px-4 lg:px-6">
									<ChartAreaInteractive />
								</div>
								<div className="px-4 lg:px-6">
									{loading ? (
										<div className="flex items-center justify-center p-8">
											<p className="text-muted-foreground">
												Loading users...
											</p>
										</div>
									) : error ? (
										<div className="flex items-center justify-center p-8">
											<p className="text-destructive">
												Error: {error}
											</p>
										</div>
									) : (
										<DataTable data={data} />
									)}
								</div>
							</div>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
