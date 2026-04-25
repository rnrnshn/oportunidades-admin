import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { EditorShell } from '@/components/layout/editor-shell'
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
import { MediaField } from '@/features/uploads/components/media-field'

interface OpportunityFormProps {
	opportunity?: Opportunity
	onSubmit: (input: OpportunityFormInput) => Promise<void>
	onVerify?: () => Promise<void>
	onReject?: () => Promise<void>
	onDeactivate?: () => Promise<void>
}

export function OpportunityForm({ opportunity, onSubmit, onVerify, onReject, onDeactivate }: OpportunityFormProps) {
	const [heroImageUrl, setHeroImageUrl] = useState(opportunity?.hero_image_url ?? '')
	const [providerLogoUrl, setProviderLogoUrl] = useState(opportunity?.provider_logo_url ?? '')
	const [coverageText, setCoverageText] = useState((opportunity?.coverage ?? []).join(', '))
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<OpportunityFormInput>({
		defaultValues: {
			title: opportunity?.title ?? '',
			type: opportunity?.type ?? 'bolsa',
			entity_name: opportunity?.entity_name ?? '',
			description: opportunity?.description ?? '',
			requirements: opportunity?.requirements ?? '',
			deadline: opportunity?.deadline ?? '',
			apply_url: opportunity?.apply_url ?? '',
			external_url_label: opportunity?.external_url_label ?? '',
			country: opportunity?.country ?? 'Mozambique',
			location: opportunity?.location ?? '',
			is_remote: opportunity?.is_remote ?? false,
			language: opportunity?.language ?? '',
			area: opportunity?.area ?? '',
			hero_image_url: opportunity?.hero_image_url ?? '',
			provider_logo_url: opportunity?.provider_logo_url ?? '',
			amount_min: opportunity?.amount_min ?? '',
			amount_max: opportunity?.amount_max ?? '',
			amount_currency: opportunity?.amount_currency ?? 'MZN',
			coverage: opportunity?.coverage ?? [],
			eligibility: opportunity?.eligibility ?? '',
			application_process: opportunity?.application_process ?? '',
			degree_level: opportunity?.degree_level ?? '',
			program_area: opportunity?.program_area ?? '',
		},
	})

	const typeValue = watch('type') || 'bolsa'
	const isScholarship = typeValue === 'bolsa'

	function submit(values: OpportunityFormInput) {
		return onSubmit({
			...values,
			hero_image_url: heroImageUrl || values.hero_image_url,
			provider_logo_url: providerLogoUrl || values.provider_logo_url,
			coverage: coverageText.split(',').map((item) => item.trim()).filter(Boolean),
		})
	}

	return (
		<EditorShell
			title={opportunity ? 'Edit opportunity' : 'Create opportunity'}
			sidebar={
				<>
					<Card size="sm">
						<CardHeader><CardTitle>Status</CardTitle></CardHeader>
						<CardContent className="space-y-3 text-sm text-kumo-subtle">
							<p className="font-medium text-kumo-default">{opportunity?.verified ? 'Verified' : 'Pending verification'}</p>
							<Button disabled={isSubmitting} type="submit" form="opportunity-form">{opportunity ? 'Save changes' : 'Create opportunity'}</Button>
							{opportunity && onVerify ? <Button type="button" variant="secondary" onClick={() => void onVerify()}>Verify</Button> : null}
							{opportunity && onReject ? <Button type="button" variant="outline" onClick={() => void onReject()}>Reject</Button> : null}
							{opportunity && onDeactivate ? <Button type="button" variant="destructive" onClick={() => void onDeactivate()}>Deactivate</Button> : null}
						</CardContent>
					</Card>
					{isScholarship ? <MediaField folder="opportunities" label="Hero image" value={heroImageUrl} onChange={setHeroImageUrl} /> : null}
					{isScholarship ? <MediaField folder="opportunities" label="Provider logo" value={providerLogoUrl} onChange={setProviderLogoUrl} /> : null}
				</>
			}
		>
				<form id="opportunity-form" className="space-y-4" onSubmit={handleSubmit(submit)}>
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
						<Label htmlFor="requirements">Requirements</Label>
						<Textarea id="requirements" {...register('requirements')} />
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2"><Label htmlFor="deadline">Deadline (RFC3339)</Label><Input id="deadline" placeholder="2026-05-15T00:00:00Z" {...register('deadline')} /></div>
						<div className="space-y-2"><Label htmlFor="apply_url">Apply URL</Label><Input id="apply_url" {...register('apply_url')} /></div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="country">Country</Label>
						<Input id="country" {...register('country')} />
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2"><Label htmlFor="language">Language</Label><Input id="language" {...register('language')} /></div>
						<div className="space-y-2"><Label htmlFor="area">Area</Label><Input id="area" {...register('area')} /></div>
					</div>
					{isScholarship ? (
						<Card size="sm">
							<CardHeader><CardTitle>Scholarship details</CardTitle></CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-4 md:grid-cols-3">
									<div className="space-y-2"><Label htmlFor="amount_min">Amount min</Label><Input id="amount_min" {...register('amount_min')} /></div>
									<div className="space-y-2"><Label htmlFor="amount_max">Amount max</Label><Input id="amount_max" {...register('amount_max')} /></div>
									<div className="space-y-2"><Label htmlFor="amount_currency">Currency</Label><Input id="amount_currency" {...register('amount_currency')} /></div>
								</div>
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2"><Label htmlFor="degree_level">Degree level</Label><Input id="degree_level" {...register('degree_level')} /></div>
									<div className="space-y-2"><Label htmlFor="program_area">Program area</Label><Input id="program_area" {...register('program_area')} /></div>
								</div>
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" {...register('location')} /></div>
									<div className="space-y-2"><Label htmlFor="external_url_label">CTA label</Label><Input id="external_url_label" placeholder="Visit scholarship website" {...register('external_url_label')} /></div>
								</div>
								<label className="flex items-center gap-2 text-sm text-kumo-default"><input type="checkbox" {...register('is_remote')} /> Remote/online</label>
								<div className="space-y-2"><Label htmlFor="coverage">Coverage</Label><Input id="coverage" value={coverageText} onChange={(event) => setCoverageText(event.target.value)} placeholder="Propina, Alojamento, Bolsa mensal" /></div>
								<div className="space-y-2"><Label htmlFor="eligibility">Eligibility</Label><Textarea id="eligibility" {...register('eligibility')} /></div>
								<div className="space-y-2"><Label htmlFor="application_process">Application process</Label><Textarea id="application_process" {...register('application_process')} /></div>
							</CardContent>
						</Card>
					) : null}
				</form>
		</EditorShell>
	)
}
