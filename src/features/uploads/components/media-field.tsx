import { ImagePlus, RefreshCcw, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { confirmUpload, presignUpload, uploadFile } from '@/features/uploads/api/uploads'

interface MediaFieldProps {
	folder: 'articles' | 'opportunities' | 'universities' | 'users'
	label: string
	value?: string
	onChange: (value: string) => void
}

export function MediaField({ folder, label, value, onChange }: MediaFieldProps) {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const [progress, setProgress] = useState(0)
	const [error, setError] = useState<string | null>(null)

	async function handleFile(file: File | null) {
		if (!file) {
			return
		}
		setError(null)
		setIsUploading(true)
		setProgress(0)
		try {
			const presigned = await presignUpload(file.name, folder)
			await uploadFile(presigned.upload_url, file, setProgress)
			const confirmed = await confirmUpload(presigned.path)
			onChange(confirmed.public_url)
		} catch (uploadError) {
			setError(uploadError instanceof Error ? uploadError.message : 'Falha no upload.')
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<Card size="sm">
			<CardHeader>
				<CardTitle>{label}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="overflow-hidden rounded-md border bg-kumo-tint/40">
					{value ? (
						<img alt={label} className="h-44 w-full object-cover" src={value} />
					) : (
						<div className="flex h-44 flex-col items-center justify-center gap-2 text-kumo-subtle">
							<ImagePlus className="h-8 w-8" />
							<span className="text-sm">No media selected</span>
						</div>
					)}
				</div>
				<input
					ref={inputRef}
					accept="image/png,image/jpeg,image/webp,image/svg+xml"
					className="hidden"
					type="file"
					onChange={(event) => void handleFile(event.target.files?.[0] ?? null)}
				/>
				<div className="flex flex-wrap gap-2">
					<Button disabled={isUploading} type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
						{value ? <RefreshCcw className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
						{value ? 'Replace' : 'Upload'}
					</Button>
					{value ? (
						<Button type="button" variant="outline" onClick={() => onChange('')}>
							<Trash2 className="h-4 w-4" />
							Remove
						</Button>
					) : null}
				</div>
				{isUploading ? (
					<div className="space-y-2">
						<div className="h-2 overflow-hidden rounded-full bg-kumo-tint">
							<div className="h-full bg-kumo-brand transition-all" style={{ width: `${progress}%` }} />
						</div>
						<p className="text-xs text-kumo-subtle">Uploading... {progress}%</p>
					</div>
				) : null}
				{value ? <p className="break-all text-xs text-kumo-subtle">{value}</p> : null}
				{error ? <p className="text-xs text-kumo-danger">{error}</p> : null}
			</CardContent>
		</Card>
	)
}
