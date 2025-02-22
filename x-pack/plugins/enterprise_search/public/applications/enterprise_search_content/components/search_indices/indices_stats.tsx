/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useEffect } from 'react';

import { useActions, useValues } from 'kea';

import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiStat } from '@elastic/eui';

import { i18n } from '@kbn/i18n';

import { Status } from '../../../../../common/types/api';

import { FetchSyncJobsStatsApiLogic } from '../../api/stats/fetch_sync_jobs_stats_api_logic';

export const IndicesStats: React.FC = () => {
  const { makeRequest } = useActions(FetchSyncJobsStatsApiLogic);
  const { data, status } = useValues(FetchSyncJobsStatsApiLogic);
  const isLoading = status === Status.LOADING;

  useEffect(() => {
    makeRequest({});
  }, []);

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel
              color={data?.connected ? 'success' : 'subdued'}
              hasShadow={false}
              paddingSize="l"
            >
              <EuiStat
                description={i18n.translate(
                  'xpack.enterpriseSearch.content.searchIndices.jobStats.connectedMethods',
                  {
                    defaultMessage: 'Connected ingest methods',
                  }
                )}
                isLoading={isLoading}
                title={data?.connected}
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel
              color={data?.incomplete ? 'warning' : 'subdued'}
              hasShadow={false}
              paddingSize="l"
            >
              <EuiStat
                description={i18n.translate(
                  'xpack.enterpriseSearch.content.searchIndices.jobStats.incompleteMethods',
                  {
                    defaultMessage: 'Incomplete ingest methods',
                  }
                )}
                isLoading={isLoading}
                title={data?.incomplete}
              />
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel color="subdued" hasShadow={false} paddingSize="l">
              <EuiStat
                description={i18n.translate(
                  'xpack.enterpriseSearch.content.searchIndices.jobStats.runningSyncs',
                  {
                    defaultMessage: 'Running syncs',
                  }
                )}
                isLoading={isLoading}
                title={data?.in_progress}
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel
              color={data?.long_running ? 'warning' : 'subdued'}
              hasShadow={false}
              paddingSize="l"
            >
              <EuiStat
                description={i18n.translate(
                  'xpack.enterpriseSearch.content.searchIndices.jobStats.longRunningSyncs',
                  {
                    defaultMessage: 'Long running syncs',
                  }
                )}
                isLoading={isLoading}
                title={data?.long_running}
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel
              color={data?.orphaned_jobs ? 'warning' : 'subdued'}
              hasShadow={false}
              paddingSize="l"
            >
              <EuiStat
                description={i18n.translate(
                  'xpack.enterpriseSearch.content.searchIndices.jobStats.orphanedSyncs',
                  {
                    defaultMessage: 'Orphaned syncs',
                  }
                )}
                isLoading={isLoading}
                title={data?.orphaned_jobs}
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel color={data?.errors ? 'danger' : 'subdued'} hasShadow={false} paddingSize="l">
              <EuiStat
                description={i18n.translate(
                  'xpack.enterpriseSearch.content.searchIndices.jobStats.errorSyncs',
                  {
                    defaultMessage: 'Syncs errors',
                  }
                )}
                isLoading={isLoading}
                title={data?.errors}
              />
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
