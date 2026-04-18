import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import type { AnyRouter } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

import { queryClient } from '@/app/query-client'

interface AppProvidersProps extends PropsWithChildren {
	router: AnyRouter
}

export function AppProviders({ router }: AppProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}
