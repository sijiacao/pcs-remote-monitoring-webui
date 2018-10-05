// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';
import { permissions } from 'services/models';
import {
  AjaxError,
  Btn,
  ComponentArray,
  ContextMenu,
  ContextMenuAlign,
  DeleteModal,
  Indicator,
  PageContent,
  Protected,
  RefreshBar,
  StatSection,
  StatGroup,
  StatProperty
} from 'components/shared';
import { TimeRenderer } from 'components/shared/cellRenderers';
import { svgs } from 'utilities';
import { DeploymentDetailsGrid } from './deploymentDetailsGrid/deploymentDetailsGrid';

import "./deploymentDetails.css";

const closedModalState = {
  openModalName: undefined
};

export class DeploymentDetails extends Component {
  constructor(props) {
    super(props);
    // Set the initial state
    this.state = {
      ...closedModalState,
      deploymentDeleted: false
    };
    props.fetchDeployment(props.match.params.id);
  }

  componentWillUnmount() {
    this.props.resetDeployedDevices();
  }

  getOpenModal = () => {
    const { t, deleteIsPending, deleteError, deleteItem } = this.props;
    if (this.state.openModalName === 'delete-deployment' && this.props.currentDeployment) {
      return <DeleteModal
        t={t}
        deleteItem={deleteItem}
        error={deleteError}
        isPending={deleteIsPending}
        itemId={this.props.currentDeployment.id}
        onClose={this.closeModal}
        onDelete={this.onDelete}
        title={this.props.t('deployments.modals.delete.title')}
        deleteInfo={this.props.t(
          'deployments.modals.delete.info',
          { deploymentName: this.props.currentDeployment.name })} />
    }
    return null;
  }

  openModal = (modalName) => () => this.setState({
    openModalName: modalName
  });

  closeModal = () => this.setState(closedModalState);

  onDelete = () => {
    this.closeModal();
    this.props.history.push(`/deployments`)
  }

  render() {
    const {
      t,
      currentDeployment,
      isPending,
      error,
      deployedDevices,
      isDeployedDevicesPending,
      deployedDevicesError,
      fetchDeployment,
      lastUpdated
    } = this.props;
    const {
      appliedCount,
      succeededCount,
      failedCount,
      name,
      priority,
      deviceGroupId,
      createdDateTimeUtc,
      type,
      packageId
    } = currentDeployment;
    const pendingCalc = appliedCount - succeededCount - failedCount;
    const pendingCount = pendingCalc ? pendingCalc : '0';

    return (
      <ComponentArray>
        {this.getOpenModal()}
        <ContextMenu>
          <ContextMenuAlign>
            <Protected permission={permissions.createDevices}>
              <Btn svg={svgs.trash} onClick={this.openModal('delete-deployment')}>{t('deployments.modals.delete.contextMenuName')}</Btn>
            </Protected>
          </ContextMenuAlign>
        </ContextMenu>
        <PageContent className="deployments-details-container">

          <RefreshBar refresh={fetchDeployment} time={lastUpdated} isPending={isPending} t={t} />

          {!!error && <AjaxError t={t} error={error} />}

          {isPending && <Indicator />}

          {
            !isPending &&
            <div className="deployment-details-summary-container">
              <div className="deployment-details-summary-labels">
                {t('deployments.details.deploymentName')}
              </div>
              <div className="deployment-name">
                {name}
              </div>
              <StatSection className="summary-container">
                <StatGroup className="summary-container-columns">
                  <StatProperty
                    value={appliedCount}
                    label={t('deployments.details.devices')}
                    size="large" />
                  <StatGroup className="summary-container-second-row">
                    <div className="deployment-details-summary-labels">
                      {t('deployments.details.priority')}
                    </div>
                    <div className="deployment-details-summary-values">
                      {priority}
                    </div>
                  </StatGroup>
                </StatGroup>
                <StatGroup className="summary-container-columns">
                  <StatProperty
                    value={failedCount}
                    label={t('deployments.details.failed')}
                    svg={svgs.failed}
                    svgClassName="stat-failed"
                    size="large" />
                  <StatGroup className="summary-container-second-row">
                    <StatProperty
                      value={succeededCount}
                      label={t('deployments.details.succeeded')}
                      size="small" />
                    <StatProperty
                      value={pendingCount}
                      label={t('deployments.details.pending')}
                      size="small" />
                  </StatGroup>
                </StatGroup>
                <StatGroup className="summary-container-columns">
                  <StatGroup>
                    <div className="deployment-details-summary-labels">
                      {t('deployments.details.deviceGroup')}
                    </div>
                    <div className="deployment-details-summary-values">
                      {deviceGroupId}
                    </div>
                  </StatGroup>
                  <StatGroup className="summary-container-second-row">
                    <div className="deployment-details-summary-labels">
                      {t('deployments.details.start')}
                    </div>
                    <div className="deployment-details-summary-values">
                      {TimeRenderer({ value: createdDateTimeUtc })}
                    </div>
                  </StatGroup>
                </StatGroup>
                <StatGroup className="summary-container-columns">
                  <StatGroup>
                    <div className="deployment-details-summary-labels">
                      {t('deployments.details.packageType')}
                    </div>
                    <div className="deployment-details-summary-values">
                      {type}
                    </div>
                  </StatGroup>
                  <StatGroup className="summary-container-second-row">
                    <div className="deployment-details-summary-labels">
                      {t('deployments.details.package')}
                    </div>
                    <div className="deployment-details-summary-values">
                      {packageId}
                    </div>
                  </StatGroup>
                </StatGroup>
              </StatSection>
            </div>
          }

          <h4 className="deployment-details-devices-affected">
            {t('deployments.details.devicesAffected')}
          </h4>

          {isDeployedDevicesPending && <Indicator />}

          {
            deployedDevicesError &&
            <AjaxError
              className="deployed-devices-grid-error"
              t={t}
              error={deployedDevicesError} />
          }

          {!isDeployedDevicesPending && <DeploymentDetailsGrid t={t} deployedDevices={deployedDevices} />}
        </PageContent>
      </ComponentArray>
    );
  }
}
