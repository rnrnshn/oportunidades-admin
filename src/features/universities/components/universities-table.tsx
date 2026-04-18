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
import type { University } from '@/features/universities/schemas/university.schema'
import { cn } from '@/lib/utils'

interface UniversitiesTableProps {
	filters: { q: string; type: string; verified: string }
	onFilterChange: (key: 'q' | 'type' | 'verified', value: string) => void
	universities: University[]
}

export function UniversitiesTable({ filters, onFilterChange, universities }: UniversitiesTableProps) {
	return (
		<div className="space-y-4">
			<PageHeader actions={<Link className={cn(buttonVariants())} to="/universities/new">Add New</Link>} title="Universities" />
			<SearchToolbar
				placeholder="Search universities..."
				value={filters.q}
				onChange={(value) => onFilterChange('q', value)}
				filters={
					<>
					<Select value={filters.type || 'all-types'} onValueChange={(value) => onFilterChange('type', value === 'all-types' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All types" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-types">All types</SelectItem>
							<SelectItem value="publica">Publica</SelectItem>
							<SelectItem value="privada">Privada</SelectItem>
							<SelectItem value="instituto">Instituto</SelectItem>
							<SelectItem value="academia">Academia</SelectItem>
						</SelectContent>
					</Select>
					<Select value={filters.verified || 'all-verified'} onValueChange={(value) => onFilterChange('verified', value === 'all-verified' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All verification" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-verified">All verification</SelectItem>
							<SelectItem value="true">Verified</SelectItem>
							<SelectItem value="false">Unverified</SelectItem>
						</SelectContent>
					</Select>
					</>
				}
			/>
				<div className="overflow-x-auto rounded-md border bg-kumo-base">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Province</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{universities.map((university) => (
							<TableRow key={university.id}>
								<TableCell className="font-medium">{university.name}</TableCell>
								<TableCell>{university.type}</TableCell>
								<TableCell>{university.province}</TableCell>
								<TableCell>
									<Badge variant={university.verified ? 'default' : 'outline'}>
										{university.verified ? 'verified' : 'pending'}
									</Badge>
								</TableCell>
								<TableCell>
									<Link className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))} to="/universities/$id" params={{ id: university.id }}>Edit</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				</div>
		</div>
	)
}
