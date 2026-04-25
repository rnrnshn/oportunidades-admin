import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { EditorShell } from '@/components/layout/editor-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { ArticleFormInput } from '@/features/articles/api/articles'
import { RichTextEditor } from '@/features/articles/components/rich-text-editor'
import type { Article } from '@/features/articles/schemas/article.schema'
import { MediaField } from '@/features/uploads/components/media-field'

interface ArticleFormProps {
	article?: Article
	onSubmit: (input: ArticleFormInput) => Promise<void>
	onPublish?: () => Promise<void>
	onUnpublish?: () => Promise<void>
	onArchive?: () => Promise<void>
}

export function ArticleForm({ article, onSubmit, onPublish, onUnpublish, onArchive }: ArticleFormProps) {
	const [coverUrl, setCoverUrl] = useState(article?.cover_image_url ?? '')
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<ArticleFormInput>({
		defaultValues: {
			title: article?.title ?? '',
			type: article?.type ?? 'news',
			excerpt: article?.excerpt ?? '',
			content: article?.content ?? '',
			content_json: article?.content_json,
			cover_image_url: article?.cover_image_url ?? '',
			source_name: article?.source_name ?? '',
			source_url: article?.source_url ?? '',
			seo_title: article?.seo_title ?? '',
			seo_description: article?.seo_description ?? '',
			is_featured: article?.is_featured ?? false,
		},
	})

	const typeValue = watch('type') || 'news'
	const contentValue = watch('content') || ''
	const contentJsonValue = watch('content_json') as Record<string, unknown> | undefined
	const featuredValue = watch('is_featured') ?? false

	return (
		<EditorShell
			title={article ? 'Edit article' : 'Create article'}
			sidebar={
				<>
					<Card size="sm">
						<CardHeader><CardTitle>Status</CardTitle></CardHeader>
						<CardContent className="space-y-3 text-sm text-kumo-subtle">
							<p className="font-medium text-kumo-default">{article?.status ?? 'draft'}</p>
							<div className="space-y-2">
								<Label htmlFor="article-type">Type</Label>
								<Select value={typeValue} onValueChange={(value) => setValue('type', value ?? 'news')}>
									<SelectTrigger id="article-type" className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
									<SelectContent>
										<SelectItem value="news">News</SelectItem>
										<SelectItem value="guide">Guide</SelectItem>
										<SelectItem value="editorial">Editorial</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Button disabled={isSubmitting} form="article-form" type="submit">{article ? 'Save changes' : 'Create article'}</Button>
								{article && onPublish ? <Button type="button" variant="secondary" onClick={() => void onPublish()}>Publish</Button> : null}
								{article && onUnpublish ? <Button type="button" variant="outline" onClick={() => void onUnpublish()}>Unpublish</Button> : null}
								{article && onArchive ? <Button type="button" variant="destructive" onClick={() => void onArchive()}>Archive</Button> : null}
							</div>
						</CardContent>
					</Card>
					<MediaField folder="articles" label="Cover image" value={coverUrl} onChange={setCoverUrl} />
					<Card size="sm">
						<CardHeader><CardTitle>Metadata</CardTitle></CardHeader>
						<CardContent className="space-y-3 text-sm text-kumo-subtle">
							<div><p className="font-medium text-kumo-default">Featured</p><p>{featuredValue ? 'Yes' : 'No'}</p></div>
							<div><p className="font-medium text-kumo-default">Cover</p><p className="break-all">{coverUrl || 'Not uploaded yet'}</p></div>
						</CardContent>
					</Card>
				</>
			}
		>
			<form
				id="article-form"
				className="space-y-4"
				onSubmit={handleSubmit(async (values) => onSubmit({ ...values, cover_image_url: coverUrl || values.cover_image_url }))}
			>
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input id="title" {...register('title')} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="excerpt">Excerpt</Label>
					<Textarea id="excerpt" {...register('excerpt')} />
				</div>
				<RichTextEditor
					label="Content"
					placeholder="Write the article body..."
					html={contentValue}
					json={contentJsonValue as never}
					onChange={({ html, json }) => {
						setValue('content', html)
						setValue('content_json', json)
					}}
				/>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="source_name">Source name</Label>
						<Input id="source_name" {...register('source_name')} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="source_url">Source URL</Label>
						<Input id="source_url" {...register('source_url')} />
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="seo_title">SEO title</Label>
					<Input id="seo_title" {...register('seo_title')} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="seo_description">SEO description</Label>
					<Textarea id="seo_description" {...register('seo_description')} />
				</div>
			</form>
		</EditorShell>
	)
}
