import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import type { JSONContent } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
	Bold,
	Heading2,
	Heading3,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Pilcrow,
	Quote,
	Underline as UnderlineIcon,
} from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
	label: string
	placeholder?: string
	html: string
	json?: JSONContent | null
	onChange: (payload: { html: string; json: JSONContent }) => void
}

export function RichTextEditor({ label, placeholder, html, json, onChange }: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [2, 3] },
			}),
			Underline,
			Link.configure({ openOnClick: false }),
			Placeholder.configure({ placeholder: placeholder ?? 'Start writing...' }),
		],
		content: json ?? html,
		onUpdate: ({ editor: currentEditor }) => onChange({ html: currentEditor.getHTML(), json: currentEditor.getJSON() }),
		editorProps: {
			attributes: {
				class:
					'min-h-64 rounded-b-md bg-kumo-base px-4 py-3 text-sm text-kumo-default focus:outline-none editor-content',
			},
		},
	})

	useEffect(() => {
		if (!editor) {
			return
		}
		const nextContent = json ?? html ?? '<p></p>'
		editor.commands.setContent(nextContent, { emitUpdate: false })
	}, [editor, html, json])

	function setLink() {
		if (!editor) {
			return
		}
		const previousUrl = editor.getAttributes('link').href as string | undefined
		const url = window.prompt('Enter URL', previousUrl ?? '')
		if (url === null) {
			return
		}
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
	}

	const controls = [
		{ icon: Pilcrow, active: editor?.isActive('paragraph'), onClick: () => editor?.chain().focus().setParagraph().run(), label: 'Paragraph' },
		{ icon: Heading2, active: editor?.isActive('heading', { level: 2 }), onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), label: 'Heading 2' },
		{ icon: Heading3, active: editor?.isActive('heading', { level: 3 }), onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), label: 'Heading 3' },
		{ icon: Bold, active: editor?.isActive('bold'), onClick: () => editor?.chain().focus().toggleBold().run(), label: 'Bold' },
		{ icon: Italic, active: editor?.isActive('italic'), onClick: () => editor?.chain().focus().toggleItalic().run(), label: 'Italic' },
		{ icon: UnderlineIcon, active: editor?.isActive('underline'), onClick: () => editor?.chain().focus().toggleUnderline().run(), label: 'Underline' },
		{ icon: List, active: editor?.isActive('bulletList'), onClick: () => editor?.chain().focus().toggleBulletList().run(), label: 'Bullet list' },
		{ icon: ListOrdered, active: editor?.isActive('orderedList'), onClick: () => editor?.chain().focus().toggleOrderedList().run(), label: 'Ordered list' },
		{ icon: Quote, active: editor?.isActive('blockquote'), onClick: () => editor?.chain().focus().toggleBlockquote().run(), label: 'Quote' },
		{ icon: LinkIcon, active: editor?.isActive('link'), onClick: setLink, label: 'Link' },
	]

	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			<div className="rounded-md border bg-kumo-base">
				<div className="flex flex-wrap gap-2 border-b border-kumo-line bg-kumo-tint/50 p-2">
					{controls.map(({ icon: Icon, active, onClick, label: controlLabel }) => (
						<Button
							key={controlLabel}
							type="button"
							variant={active ? 'default' : 'ghost'}
							size="sm"
							onClick={onClick}
						>
							<Icon className={cn('h-4 w-4', active ? 'text-white' : 'text-kumo-default')} />
						</Button>
					))}
				</div>
				<EditorContent editor={editor} />
			</div>
		</div>
	)
}
