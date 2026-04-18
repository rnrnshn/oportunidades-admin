import { createRootRoute, createRoute, createRouter, Navigate, Outlet, useRouterState } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/app-shell'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { AccountPage } from '@/routes/account'
import { ArticleEditPage } from '@/routes/article-edit'
import { ArticleNewPage } from '@/routes/article-new'
import { ArticlesListPage } from '@/routes/articles-list'
import { DashboardPage } from '@/routes/dashboard'
import { LoginPage } from '@/routes/login'

function ProtectedLayout() {
	const currentUser = useCurrentUser()

	if (currentUser.isLoading) {
		return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading admin...</div>
	}

	if (!currentUser.data) {
		return <Navigate to="/login" />
	}

	return (
		<AppShell>
			<Outlet />
		</AppShell>
	)
}

function RootLayout() {
	const pathname = useRouterState({ select: (state) => state.location.pathname })
	if (pathname === '/login') {
		return <Outlet />
	}
	return <ProtectedLayout />
}

const rootRoute = createRootRoute({ component: RootLayout })

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage,
})

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: DashboardPage,
})

const articlesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/articles',
	component: ArticlesListPage,
})

const articleNewRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/articles/new',
	component: ArticleNewPage,
})

const articleEditRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/articles/$id',
	component: ArticleEditPage,
})

const accountRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/account',
	component: AccountPage,
})

const routeTree = rootRoute.addChildren([
	loginRoute,
	dashboardRoute,
	articlesRoute,
	articleNewRoute,
	articleEditRoute,
	accountRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
