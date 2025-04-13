/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import pluginId from '../../pluginId';
import { HomePage } from '../HomePage/index';
import { DesignSystemProvider, darkTheme, } from '@strapi/design-system';



const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" >
    <Routes>
      <Route index element={<HomePage />} />
      <Route element={<Page.Error />} />
    </Routes>
    </DesignSystemProvider>
  );
};

export { App };
