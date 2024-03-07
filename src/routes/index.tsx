/* eslint-disable react-refresh/only-export-components */
import { Navigate, type RouteObject } from 'react-router-dom'
import React, { lazy } from 'react'
import { Spin } from 'antd'
import BasicLayout from '../layouts/BasicLayout'

const Home = lazy(() => import('../pages/home'))
const My = lazy(() => import('../pages/my'))

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
        <BasicLayout><Home /></BasicLayout>
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
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]

export default routes
