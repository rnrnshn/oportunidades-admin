import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { EditorShell } from '@/components/layout/editor-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { ArticleFormInput } from '@/features/articles/api/articles'
import type { Article } from '@/features/articles/schemas/article.schema'
import { confirmUpload, presignUpload, uploadFile } from '@/features/uploads/api/uploads'

interface ArticleFormProps {
	article?: Article
	onSubmit: (input: ArticleFormInput) => Promise<void>
	onPublish?: () => Promise<void>
	onUnpublish?: () => Promise<void>
	onArchive?: () => Promise<void>
}

	export function ArticleForm({ article, onSubmit, onPublish, onUnpublish, onArchive }: ArticleFormProps) {
	const [coverUrl, setCoverUrl] = useState('')
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<ArticleFormInput>({
		defaultValues: {
			title: article?.title ?? '',
			type: article?.type ?? 'news',
			excerpt: '',
			content: '',
			cover_image_url: '',
		},
	})

	async function handleFileChange(file: File | null) {
		if (!file) return
		const presigned = await presignUpload(file.name, 'articles')
		await uploadFile(presigned.upload_url, file)
		const confirmed = await confirmUpload(presigned.path)
		setCoverUrl(confirmed.public_url)
	}

	const typeValue = watch('type') || 'news'

	return (
		<EditorShell title={article ? 'Edit article' : 'Create article'}>
				<form className="space-y-4" onSubmit={handleSubmit(async (values) => onSubmit({ ...values, cover_image_url: coverUrl || values.cover_image_url }))}>
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input id="title" {...register('title')} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="type">Type</Label>
						<Select value={typeValue} onValueChange={(value) => setValue('type', value ?? 'news')}>
							<SelectTrigger id="type" className="w-full">
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="news">News</SelectItem>
								<SelectItem value="guide">Guide</SelectItem>
								<SelectItem value="editorial">Editorial</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="excerpt">Excerpt</Label>
						<Textarea id="excerpt" {...register('excerpt')} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<Textarea id="content" {...register('content')} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="cover">Cover image</Label>
						<Input id="cover" type="file" accept="image/*" onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)} />
						{coverUrl ? <p className="text-xs text-slate-500">Uploaded: {coverUrl}</p> : null}
					</div>
					<div className="flex flex-wrap gap-3">
						<Button disabled={isSubmitting} type="submit">{article ? 'Save changes' : 'Create article'}</Button>
						{article && onPublish ? <Button type="button" variant="secondary" onClick={() => void onPublish()}>Publish</Button> : null}
						{article && onUnpublish ? <Button type="button" variant="outline" onClick={() => void onUnpublish()}>Unpublish</Button> : null}
						{article && onArchive ? <Button type="button" variant="destructive" onClick={() => void onArchive()}>Archive</Button> : null}
					</div>
				</form>
		</EditorShell>
	)
}
