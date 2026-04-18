import { useForm } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Report } from '@/features/reports/schemas/report.schema'

interface ReportDetailProps {
	report: Report
	onStatusChange: (status: string, moderationNotes?: string) => Promise<void>
}

interface ModerationFormValues {
	moderation_notes: string
}

export function ReportDetail({ report, onStatusChange }: ReportDetailProps) {
	const { register, handleSubmit, watch } = useForm<ModerationFormValues>({
		defaultValues: { moderation_notes: report.moderation_notes ?? '' },
	})
	const moderationNotes = watch('moderation_notes')

	return (
		<div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
			<Card>
				<CardHeader><CardTitle>Report detail</CardTitle></CardHeader>
				<CardContent className="space-y-4 text-sm text-kumo-default">
					<div><p className="font-medium">Reason</p><p>{report.reason}</p></div>
					<div><p className="font-medium">Entity</p><p>{report.entity_type} / {report.entity_id}</p></div>
					<div><p className="font-medium">Reporter</p><p>{report.reporter_id}</p></div>
					{report.reviewed_by ? <div><p className="font-medium">Reviewed by</p><p>{report.reviewed_by}</p></div> : null}
					{report.resolved_at ? <div><p className="font-medium">Resolved at</p><p>{report.resolved_at}</p></div> : null}
				</CardContent>
			</Card>
			<Card>
				<CardHeader><CardTitle>Moderation</CardTitle></CardHeader>
				<CardContent className="space-y-4">
					<Badge variant={report.status === 'resolved' ? 'default' : report.status === 'dismissed' ? 'destructive' : 'secondary'}>{report.status}</Badge>
					<form className="space-y-4" onSubmit={handleSubmit(() => onStatusChange('reviewed', moderationNotes || undefined))}>
						<div className="space-y-2">
							<Label htmlFor="moderation_notes">Moderation notes</Label>
							<Textarea id="moderation_notes" {...register('moderation_notes')} />
						</div>
						<div className="flex flex-col gap-2">
							<Button type="submit" variant="secondary">Mark reviewed</Button>
							<Button type="button" variant="outline" onClick={() => void onStatusChange('resolved', moderationNotes || undefined)}>Resolve</Button>
							<Button type="button" variant="destructive" onClick={() => void onStatusChange('dismissed', moderationNotes || undefined)}>Dismiss</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
