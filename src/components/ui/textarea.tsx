import type { TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({ className, ...props }: TextareaProps) {
	return (
		<textarea
			className={cn(
				'min-h-28 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	)
}
