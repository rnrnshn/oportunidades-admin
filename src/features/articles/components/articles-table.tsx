import { Link } from '@tanstack/react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Article } from '@/features/articles/schemas/article.schema'

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
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Articles</CardTitle>
				</div>
				<Button asChild>
					<Link to="/articles/new">New article</Link>
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-3 md:grid-cols-3">
					<Input placeholder="Search title/content" value={filters.q} onChange={(event) => onFilterChange('q', event.target.value)} />
					<Select value={filters.type} onChange={(event) => onFilterChange('type', event.target.value)}>
						<option value="">All types</option>
						<option value="editorial">Editorial</option>
						<option value="news">News</option>
						<option value="guide">Guide</option>
					</Select>
					<Select value={filters.status} onChange={(event) => onFilterChange('status', event.target.value)}>
						<option value="">All statuses</option>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
						<option value="archived">Archived</option>
					</Select>
				</div>
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
									<Badge variant={article.status === 'published' ? 'success' : article.status === 'archived' ? 'warning' : 'secondary'}>
										{article.status}
									</Badge>
								</TableCell>
								<TableCell>
									<Button asChild size="sm" variant="outline">
										<Link to="/articles/$id" params={{ id: article.id }}>Edit</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
