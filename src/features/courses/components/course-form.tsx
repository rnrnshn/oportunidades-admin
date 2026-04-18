import { useForm } from 'react-hook-form'

import { EditorShell } from '@/components/layout/editor-shell'
import { Button } from '@/components/ui/button'
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
import type { CourseFormInput } from '@/features/courses/api/courses'
import type { Course } from '@/features/courses/schemas/course.schema'
import type { University } from '@/features/universities/schemas/university.schema'

interface CourseFormProps {
	onSubmit: (input: CourseFormInput) => Promise<void>
	course?: Course
	universities: University[]
}

export function CourseForm({ onSubmit, course, universities }: CourseFormProps) {
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<CourseFormInput>({
		defaultValues: {
			university_id: course?.university_id ?? '',
			name: course?.name ?? '',
			area: course?.area ?? '',
			level: course?.level ?? 'licenciatura',
			regime: course?.regime ?? 'presencial',
		},
	})
	const levelValue = watch('level') || 'licenciatura'
	const regimeValue = watch('regime') || 'presencial'
	const universityValue = watch('university_id') || ''

	return (
		<EditorShell title={course ? 'Edit course' : 'Create course'}>
				<form className="space-y-4" onSubmit={handleSubmit((values) => onSubmit(values))}>
					<div className="space-y-2">
						<Label htmlFor="university_id">University</Label>
						<Select value={universityValue} onValueChange={(value) => setValue('university_id', value ?? '')}>
							<SelectTrigger id="university_id" className="w-full"><SelectValue placeholder="Select university" /></SelectTrigger>
							<SelectContent>
								{universities.map((university) => (
									<SelectItem key={university.id} value={university.id}>{university.name}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" {...register('name')} /></div>
					<div className="space-y-2"><Label htmlFor="area">Area</Label><Input id="area" {...register('area')} /></div>
					<div className="space-y-2">
						<Label htmlFor="level">Level</Label>
						<Select value={levelValue} onValueChange={(value) => setValue('level', value ?? 'licenciatura')}>
							<SelectTrigger id="level" className="w-full"><SelectValue placeholder="Select level" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="licenciatura">Licenciatura</SelectItem>
								<SelectItem value="mestrado">Mestrado</SelectItem>
								<SelectItem value="doutoramento">Doutoramento</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="regime">Regime</Label>
						<Select value={regimeValue} onValueChange={(value) => setValue('regime', value ?? 'presencial')}>
							<SelectTrigger id="regime" className="w-full"><SelectValue placeholder="Select regime" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="presencial">Presencial</SelectItem>
								<SelectItem value="distancia">Distância</SelectItem>
								<SelectItem value="misto">Misto</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2"><Label htmlFor="duration_years">Duration years</Label><Input id="duration_years" type="number" {...register('duration_years', { valueAsNumber: true })} /></div>
					<div className="space-y-2"><Label htmlFor="annual_fee">Annual fee</Label><Input id="annual_fee" {...register('annual_fee')} /></div>
					<div className="space-y-2"><Label htmlFor="entry_requirements">Entry requirements</Label><Textarea id="entry_requirements" {...register('entry_requirements')} /></div>
					<Button disabled={isSubmitting} type="submit">{course ? 'Save changes' : 'Create course'}</Button>
				</form>
		</EditorShell>
	)
}
