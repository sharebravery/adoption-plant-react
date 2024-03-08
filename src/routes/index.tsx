/* eslint-disable react-refresh/only-export-components */
import { Navigate, type RouteObject } from 'react-router-dom'
import React, { lazy } from 'react'
import { Spin } from 'antd'
import BasicLayout from '../layouts/BasicLayout'

const Marketplace = lazy(() => import('../pages/marketplace'))
const My = lazy(() => import('../pages/my'))
const Notice = lazy(() => import('../pages/notice'))
const Test = lazy(() => import('../pages/test/Test'))

interface IRouterMeta {
  title?: string
  icon?: string
}

export type IRouter = (RouteObject & { meta?: IRouterMeta })

const routes: IRouter[] = [
  // {
  //   path: '/',
  //   element: <Navigate to="/home" replace={true} />,
  // },
  {
    path: '/',
    element: (
      <React.Suspense fallback={(
        <div>
          {' '}
          <Spin size="large" />
          Loading...
        </div>
      )}
      >
        <BasicLayout><Marketplace /></BasicLayout>
      </React.Suspense>
    ),
  },
  {
    path: '/my',
    element: (
      <React.Suspense fallback={(
        <div>
          {' '}
          <Spin size="large" />
          Loading...
        </div>
      )}
      >
        <BasicLayout><My /></BasicLayout>
      </React.Suspense>
    ),
  },
  {
    path: '/notice',
    element: (
      <React.Suspense fallback={(
        <div>
          {' '}
          <Spin size="large" />
          Loading...
        </div>
      )}
      >
        <BasicLayout><Notice /></BasicLayout>
      </React.Suspense>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]

if (true) {
  routes.push(
    {
      path: '/test',
      element: (
        <React.Suspense fallback={(
          <div>
            {' '}
            <Spin size="large" />
            Loading...
          </div>
        )}
        >
          <BasicLayout><Test /></BasicLayout>
        </React.Suspense>
      ),
    },
  )
}

export default routes
