import { createRootRoute, createRoute, createRouter, Navigate, Outlet, useRouterState } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/app-shell'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { AccountPage } from '@/routes/account'
import { ArticleEditPage } from '@/routes/article-edit'
import { ArticleNewPage } from '@/routes/article-new'
import { ArticlesListPage } from '@/routes/articles-list'
import { DashboardPage } from '@/routes/dashboard'
import { CourseEditPage } from '@/routes/course-edit'
import { CourseNewPage } from '@/routes/course-new'
import { CoursesListPage } from '@/routes/courses-list'
import { LoginPage } from '@/routes/login'
import { MentorshipSessionDetailPage } from '@/routes/mentorship-session-detail'
import { MentorshipSessionsListPage } from '@/routes/mentorship-sessions-list'
import { OpportunityEditPage } from '@/routes/opportunity-edit'
import { OpportunityNewPage } from '@/routes/opportunity-new'
import { OpportunitiesListPage } from '@/routes/opportunities-list'
import { ReportsListPage } from '@/routes/reports-list'
import { ReportDetailPage } from '@/routes/report-detail'
import { UniversityEditPage } from '@/routes/university-edit'
import { UniversityNewPage } from '@/routes/university-new'
import { UniversitiesListPage } from '@/routes/universities-list'

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

const opportunitiesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/opportunities',
	component: OpportunitiesListPage,
})

const opportunityNewRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/opportunities/new',
	component: OpportunityNewPage,
})

const opportunityEditRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/opportunities/$id',
	component: OpportunityEditPage,
})

const universitiesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/universities',
	component: UniversitiesListPage,
})

const universityNewRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/universities/new',
	component: UniversityNewPage,
})

const universityEditRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/universities/$id',
	component: UniversityEditPage,
})

const coursesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/courses',
	component: CoursesListPage,
})

const courseNewRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/courses/new',
	component: CourseNewPage,
})

const courseEditRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/courses/$id',
	component: CourseEditPage,
})

const reportsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/reports',
	component: ReportsListPage,
})

const reportDetailRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/reports/$id',
	component: ReportDetailPage,
})

const mentorshipSessionsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/mentorship/sessions',
	component: MentorshipSessionsListPage,
})

const mentorshipSessionDetailRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/mentorship/sessions/$id',
	component: MentorshipSessionDetailPage,
})

const routeTree = rootRoute.addChildren([
	loginRoute,
	dashboardRoute,
	articlesRoute,
	articleNewRoute,
	articleEditRoute,
	opportunitiesRoute,
	opportunityNewRoute,
	opportunityEditRoute,
	universitiesRoute,
	universityNewRoute,
	universityEditRoute,
	coursesRoute,
	courseNewRoute,
	courseEditRoute,
	reportsRoute,
	reportDetailRoute,
	mentorshipSessionsRoute,
	mentorshipSessionDetailRoute,
	accountRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
