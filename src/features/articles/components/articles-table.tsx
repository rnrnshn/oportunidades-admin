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
import type { Article } from '@/features/articles/schemas/article.schema'
import { cn } from '@/lib/utils'

interface ArticlesTableProps {
	articles: Article[]
	filters: {
		q: string
		type: string
		status: string
	}
	onFilterChange: (key: 'q' | 'type' | 'status', value: string) => void
}

export function ArticlesTable({ articles, filters, onFilterChange }: ArticlesTableProps) {
	return (
		<div className="space-y-4">
			<PageHeader actions={<Link className={cn(buttonVariants())} to="/articles/new">Add New</Link>} title="Articles" />
			<SearchToolbar
				placeholder="Search articles..."
				value={filters.q}
				onChange={(value) => onFilterChange('q', value)}
				filters={
					<>
					<Select value={filters.type || 'all-types'} onValueChange={(value) => onFilterChange('type', value === 'all-types' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="All types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all-types">All types</SelectItem>
							<SelectItem value="editorial">Editorial</SelectItem>
							<SelectItem value="news">News</SelectItem>
							<SelectItem value="guide">Guide</SelectItem>
						</SelectContent>
					</Select>
					<Select value={filters.status || 'all-statuses'} onValueChange={(value) => onFilterChange('status', value === 'all-statuses' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="All statuses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all-statuses">All statuses</SelectItem>
							<SelectItem value="draft">Draft</SelectItem>
							<SelectItem value="published">Published</SelectItem>
							<SelectItem value="archived">Archived</SelectItem>
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
						{articles.map((article) => (
							<TableRow key={article.id}>
								<TableCell className="font-medium">{article.title}</TableCell>
								<TableCell>{article.type}</TableCell>
								<TableCell>
									<Badge variant={article.status === 'published' ? 'default' : article.status === 'archived' ? 'outline' : 'secondary'}>
										{article.status}
									</Badge>
								</TableCell>
								<TableCell>
									<Link className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))} to="/articles/$id" params={{ id: article.id }}>Edit</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				</div>
		</div>
	)
}
