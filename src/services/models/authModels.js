// Copyright (c) Microsoft. All rights reserved.

import { camelCaseReshape } from 'utilities';

export const permissions = {
  createDeviceGroups: 'CreateDeviceGroups',
  deleteDeviceGroups: 'DeleteDeviceGroups',
  updateDeviceGroups: 'UpdateDeviceGroups',

  createDevices: 'CreateDevices',
  deleteDevices: 'DeleteDevices',
  updateDevices: 'UpdateDevices',

  createRules: 'CreateRules',
  deleteRules: 'DeleteRules',
  updateRules: 'UpdateRules',

  deleteAlarms: 'DeleteAlarms',
  updateAlarms: 'UpdateAlarms',

  createJobs: 'CreateJobs',

  updateSIMManagement: 'UpdateSIMManagement'
};

export const toUserModel = (user = {}) => camelCaseReshape(user, {
  'id': 'id',
  'email': 'email',
  'name': 'name',
  'allowedActions': 'permissions'
});

export const authDisabledUser = {
  id: 'AuthIsDisabled',
  email: 'authdisabled@iot.auth',
  name: 'Disabled Auth',
  //When authentication is disabled, this user has all permissions.
  //Each is liste individually for 2 reasons:
  //1. To enable easy testing of individual permissions (i.e. simple to comment/uncomment as needed while testing)
  //2. Using Object.values(permissions) makes the tests fail unnecessarily
  permissions: [
    permissions.createDeviceGroups,
    permissions.deleteDeviceGroups,
    permissions.updateDeviceGroups,

    permissions.createDevices,
    permissions.deleteDevices,
    permissions.updateDevices,

    permissions.createRules,
    permissions.deleteRules,
    permissions.updateRules,

    permissions.deleteAlarms,
    permissions.updateAlarms,

    permissions.createJobs,

    permissions.updateSIMManagement
  ]
};
