import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/page-header'
import { SearchToolbar } from '@/components/layout/search-toolbar'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Opportunity } from '@/features/opportunities/schemas/opportunity.schema'
import { cn } from '@/lib/utils'

interface OpportunitiesTableProps {
	opportunities: Opportunity[]
	filters: {
		q: string
		type: string
		active: string
	}
	onFilterChange: (key: 'q' | 'type' | 'active', value: string) => void
}

export function OpportunitiesTable({ opportunities, filters, onFilterChange }: OpportunitiesTableProps) {
	return (
		<div className="space-y-4">
			<PageHeader actions={<Link className={cn(buttonVariants())} to="/opportunities/new">Add New</Link>} title="Opportunities" />
			<SearchToolbar
				placeholder="Search opportunities..."
				value={filters.q}
				onChange={(value) => onFilterChange('q', value)}
				filters={
					<>
					<Select value={filters.type || 'all-types'} onValueChange={(value) => onFilterChange('type', value === 'all-types' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All types" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-types">All types</SelectItem>
							<SelectItem value="bolsa">Bolsa</SelectItem>
							<SelectItem value="estagio">Estágio</SelectItem>
							<SelectItem value="emprego">Emprego</SelectItem>
						</SelectContent>
					</Select>
					<Select value={filters.active || 'all-active'} onValueChange={(value) => onFilterChange('active', value === 'all-active' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All activity" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-active">All activity</SelectItem>
							<SelectItem value="true">Active</SelectItem>
							<SelectItem value="false">Inactive</SelectItem>
						</SelectContent>
					</Select>
					</>
				}
			/>
				<div className="overflow-x-auto rounded-md border bg-kumo-base">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{opportunities.map((opportunity) => (
							<TableRow key={opportunity.id}>
								<TableCell className="font-medium">{opportunity.title}</TableCell>
								<TableCell>{opportunity.type}</TableCell>
								<TableCell>
									<Badge variant={opportunity.is_active ? 'default' : 'outline'}>
										{opportunity.is_active ? 'active' : 'inactive'}
									</Badge>
								</TableCell>
								<TableCell>
									<Link className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))} to="/opportunities/$id" params={{ id: opportunity.id }}>Edit</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				</div>
		</div>
	)
}
