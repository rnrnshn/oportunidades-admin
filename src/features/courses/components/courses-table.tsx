import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Course } from '@/features/courses/schemas/course.schema'
import type { University } from '@/features/universities/schemas/university.schema'
import { cn } from '@/lib/utils'

interface CoursesTableProps {
	courses: Course[]
	filters: { q: string; level: string; university_id: string }
	onFilterChange: (key: 'q' | 'level' | 'university_id', value: string) => void
	universities: University[]
}

export function CoursesTable({ courses, filters, onFilterChange, universities }: CoursesTableProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Courses</CardTitle>
				<Link className={cn(buttonVariants())} to="/courses/new">New course</Link>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-3 md:grid-cols-3">
					<Input placeholder="Search course" value={filters.q} onChange={(event) => onFilterChange('q', event.target.value)} />
					<Select value={filters.level || 'all-levels'} onValueChange={(value) => onFilterChange('level', value === 'all-levels' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All levels" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-levels">All levels</SelectItem>
							<SelectItem value="licenciatura">Licenciatura</SelectItem>
							<SelectItem value="mestrado">Mestrado</SelectItem>
							<SelectItem value="doutoramento">Doutoramento</SelectItem>
						</SelectContent>
					</Select>
					<Select value={filters.university_id || 'all-universities'} onValueChange={(value) => onFilterChange('university_id', value === 'all-universities' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All universities" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-universities">All universities</SelectItem>
							{universities.map((university) => (
								<SelectItem key={university.id} value={university.id}>{university.name}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Area</TableHead>
							<TableHead>Level</TableHead>
							<TableHead>Regime</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{courses.map((course) => (
							<TableRow key={course.id}>
								<TableCell className="font-medium">{course.name}</TableCell>
								<TableCell>{course.area}</TableCell>
								<TableCell>{course.level}</TableCell>
								<TableCell>{course.regime}</TableCell>
								<TableCell>
									<Link className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))} to="/courses/$id" params={{ id: course.id }}>Edit</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
