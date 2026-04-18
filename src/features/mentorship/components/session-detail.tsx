import { useForm } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Session } from '@/features/mentorship/schemas/session.schema'

interface SessionDetailProps {
	session: Session
	onStatusChange: (status: string, scheduledAt?: string) => Promise<void>
}

interface SessionFormValues {
	scheduled_at: string
}

export function SessionDetail({ session, onStatusChange }: SessionDetailProps) {
	const { register, handleSubmit } = useForm<SessionFormValues>({
		defaultValues: {
			scheduled_at: session.scheduled_at ?? '',
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Session detail</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 text-sm text-slate-700">
				<div className="space-y-1">
					<p className="font-medium">Status</p>
					<Badge variant={session.status === 'accepted' || session.status === 'completed' ? 'default' : session.status === 'rejected' || session.status === 'cancelled' ? 'destructive' : 'secondary'}>
						{session.status}
					</Badge>
				</div>
				<div className="space-y-1">
					<p className="font-medium">Message</p>
					<p>{session.message}</p>
				</div>
				<div className="space-y-1">
					<p className="font-medium">Requester</p>
					<p className="font-mono text-xs">{session.requester_id}</p>
				</div>
				<div className="space-y-1">
					<p className="font-medium">Mentor</p>
					<p className="font-mono text-xs">{session.mentor_id}</p>
				</div>
				<form className="space-y-4" onSubmit={handleSubmit((values) => onStatusChange('accepted', values.scheduled_at || undefined))}>
					<div className="space-y-2">
						<Label htmlFor="scheduled_at">Scheduled at</Label>
						<Input id="scheduled_at" placeholder="2026-04-30T10:00:00Z" {...register('scheduled_at')} />
					</div>
					<div className="flex flex-wrap gap-3">
						<Button type="submit">Accept</Button>
						<Button type="button" variant="outline" onClick={() => void onStatusChange('completed')}>Complete</Button>
						<Button type="button" variant="secondary" onClick={() => void onStatusChange('cancelled')}>Cancel</Button>
						<Button type="button" variant="destructive" onClick={() => void onStatusChange('rejected')}>Reject</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
