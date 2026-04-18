import { Link } from '@tanstack/react-router'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Session } from '@/features/mentorship/schemas/session.schema'
import { cn } from '@/lib/utils'

interface SessionsTableProps {
	sessions: Session[]
}

export function SessionsTable({ sessions }: SessionsTableProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Mentorship sessions</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Requester</TableHead>
							<TableHead>Mentor</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sessions.map((session) => (
							<TableRow key={session.id}>
								<TableCell className="font-mono text-xs">{session.requester_id}</TableCell>
								<TableCell className="font-mono text-xs">{session.mentor_id}</TableCell>
								<TableCell>
									<Badge variant={session.status === 'accepted' || session.status === 'completed' ? 'default' : session.status === 'rejected' || session.status === 'cancelled' ? 'destructive' : 'secondary'}>
										{session.status}
									</Badge>
								</TableCell>
								<TableCell>
									<Link className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))} to="/mentorship/sessions/$id" params={{ id: session.id }}>Manage</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
