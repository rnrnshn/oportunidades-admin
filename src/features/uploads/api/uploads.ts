import { apiRequest } from '@/lib/api-client'

interface PresignPayload {
	path: string
	upload_url: string
	token?: string
	public_url: string
}

interface ConfirmPayload {
	path: string
	public_url: string
}

export async function presignUpload(filename: string, folder: 'articles' | 'opportunities' | 'universities' | 'users') {
	return apiRequest<PresignPayload>('/v1/uploads/presign', {
		method: 'POST',
		body: JSON.stringify({ filename, content_type: 'image/png', folder }),
	})
}

export async function uploadFile(uploadUrl: string, file: File) {
	const response = await fetch(uploadUrl, {
		method: 'PUT',
		headers: { 'Content-Type': file.type },
		body: file,
	})
	if (!response.ok) {
		throw new Error('Falha ao carregar ficheiro.')
	}
}

export async function confirmUpload(path: string) {
	return apiRequest<ConfirmPayload>('/v1/uploads/confirm', {
		method: 'POST',
		body: JSON.stringify({ path }),
	})
}
