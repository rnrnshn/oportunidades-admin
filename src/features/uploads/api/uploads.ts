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
		body: JSON.stringify({ filename, content_type: filename.endsWith('.webp') ? 'image/webp' : filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 'image/png', folder }),
	})
}

export async function uploadFile(uploadUrl: string, file: File, onProgress?: (progress: number) => void) {
	await new Promise<void>((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open('PUT', uploadUrl)
		request.setRequestHeader('Content-Type', file.type)
		request.upload.onprogress = (event) => {
			if (!event.lengthComputable || !onProgress) {
				return
			}
			onProgress(Math.round((event.loaded / event.total) * 100))
		}
		request.onload = () => {
			if (request.status >= 200 && request.status < 300) {
				resolve()
				return
			}
			reject(new Error('Falha ao carregar ficheiro.'))
		}
		request.onerror = () => reject(new Error('Falha ao carregar ficheiro.'))
		request.send(file)
	})
}

export async function confirmUpload(path: string) {
	return apiRequest<ConfirmPayload>('/v1/uploads/confirm', {
		method: 'POST',
		body: JSON.stringify({ path }),
	})
}
