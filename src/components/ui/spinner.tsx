import { cn } from '@/lib/utils'

export function Spinner({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
	const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }
	return (
		<svg className={cn('animate-spin text-kumo-brand', sizes[size], className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
			<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
		</svg>
	)
}

export function PageLoader({ message }: { message?: string }) {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
			<Spinner size="lg" />
			{message ? <p className="text-sm text-kumo-subtle animate-in fade-in duration-500">{message}</p> : null}
		</div>
	)
}
