import { ComponentType } from 'react'

import {
  Editor,
  Welcome,
  AboutUs,
  EditBackgroundImage,
  PdfPageSelector,
  ScaleHinter,
} from '@/pages'

export interface IRoute {
  path: string
  component: ComponentType
  exact?: boolean
}

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  EDITOR = '/editor',
  SCALE_HINTER = '/scale-hinter',
  WELCOME = '/welcome',
  ABOUT_US = '/about-us',
  EDIT_BACKGROUND_IMAGE = '/edit-background',
  PDF_PAGE_SELECTOR = '/pdf-page-selector',
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    exact: true,
    component: Editor,
  },
  {
    path: RouteNames.EDITOR,
    exact: true,
    component: Editor,
  },
  {
    path: RouteNames.WELCOME,
    exact: true,
    component: Welcome,
  },
  {
    path: RouteNames.ABOUT_US,
    exact: true,
    component: AboutUs,
  },
  {
    path: RouteNames.EDIT_BACKGROUND_IMAGE,
    exact: true,
    component: EditBackgroundImage,
  },
  {
    path: RouteNames.SCALE_HINTER,
    exact: true,
    component: ScaleHinter,
  },
  {
    path: RouteNames.PDF_PAGE_SELECTOR,
    exact: true,
    component: PdfPageSelector,
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.HOME,
    exact: true,
    component: Editor,
  },
  {
    path: RouteNames.EDITOR,
    exact: true,
    component: Editor,
  },
  {
    path: RouteNames.ABOUT_US,
    exact: true,
    component: AboutUs,
  },
]
