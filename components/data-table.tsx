'use client';

import * as React from 'react';
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
	IconCircleCheckFilled,
	IconDotsVertical,
	IconGripVertical,
	IconLayoutColumns,
	IconLoader,
	IconTrendingUp,
} from '@tabler/icons-react';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { toast } from 'sonner';
import { z } from 'zod';

import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const schema = z.object({
	id: z.string(),
	username: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	email: z.string(),
	country: z.string(),
	age: z.number(),
	gender: z.string(),
	login_count: z.number(),
	created_at: z.number(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
	const { attributes, listeners } = useSortable({
		id,
	});

	return (
		<Button
			{...attributes}
			{...listeners}
			variant="ghost"
			size="icon"
			className="text-muted-foreground size-7 hover:bg-transparent"
		>
			<IconGripVertical className="text-muted-foreground size-3" />
			<span className="sr-only">Drag to reorder</span>
		</Button>
	);
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
	{
		id: 'drag',
		header: () => null,
		cell: ({ row }) => <DragHandle id={row.original.id} />,
		size: 50,
		minSize: 40,
		enableResizing: false,
	},
	{
		id: 'select',
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
		size: 50,
		minSize: 40,
		enableResizing: false,
	},
	{
		accessorKey: 'username',
		header: 'Username',
		cell: ({ row }) => {
			return <TableCellViewer item={row.original} />;
		},
		enableHiding: false,
		size: 150,
		minSize: 120,
	},
	{
		accessorKey: 'first_name',
		header: 'First Name',
		cell: ({ row }) => (
			<div
				className="min-w-[100px] max-w-[150px] truncate"
				title={row.original.first_name}
			>
				{row.original.first_name}
			</div>
		),
		size: 130,
		minSize: 100,
	},
	{
		accessorKey: 'last_name',
		header: 'Last Name',
		cell: ({ row }) => (
			<div
				className="min-w-[100px] max-w-[150px] truncate"
				title={row.original.last_name}
			>
				{row.original.last_name}
			</div>
		),
		size: 130,
		minSize: 100,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => (
			<div
				className="min-w-[180px] max-w-[280px] truncate"
				title={row.original.email}
			>
				{row.original.email}
			</div>
		),
		size: 250,
		minSize: 180,
	},
	{
		accessorKey: 'country',
		header: 'Country',
		cell: ({ row }) => (
			<div
				className="min-w-[100px] max-w-[150px] truncate"
				title={row.original.country}
			>
				{row.original.country}
			</div>
		),
		size: 130,
		minSize: 100,
	},
	{
		accessorKey: 'age',
		header: () => <div className="text-right">Age</div>,
		cell: ({ row }) => (
			<div className="text-right min-w-[60px]">{row.original.age}</div>
		),
		size: 80,
		minSize: 60,
	},
	{
		accessorKey: 'gender',
		header: 'Gender',
		cell: ({ row }) => (
			<div
				className="min-w-[80px] max-w-[120px] truncate"
				title={row.original.gender}
			>
				{row.original.gender}
			</div>
		),
		size: 100,
		minSize: 80,
	},
	{
		accessorKey: 'login_count',
		header: () => <div className="text-right">Login Count</div>,
		cell: ({ row }) => (
			<div className="text-right min-w-[100px]">
				{row.original.login_count}
			</div>
		),
		size: 120,
		minSize: 100,
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
		cell: ({ row }) => {
			const date = new Date(row.original.created_at);
			return (
				<div
					className="min-w-[120px] max-w-[180px] truncate"
					title={date.toLocaleString()}
				>
					{date.toLocaleDateString()}
				</div>
			);
		},
		size: 150,
		minSize: 120,
	},
	{
		id: 'actions',
		cell: () => (
			<div className="flex items-center justify-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
							size="icon"
						>
							<IconDotsVertical />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-32">
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Make a copy</DropdownMenuItem>
						<DropdownMenuItem>Favorite</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant="destructive">
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
		size: 60,
		minSize: 50,
		enableResizing: false,
	},
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id,
	});

	return (
		<TableRow
			data-state={row.getIsSelected() && 'selected'}
			data-dragging={isDragging}
			ref={setNodeRef}
			className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 hover:bg-muted/50 transition-colors"
			style={{
				transform: CSS.Transform.toString(transform),
				transition: transition,
			}}
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={cell.id}
					className="px-4 py-3 text-sm"
					style={{
						width:
							cell.column.getSize() !== 150
								? cell.column.getSize()
								: undefined,
						minWidth: cell.column.columnDef.minSize,
					}}
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
}

export function DataTable({
	data: initialData,
}: {
	data: z.infer<typeof schema>[];
}) {
	const [data, setData] = React.useState(() => initialData);
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const sortableId = React.useId();
	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);

	const dataIds = React.useMemo<UniqueIdentifier[]>(
		() => data?.map(({ id }) => id) || [],
		[data],
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
		getRowId: (row) => row.id,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setData((data) => {
				const oldIndex = dataIds.indexOf(active.id);
				const newIndex = dataIds.indexOf(over.id);
				return arrayMove(data, oldIndex, newIndex);
			});
		}
	}

	return (
		<Tabs
			defaultValue="outline"
			className="w-full flex-col justify-start gap-6"
		>
			<div className="flex items-center justify-between px-4 lg:px-6">
				<Label htmlFor="view-selector" className="sr-only">
					View
				</Label>
				<Select defaultValue="outline">
					<SelectTrigger
						className="flex w-fit @4xl/main:hidden"
						size="sm"
						id="view-selector"
					>
						<SelectValue placeholder="Select a view" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="outline">Outline</SelectItem>
					</SelectContent>
				</Select>
				<TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
					<TabsTrigger value="outline">Outline</TabsTrigger>
				</TabsList>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<IconLayoutColumns />
								<span className="hidden lg:inline">
									Customize Columns
								</span>
								<span className="lg:hidden">Columns</span>
								<IconChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !==
											'undefined' && column.getCanHide(),
								)
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<TabsContent
				value="outline"
				className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
			>
				<div className="overflow-x-auto rounded-lg border">
					<DndContext
						collisionDetection={closestCenter}
						modifiers={[restrictToVerticalAxis]}
						onDragEnd={handleDragEnd}
						sensors={sensors}
						id={sortableId}
					>
						<Table>
							<TableHeader className="bg-muted sticky top-0 z-10">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead
													key={header.id}
													colSpan={header.colSpan}
													className="px-4 py-3 text-sm font-semibold whitespace-nowrap"
													style={{
														width:
															header.getSize() !==
															150
																? header.getSize()
																: undefined,
														minWidth:
															header.column
																.columnDef
																.minSize,
													}}
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column
																	.columnDef
																	.header,
																header.getContext(),
														  )}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									<SortableContext
										items={dataIds}
										strategy={verticalListSortingStrategy}
									>
										{table.getRowModel().rows.map((row) => (
											<DraggableRow
												key={row.id}
												row={row}
											/>
										))}
									</SortableContext>
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center"
										>
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</DndContext>
				</div>
				<div className="flex items-center justify-between px-4">
					<div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
						{table.getFilteredSelectedRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} row(s)
						selected.
					</div>
					<div className="flex w-full items-center gap-8 lg:w-fit">
						<div className="hidden items-center gap-2 lg:flex">
							<Label
								htmlFor="rows-per-page"
								className="text-sm font-medium"
							>
								Rows per page
							</Label>
							<Select
								value={`${
									table.getState().pagination.pageSize
								}`}
								onValueChange={(value) => {
									table.setPageSize(Number(value));
								}}
							>
								<SelectTrigger
									size="sm"
									className="w-20"
									id="rows-per-page"
								>
									<SelectValue
										placeholder={
											table.getState().pagination.pageSize
										}
									/>
								</SelectTrigger>
								<SelectContent side="top">
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<SelectItem
											key={pageSize}
											value={`${pageSize}`}
										>
											{pageSize}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex w-fit items-center justify-center text-sm font-medium">
							Page {table.getState().pagination.pageIndex + 1} of{' '}
							{table.getPageCount()}
						</div>
						<div className="ml-auto flex items-center gap-2 lg:ml-0">
							<Button
								variant="outline"
								className="hidden h-8 w-8 p-0 lg:flex"
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}
							>
								<span className="sr-only">
									Go to first page
								</span>
								<IconChevronsLeft />
							</Button>
							<Button
								variant="outline"
								className="size-8"
								size="icon"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								<span className="sr-only">
									Go to previous page
								</span>
								<IconChevronLeft />
							</Button>
							<Button
								variant="outline"
								className="size-8"
								size="icon"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								<span className="sr-only">Go to next page</span>
								<IconChevronRight />
							</Button>
							<Button
								variant="outline"
								className="hidden size-8 lg:flex"
								size="icon"
								onClick={() =>
									table.setPageIndex(table.getPageCount() - 1)
								}
								disabled={!table.getCanNextPage()}
							>
								<span className="sr-only">Go to last page</span>
								<IconChevronsRight />
							</Button>
						</div>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--primary)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--primary)',
	},
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
	const isMobile = useIsMobile();

	return (
		<Drawer direction={isMobile ? 'bottom' : 'right'}>
			<DrawerTrigger asChild>
				<Button
					variant="link"
					className="text-foreground w-fit px-0 text-left hover:text-green-600 transition-colors"
				>
					<div
						className="min-w-[100px] max-w-[200px] truncate"
						title={item.username}
					>
						{item.username}
					</div>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="gap-1">
					<DrawerTitle>
						{item.first_name} {item.last_name}
					</DrawerTitle>
					<DrawerDescription>
						User details and information
					</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
					<form className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							<Label htmlFor="username">Username</Label>
							<Input id="username" defaultValue={item.username} />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-3">
								<Label htmlFor="first_name">First Name</Label>
								<Input
									id="first_name"
									defaultValue={item.first_name}
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Label htmlFor="last_name">Last Name</Label>
								<Input
									id="last_name"
									defaultValue={item.last_name}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								defaultValue={item.email}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="country">Country</Label>
							<Input id="country" defaultValue={item.country} />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-3">
								<Label htmlFor="age">Age</Label>
								<Input
									id="age"
									type="number"
									defaultValue={item.age.toString()}
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Label htmlFor="gender">Gender</Label>
								<Input id="gender" defaultValue={item.gender} />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-3">
								<Label htmlFor="login_count">Login Count</Label>
								<Input
									id="login_count"
									type="number"
									defaultValue={item.login_count.toString()}
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Label htmlFor="created_at">Created At</Label>
								<Input
									id="created_at"
									defaultValue={new Date(
										item.created_at,
									).toLocaleString()}
									disabled
								/>
							</div>
						</div>
					</form>
				</div>
				<DrawerFooter>
					<Button>Submit</Button>
					<DrawerClose asChild>
						<Button variant="outline">Done</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
