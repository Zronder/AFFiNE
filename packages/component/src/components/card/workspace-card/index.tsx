import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { PermissionType } from '@affine/workspace/affine/api';
import type {
  AffineLegacyCloudWorkspace,
  LocalWorkspace,
} from '@affine/workspace/type';
import { WorkspaceFlavour } from '@affine/workspace/type';
import { SettingsIcon } from '@blocksuite/icons';
import { useBlockSuiteWorkspaceName } from '@toeverything/hooks/use-block-suite-workspace-name';
import type { FC } from 'react';
import { useCallback } from 'react';

import { WorkspaceAvatar } from '../../workspace-avatar';
import {
  StyledCard,
  StyledSettingLink,
  StyleWorkspaceInfo,
  StyleWorkspaceTitle,
} from './styles';

export type WorkspaceTypeProps = {
  workspace: AffineLegacyCloudWorkspace | LocalWorkspace;
};

import {
  CloudWorkspaceIcon as DefaultCloudWorkspaceIcon,
  CollaborationIcon as DefaultJoinedWorkspaceIcon,
  LocalDataIcon as DefaultLocalDataIcon,
  LocalWorkspaceIcon as DefaultLocalWorkspaceIcon,
  PublishIcon as DefaultPublishIcon,
} from '@blocksuite/icons';

const JoinedWorkspaceIcon = () => {
  return <DefaultJoinedWorkspaceIcon style={{ color: '#FF646B' }} />;
};
const LocalWorkspaceIcon = () => {
  return <DefaultLocalWorkspaceIcon style={{ color: '#FDBD32' }} />;
};

const CloudWorkspaceIcon = () => {
  return <DefaultCloudWorkspaceIcon style={{ color: '#60A5FA' }} />;
};

const LocalDataIcon = () => {
  return <DefaultLocalDataIcon style={{ color: '#62CD80' }} />;
};
const PublishIcon = () => {
  return <DefaultPublishIcon style={{ color: '#8699FF' }} />;
};

const WorkspaceType: FC<WorkspaceTypeProps> = ({ workspace }) => {
  const t = useAFFiNEI18N();
  let isOwner = true;
  if (workspace.flavour === WorkspaceFlavour.AFFINE) {
    isOwner = workspace.permission === PermissionType.Owner;
  } else if (workspace.flavour === WorkspaceFlavour.LOCAL) {
    isOwner = true;
  }

  if (workspace.flavour === WorkspaceFlavour.LOCAL) {
    return (
      <p title={t['Local Workspace']()}>
        <LocalWorkspaceIcon />
        <span>{t['Local Workspace']()}</span>
      </p>
    );
  }

  return isOwner ? (
    <p title={t['Cloud Workspace']()}>
      <CloudWorkspaceIcon />
      <span>{t['Cloud Workspace']()}</span>
    </p>
  ) : (
    <p title={t['Joined Workspace']()}>
      <JoinedWorkspaceIcon />
      <span>{t['Joined Workspace']()}</span>
    </p>
  );
};

export type WorkspaceCardProps = {
  currentWorkspaceId: string | null;
  workspace: AffineLegacyCloudWorkspace | LocalWorkspace;
  onClick: (workspace: AffineLegacyCloudWorkspace | LocalWorkspace) => void;
  onSettingClick: (
    workspace: AffineLegacyCloudWorkspace | LocalWorkspace
  ) => void;
};

export const WorkspaceCard: FC<WorkspaceCardProps> = ({
  workspace,
  onClick,
  onSettingClick,
  currentWorkspaceId,
}) => {
  const t = useAFFiNEI18N();
  const [name] = useBlockSuiteWorkspaceName(workspace.blockSuiteWorkspace);

  return (
    <StyledCard
      data-testid="workspace-card"
      onClick={useCallback(() => {
        onClick(workspace);
      }, [onClick, workspace])}
      active={workspace.id === currentWorkspaceId}
    >
      <WorkspaceAvatar size={58} workspace={workspace} />

      <StyleWorkspaceInfo>
        <StyleWorkspaceTitle>{name}</StyleWorkspaceTitle>
        <WorkspaceType workspace={workspace} />
        {workspace.flavour === WorkspaceFlavour.LOCAL && (
          <p title={t['Available Offline']()}>
            <LocalDataIcon />
            <span>{t['Available Offline']()}</span>
          </p>
        )}
        {workspace.flavour === WorkspaceFlavour.AFFINE && workspace.public && (
          <p title={t['Published to Web']()}>
            <PublishIcon />
            <span>{t['Published to Web']()}</span>
          </p>
        )}
      </StyleWorkspaceInfo>
      <StyledSettingLink
        className="setting-entry"
        onClick={e => {
          e.stopPropagation();
          onSettingClick(workspace);
        }}
      >
        <SettingsIcon />
      </StyledSettingLink>
    </StyledCard>
  );
};
