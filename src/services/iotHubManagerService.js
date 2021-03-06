// Copyright (c) Microsoft. All rights reserved.

import { Observable } from 'rxjs';

import Config from 'app.config';
import { stringify } from 'query-string';
import { HttpClient } from 'utilities/httpClient';
import { toDevicesModel, toDeviceModel, toJobsModel, toJobStatusModel, toDevicePropertiesModel } from './models';

const ENDPOINT = Config.serviceUrls.iotHubManager;

/** Contains methods for calling the Device service */
export class IoTHubManagerService {

  /** Returns a list of devices */
  static getDevices(conditions = []) {
    const query = encodeURIComponent(JSON.stringify(conditions));
    return HttpClient.get(`${ENDPOINT}devices?query=${query}`)
      .map(toDevicesModel);
  }

  /** Returns a list of all jobs */
  static getJobs(params) {
    return HttpClient.get(`${ENDPOINT}jobs?${stringify(params)}`)
      .map(toJobsModel);
  }

  /** Submits a job */
  static submitJob(body) {
    return HttpClient.post(`${ENDPOINT}jobs`, body)
      .map(toJobStatusModel);
  }

  /** Get returns the status details for a particular job */
  static getJobStatus(jobId) {
    return HttpClient.get(`${ENDPOINT}jobs/${jobId}?includeDeviceDetails=true`)
      .map(toJobStatusModel);
  }

  /** Provisions a device */
  static provisionDevice(body) {
    return HttpClient.post(`${ENDPOINT}devices`, body)
      .map(toDeviceModel);
  }

  /** Deletes a device */
  static deleteDevice(id) {
    return HttpClient.delete(`${ENDPOINT}devices/${id}`)
      .map(() => ({ deletedDeviceId: id }));
  }

  /** Returns the account's device group filters */
  static getDeviceProperties() {
    return Observable
      .forkJoin(
        HttpClient.get(`${ENDPOINT}deviceproperties`),
        HttpClient.get(`${Config.serviceUrls.deviceSimulation}devicemodelproperties`)
      )
      .map(([iotResponse, dsResponse]) => toDevicePropertiesModel(iotResponse, dsResponse));
  }
}
