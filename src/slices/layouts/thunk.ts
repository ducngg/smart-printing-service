import { Dispatch } from 'redux';

import {
  LayoutModeTypes,
  LayoutTypes,
  LayoutWidthTypes,
  LeftSidebarThemeTypes,
  LeftSidebarTypes,
  LeftbarThemeImagesTypes,
  TopbarThemeTypes,
} from 'types';

import {
  changeLayoutModeAction,
  changeTopbarThemeAction,
  changeSidebarThemeAction,
  changeSidebarImageTypeAction,
  changeLayoutAction,
  changeLayoutSidebarAction,
  changeLayoutWidthAction,
} from './reducer';
import { changeBodyAttribute, manageBodyClass } from './utils';

export const changeLayout = (layout: LayoutTypes) => (dispatch: Dispatch) => {
  switch (layout) {
    case 'horizontal':
      document.body.removeAttribute('data-sidebar');
      document.body.removeAttribute('data-sidebar-image');
      document.body.removeAttribute('data-sidebar-size');
      break;

    case 'vertical':
      // dispatch(changeTopbarThemeAction('light'));
      break;
  }
  changeBodyAttribute('data-layout', layout);
  dispatch(changeLayoutAction(layout));
};

/**
 * Changes the layout mode
 * @param {*} param0
 */
export const changeLayoutMode = (layoutMode: LayoutModeTypes) => (dispatch: Dispatch) => {
  changeBodyAttribute('data-layout-mode', layoutMode);
  dispatch(changeLayoutModeAction(layoutMode));
};

/**
 * Changes the layout width
 * @param {*} param0
 */
export const changeLayoutWidth = (layoutWidth: LayoutWidthTypes) => (dispatch: Dispatch) => {
  if (layoutWidth === 'boxed') {
    changeBodyAttribute('data-sidebar-size', '');
    changeBodyAttribute('data-keep-enlarged', 'true');
    manageBodyClass('vertical-collpsed', 'add');

    changeBodyAttribute('data-layout-size', layoutWidth);
    changeBodyAttribute('data-layout-scrollable', 'false');
  } else if (layoutWidth === 'scrollable') {
    changeBodyAttribute('data-sidebar-size', '');
    manageBodyClass('vertical-collpsed', 'remove');
    manageBodyClass('sidebar-enable', 'remove');

    changeBodyAttribute('data-layout-scrollable', 'true');
  } else {
    changeBodyAttribute('data-sidebar-size', '');
    manageBodyClass('vertical-collpsed', 'remove');
    manageBodyClass('sidebar-enable', 'remove');

    changeBodyAttribute('data-layout-size', layoutWidth);
    changeBodyAttribute('data-layout-scrollable', 'false');
  }

  dispatch(changeLayoutWidthAction(layoutWidth));
};

/**
 * Changes the layout mode
 * @param {*} param0
 */
export const changeTopbarTheme = (topbarTheme: TopbarThemeTypes) => (dispatch: Dispatch) => {
  changeBodyAttribute('data-topbar', topbarTheme);
  dispatch(changeTopbarThemeAction(topbarTheme));
};

/**
 * Changes the layout mode
 * @param {*} param0
 */
export const changeLeftSidebarTheme =
  (sidebarTheme: LeftSidebarThemeTypes) => (dispatch: Dispatch) => {
    try {
      changeBodyAttribute('data-sidebar', sidebarTheme);
      dispatch(changeSidebarThemeAction(sidebarTheme));
    } catch (error) {
      // console.log(error);
    }
  };

/**
 * Changes the sidebar mode
 * @param {*} param0
 */
export const changeLeftSidebarType = (sidebarType: LeftSidebarTypes) => (dispatch: Dispatch) => {
  switch (sidebarType) {
    case 'small':
      changeBodyAttribute('data-sidebar-size', 'small');
      manageBodyClass('sidebar-enable', 'remove');
      manageBodyClass('vertical-collpsed', 'remove');
      break;
    case 'icon':
      changeBodyAttribute('data-sidebar-size', '');
      changeBodyAttribute('data-keep-enlarged', 'true');
      manageBodyClass('vertical-collpsed', 'add');
      break;
    default:
      changeBodyAttribute('data-sidebar-size', '');
      manageBodyClass('vertical-collpsed', 'remove');
      manageBodyClass('sidebar-enable', 'remove');
      break;
  }
  dispatch(changeLayoutSidebarAction(sidebarType));
};

/**
 * Changes the sidebar images
 * @param {*} param0
 */
export const changeSidebarImageType =
  (leftsidebarImagetype: LeftbarThemeImagesTypes) => (dispatch: Dispatch) => {
    changeBodyAttribute('data-sidebar-image', leftsidebarImagetype);
    dispatch(changeSidebarImageTypeAction(leftsidebarImagetype));
  };
