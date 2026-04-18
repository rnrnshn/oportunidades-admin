import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface SearchToolbarProps {
	placeholder: string
	value: string
	onChange: (value: string) => void
	filters?: React.ReactNode
}

export function SearchToolbar({ placeholder, value, onChange, filters }: SearchToolbarProps) {
	return (
		<div className="space-y-4">
			<div className="relative max-w-sm">
				<Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kumo-subtle" />
				<Input className="ps-9" placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
			</div>
			{filters ? <div className="grid gap-3 md:grid-cols-3">{filters}</div> : null}
		</div>
	)
}
