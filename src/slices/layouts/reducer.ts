import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//constants
import {
  LayoutTypes,
  LayoutModeTypes,
  LayoutWidthTypes,
  TopbarThemeTypes,
  LeftSidebarTypes,
  LeftSidebarThemeTypes,
  LeftbarThemeImagesTypes,
} from '../../types/enums/layout';

export interface LayoutState {
  layoutTypes: LayoutTypes;
  layoutModeTypes: LayoutModeTypes;
  layoutWidthTypes: LayoutWidthTypes;
  topbarThemeTypes: TopbarThemeTypes;
  leftSidebarTypes: LeftSidebarTypes;
  leftSideBarThemeTypes: LeftSidebarThemeTypes;
  leftSidebarImageTypes: LeftbarThemeImagesTypes;
}

export const initialState: LayoutState = {
  layoutTypes: LayoutTypes.VERTICAL,
  layoutModeTypes: LayoutModeTypes.LIGHT,
  layoutWidthTypes: LayoutWidthTypes.FLUID,
  topbarThemeTypes: TopbarThemeTypes.LIGHT,
  leftSidebarTypes: LeftSidebarTypes.DEFAULT,
  leftSideBarThemeTypes: LeftSidebarThemeTypes.DARK,
  leftSidebarImageTypes: LeftbarThemeImagesTypes.NONE,
};

const LayoutSlice = createSlice({
  name: 'LayoutSlice',
  initialState,
  reducers: {
    changeLayoutAction(state, action: PayloadAction<LayoutState['layoutTypes']>) {
      state.layoutTypes = action.payload;
    },
    changeLayoutModeAction(state, action: PayloadAction<LayoutState['layoutModeTypes']>) {
      state.layoutModeTypes = action.payload;
    },
    changeSidebarThemeAction(state, action: PayloadAction<LayoutState['leftSideBarThemeTypes']>) {
      state.leftSideBarThemeTypes = action.payload;
    },
    changeLayoutWidthAction(state, action: PayloadAction<LayoutState['layoutWidthTypes']>) {
      state.layoutWidthTypes = action.payload;
    },
    changeLayoutSidebarAction(state, action: PayloadAction<LayoutState['leftSidebarTypes']>) {
      state.leftSidebarTypes = action.payload;
    },
    changeTopbarThemeAction(state, action: PayloadAction<LayoutState['topbarThemeTypes']>) {
      state.topbarThemeTypes = action.payload;
    },
    changeSidebarImageTypeAction(
      state,
      action: PayloadAction<LayoutState['leftSidebarImageTypes']>
    ) {
      state.leftSidebarImageTypes = action.payload;
    },
  },
});

export const {
  changeLayoutAction,
  changeLayoutModeAction,
  changeSidebarThemeAction,
  changeLayoutWidthAction,
  changeTopbarThemeAction,
  changeSidebarImageTypeAction,
  changeLayoutSidebarAction,
} = LayoutSlice.actions;

export default LayoutSlice.reducer;
