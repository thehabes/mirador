import uuid from 'uuid/v4';
import ActionTypes from './action-types';

/**
 * focusWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function focusWindow(windowId, pan = false) {
  return (dispatch, getState) => {
    const { windows } = getState();
    const { x, y } = windows[windowId];

    dispatch({
      type: ActionTypes.FOCUS_WINDOW,
      windowId,
      position: pan ? { x: x - 200, y: y - 200 } : {},
    });
  };
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addWindow(options) {
  const cwDefault = `cw-${uuid()}`;
  const cwThumbs = `cw-${uuid()}`;
  const defaultOptions = {
    id: `window-${uuid()}`,
    canvasIndex: 0,
    collectionIndex: 0,
    manifestId: null,
    rangeId: null,
    thumbnailNavigationId: cwThumbs,
    width: 400,
    height: 400,
    x: 200,
    y: 200,
    companionWindowIds: [cwDefault, cwThumbs],
    sideBarPanel: 'info',
    rotation: null,
    view: 'single',
    maximized: false,
  };
  return {
    type: ActionTypes.ADD_WINDOW,
    window: { ...defaultOptions, ...options },
    companionWindows: [
      { id: cwDefault, position: 'left', content: 'info' },
      { id: cwThumbs, position: options.thumbnailNavigationPosition || 'far-bottom', content: 'thumbnail_navigation' },
    ],
  };
}

/**
 * maximizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function maximizeWindow(windowId, layout) {
  return { type: ActionTypes.MAXIMIZE_WINDOW, windowId };
}

/**
 * minimizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function minimizeWindow(windowId) {
  return { type: ActionTypes.MINIMIZE_WINDOW, windowId };
}

/** */
export function updateWindow(id, payload) {
  return { type: ActionTypes.UPDATE_WINDOW, id, payload };
}

/** */
export function setCompanionAreaOpen(id, companionAreaOpen) {
  return { type: ActionTypes.UPDATE_WINDOW, id, payload: { companionAreaOpen } };
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function removeWindow(windowId) {
  return (dispatch, getState) => {
    const { windows } = getState();
    const { companionWindowIds } = windows[windowId];

    dispatch({ type: ActionTypes.REMOVE_WINDOW, windowId, companionWindowIds });
  };
}

/**
 * toggleWindowSideBar - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function toggleWindowSideBar(windowId) {
  return { type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR, windowId };
}

/**
 * setWindowSideBarPanel - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType
 * @memberof ActionCreators
 */
export function setWindowSideBarPanel(windowId, panelType) {
  return { type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL, windowId, panelType };
}

/**
 * setWindowThumbnailPosition - action creator
 *
 * @param  {String} windowId
 * @param  {String} position
 * @memberof ActionCreators
 */
export function setWindowThumbnailPosition(windowId, position) {
  return (dispatch, getState) => {
    const { windows } = getState();
    const { thumbnailNavigationId } = windows[windowId];

    dispatch({
      type: ActionTypes.UPDATE_COMPANION_WINDOW, id: thumbnailNavigationId, payload: { position },
    });
  };
}

/**
 * setWindowViewType - action creator
 *
 * @param  {String} windowId
 * @param  {String} viewType
 * @memberof ActionCreators
 */
export function setWindowViewType(windowId, viewType) {
  return { type: ActionTypes.SET_WINDOW_VIEW_TYPE, windowId, viewType };
}

/**
 * updateWindowPosition - action creator
 *
 * @param  {String} windowId
 * @param  {Array} position
 * @memberof ActionCreators
 */
export function updateWindowPosition(windowId, position) {
  return {
    type: ActionTypes.UPDATE_WINDOW_POSITION,
    payload: {
      windowId,
      position,
    },
  };
}

/**
 * setWindowSize - action creator
 *
 * @param  {String} windowId
 * @param  {Object} size
 * @memberof ActionCreators
 */
export function setWindowSize(windowId, size) {
  return {
    type: ActionTypes.SET_WINDOW_SIZE,
    payload: {
      windowId,
      size,
    },
  };
}
