/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AttendanceImport } from './routes/attendance'
import { Route as IndexImport } from './routes/index'
import { Route as MembershipIndexImport } from './routes/membership/index'
import { Route as MemberIndexImport } from './routes/member/index'
import { Route as MemberSlugImport } from './routes/member/$slug'

// Create/Update Routes

const AttendanceRoute = AttendanceImport.update({
  id: '/attendance',
  path: '/attendance',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MembershipIndexRoute = MembershipIndexImport.update({
  id: '/membership/',
  path: '/membership/',
  getParentRoute: () => rootRoute,
} as any)

const MemberIndexRoute = MemberIndexImport.update({
  id: '/member/',
  path: '/member/',
  getParentRoute: () => rootRoute,
} as any)

const MemberSlugRoute = MemberSlugImport.update({
  id: '/member/$slug',
  path: '/member/$slug',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/attendance': {
      id: '/attendance'
      path: '/attendance'
      fullPath: '/attendance'
      preLoaderRoute: typeof AttendanceImport
      parentRoute: typeof rootRoute
    }
    '/member/$slug': {
      id: '/member/$slug'
      path: '/member/$slug'
      fullPath: '/member/$slug'
      preLoaderRoute: typeof MemberSlugImport
      parentRoute: typeof rootRoute
    }
    '/member/': {
      id: '/member/'
      path: '/member'
      fullPath: '/member'
      preLoaderRoute: typeof MemberIndexImport
      parentRoute: typeof rootRoute
    }
    '/membership/': {
      id: '/membership/'
      path: '/membership'
      fullPath: '/membership'
      preLoaderRoute: typeof MembershipIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/attendance': typeof AttendanceRoute
  '/member/$slug': typeof MemberSlugRoute
  '/member': typeof MemberIndexRoute
  '/membership': typeof MembershipIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/attendance': typeof AttendanceRoute
  '/member/$slug': typeof MemberSlugRoute
  '/member': typeof MemberIndexRoute
  '/membership': typeof MembershipIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/attendance': typeof AttendanceRoute
  '/member/$slug': typeof MemberSlugRoute
  '/member/': typeof MemberIndexRoute
  '/membership/': typeof MembershipIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/attendance' | '/member/$slug' | '/member' | '/membership'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/attendance' | '/member/$slug' | '/member' | '/membership'
  id:
    | '__root__'
    | '/'
    | '/attendance'
    | '/member/$slug'
    | '/member/'
    | '/membership/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AttendanceRoute: typeof AttendanceRoute
  MemberSlugRoute: typeof MemberSlugRoute
  MemberIndexRoute: typeof MemberIndexRoute
  MembershipIndexRoute: typeof MembershipIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AttendanceRoute: AttendanceRoute,
  MemberSlugRoute: MemberSlugRoute,
  MemberIndexRoute: MemberIndexRoute,
  MembershipIndexRoute: MembershipIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/attendance",
        "/member/$slug",
        "/member/",
        "/membership/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/attendance": {
      "filePath": "attendance.tsx"
    },
    "/member/$slug": {
      "filePath": "member/$slug.tsx"
    },
    "/member/": {
      "filePath": "member/index.tsx"
    },
    "/membership/": {
      "filePath": "membership/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
