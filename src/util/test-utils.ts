
// https://testing-library.com/docs/example-react-router/#reducing-boilerplate
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

export const renderWithRouter = (
  component: ReactElement,
  route: { route: string }
) => {
  window.history.pushState({}, "", route.route);

  return {
    ...render(component, { wrapper: MemoryRouter }),
  };
};

// https://testing-library.com/docs/react-testing-library/setup#custom-render
// import React, {ReactElement} from 'react'
// import {render, RenderOptions} from '@testing-library/react'
// import {ThemeProvider} from 'my-ui-lib'
// import {TranslationProvider} from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'

// const AllTheProviders = ({children}: {children: React.ReactNode}) => {
//   return (
//     <ThemeProvider theme="light">
//       <TranslationProvider messages={defaultStrings}>
//         {children}
//       </TranslationProvider>
//     </ThemeProvider>
//   )
// }

// const customRender = (
//   ui: ReactElement,
//   options?: Omit<RenderOptions, 'wrapper'>,
// ) => render(ui, {wrapper: AllTheProviders, ...options})

// export * from '@testing-library/react'
// export {customRender as render}
