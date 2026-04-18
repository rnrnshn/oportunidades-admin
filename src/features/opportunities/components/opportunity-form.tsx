import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { OpportunityFormInput } from '@/features/opportunities/api/opportunities'
import type { Opportunity } from '@/features/opportunities/schemas/opportunity.schema'

interface OpportunityFormProps {
	opportunity?: Opportunity
	onSubmit: (input: OpportunityFormInput) => Promise<void>
	onVerify?: () => Promise<void>
	onReject?: () => Promise<void>
	onDeactivate?: () => Promise<void>
}

export function OpportunityForm({ opportunity, onSubmit, onVerify, onReject, onDeactivate }: OpportunityFormProps) {
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<OpportunityFormInput>({
		defaultValues: {
			title: opportunity?.title ?? '',
			type: opportunity?.type ?? 'bolsa',
			entity_name: opportunity?.entity_name ?? '',
			description: '',
			country: 'Mozambique',
		},
	})

	const typeValue = watch('type') || 'bolsa'

	return (
		<Card>
			<CardHeader>
				<CardTitle>{opportunity ? 'Edit opportunity' : 'Create opportunity'}</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit((values) => onSubmit(values))}>
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input id="title" {...register('title')} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="type">Type</Label>
						<Select value={typeValue} onValueChange={(value) => setValue('type', value ?? 'bolsa')}>
							<SelectTrigger id="type" className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="bolsa">Bolsa</SelectItem>
								<SelectItem value="estagio">Estágio</SelectItem>
								<SelectItem value="emprego">Emprego</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="entity_name">Entity name</Label>
						<Input id="entity_name" {...register('entity_name')} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea id="description" {...register('description')} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="country">Country</Label>
						<Input id="country" {...register('country')} />
					</div>
					<div className="flex flex-wrap gap-3">
						<Button disabled={isSubmitting} type="submit">{opportunity ? 'Save changes' : 'Create opportunity'}</Button>
						{opportunity && onVerify ? <Button type="button" variant="secondary" onClick={() => void onVerify()}>Verify</Button> : null}
						{opportunity && onReject ? <Button type="button" variant="outline" onClick={() => void onReject()}>Reject</Button> : null}
						{opportunity && onDeactivate ? <Button type="button" variant="destructive" onClick={() => void onDeactivate()}>Deactivate</Button> : null}
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
