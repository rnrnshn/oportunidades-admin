import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type DivProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: DivProps) {
	return <div className={cn('rounded-xl border border-slate-200 bg-white shadow-sm', className)} {...props} />
}

export function CardHeader({ className, ...props }: DivProps) {
	return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: DivProps) {
	return <div className={cn('text-lg font-semibold text-slate-900', className)} {...props} />
}

export function CardDescription({ className, ...props }: DivProps) {
	return <div className={cn('text-sm text-slate-500', className)} {...props} />
}

export function CardContent({ className, ...props }: DivProps) {
	return <div className={cn('p-6 pt-0', className)} {...props} />
}
