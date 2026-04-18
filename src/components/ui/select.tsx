import type { SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, children, ...props }: SelectProps) {
	return (
		<select
			className={cn(
				'h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		>
			{children}
		</select>
	)
}
