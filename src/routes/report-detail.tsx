import { useParams } from '@tanstack/react-router'

import { LoadingState } from '@/components/ui/state'
import { ReportDetail } from '@/features/reports/components/report-detail'
import { useReport, useUpdateReportStatus } from '@/features/reports/hooks/use-reports'

export function ReportDetailPage() {
	const { id } = useParams({ from: '/reports/$id' })
	const reportQuery = useReport(id)
	const updateStatus = useUpdateReportStatus()

	if (reportQuery.isLoading) {
		return <LoadingState />
	}

	if (!reportQuery.data) {
		return <p className="text-sm text-red-600">Report not found.</p>
	}

	return <ReportDetail report={reportQuery.data} onStatusChange={(status, moderationNotes) => updateStatus.mutateAsync({ id, status, moderationNotes }).then(() => undefined)} />
}
