// Copyright (c) Microsoft. All rights reserved.

import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  redux as appRedux,
  getAzureMapsKey,
  getAzureMapsKeyError,
  getAzureMapsKeyPendingStatus,
  getDeviceGroups,
  getDeviceGroupError,
  getTheme,
  getTimeInterval
} from 'store/reducers/appReducer';
import {
  epics as rulesEpics,
  getEntities as getRuleEntities,
  getRulesPendingStatus,
  getRulesError
} from 'store/reducers/rulesReducer';
import {
  getDevicesError,
  getDevicesLastUpdated,
  getDevicesPendingStatus,
  getEntities as getDeviceEntities
} from 'store/reducers/devicesReducer';

import { Dashboard } from './dashboard';

const mapStateToProps = state => ({
  azureMapsKey: getAzureMapsKey(state),
  azureMapsKeyError: getAzureMapsKeyError(state),
  azureMapsKeyIsPending: getAzureMapsKeyPendingStatus(state),
  deviceGroups: getDeviceGroups(state),
  deviceGroupError: getDeviceGroupError(state),
  deviceLastUpdated: getDevicesLastUpdated(state),
  devices: getDeviceEntities(state),
  devicesError: getDevicesError(state),
  devicesIsPending: getDevicesPendingStatus(state),
  rules: getRuleEntities(state),
  rulesError: getRulesError(state),
  rulesIsPending: getRulesPendingStatus(state),
  theme: getTheme(state),
  timeInterval: getTimeInterval(state)
});

// Wrap the dispatch method
const mapDispatchToProps = dispatch => ({
  fetchRules: () => dispatch(rulesEpics.actions.fetchRules()),
  updateTimeInterval: timeInterval => dispatch(appRedux.actions.updateTimeInterval(timeInterval))
});

export const DashboardContainer = translate()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
