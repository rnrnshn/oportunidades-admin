import { AlertTriangle, Inbox, LoaderCircle } from 'lucide-react'

export function LoadingState({ message }: { message: string }) {
	return (
		<div className="flex min-h-[240px] items-center justify-center rounded-md border bg-kumo-base text-kumo-subtle">
			<div className="flex items-center gap-2 text-sm">
				<LoaderCircle className="h-4 w-4 animate-spin" />
				{message}
			</div>
		</div>
	)
}

export function EmptyState({ message }: { message: string }) {
	return (
		<div className="flex min-h-[240px] flex-col items-center justify-center rounded-md border bg-kumo-base text-center text-kumo-subtle">
			<Inbox className="mb-3 h-8 w-8" />
			<p className="text-sm">{message}</p>
		</div>
	)
}

export function ErrorState({ message }: { message: string }) {
	return (
		<div className="flex min-h-[240px] flex-col items-center justify-center rounded-md border border-kumo-danger/50 bg-kumo-danger/10 text-center">
			<AlertTriangle className="mb-3 h-8 w-8 text-kumo-danger" />
			<p className="text-sm text-kumo-danger">{message}</p>
		</div>
	)
}
