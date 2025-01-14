import styled from "@emotion/styled";
import { Key } from "rc-table/lib/interface";
import { useCallback, useEffect, useState } from "react";

import Icon from "@reearth-cms/components/atoms/Icon";
import Spin from "@reearth-cms/components/atoms/Spin";
import Tree, { DataNode, TreeProps } from "@reearth-cms/components/atoms/Tree";
import { ArchiveExtractionStatus, AssetFile } from "@reearth-cms/components/molecules/Asset/types";
import { useT } from "@reearth-cms/i18n";

type Props = {
  file: AssetFile;
  assetBaseUrl: string;
  archiveExtractionStatus: ArchiveExtractionStatus;
  setAssetUrl: (url: string) => void;
};

type FileNode = DataNode & {
  file: AssetFile;
};

const UnzipFileList: React.FC<Props> = ({
  file,
  assetBaseUrl,
  archiveExtractionStatus,
  setAssetUrl,
}) => {
  const t = useT();

  const [expandedKeys, setExpandedKeys] = useState<FileNode["key"][]>(["0"]);
  const [selectedKeys, setSelectedKeys] = useState<FileNode["key"][]>([]);
  const [treeData, setTreeData] = useState<FileNode[]>([]);

  const getTreeData = useCallback(
    (file: AssetFile, parentKey?: string): FileNode[] =>
      file.children?.map((child: AssetFile, index: number) => {
        let children: FileNode[] = [];
        const key = parentKey ? `${parentKey}-${index}` : `${index}`;

        if (child.children && child.children.length > 0) {
          children = getTreeData(child, key);
        }

        return {
          title: (
            <>
              {child.name}
              <CopyIcon
                selected={selectedKeys[0] === key}
                icon="copy"
                onClick={() => {
                  navigator.clipboard.writeText(assetBaseUrl + child.path);
                }}
              />
            </>
          ),
          key: key,
          children: children,
          file: child,
        };
      }) || [],
    [selectedKeys, assetBaseUrl],
  );

  const constructFileTree = useCallback(
    (file?: AssetFile): FileNode[] => {
      if (!file?.filePaths) return [];

      const root: AssetFile = {
        ...file,
        path: "/",
        children: [],
      };

      for (const filepath of file.filePaths) {
        const parts = filepath.split("/");
        let currentNode = root;

        for (const part of parts.slice(1)) {
          const existingNode = currentNode.children?.find(node => node.name === part);
          if (!existingNode) {
            const newNode: AssetFile = {
              name: part,
              path: `${currentNode.path}${part}${/\.[^.]+$/.test(part) ? "" : "/"}`,
              children: [],
            };

            currentNode.children?.push(newNode);
            currentNode = newNode;
          } else {
            currentNode = existingNode;
          }
        }
      }

      return getTreeData(root);
    },
    [getTreeData],
  );

  useEffect(() => {
    setTreeData(constructFileTree(file));
  }, [file, constructFileTree]);

  const previewFile = useCallback(
    (file: AssetFile) => {
      setAssetUrl(assetBaseUrl + file.path);
    },
    [assetBaseUrl, setAssetUrl],
  );

  const onSelect: TreeProps<FileNode>["onSelect"] = useCallback(
    (keys: Key[], { node: { file } }: { node: FileNode }) => {
      if (!keys[0] || keys[0] === selectedKeys[0]) return;
      previewFile(file);
      setSelectedKeys(keys);
    },
    [previewFile, selectedKeys],
  );

  const onExpand: TreeProps["onExpand"] = (keys: Key[]) => {
    setExpandedKeys([...keys]);
  };

  return (
    <UnzipFileListWrapper>
      {archiveExtractionStatus === "IN_PROGRESS" || archiveExtractionStatus === "PENDING" ? (
        <ExtractionInProgressWrapper>
          <Spin tip={t("Decompressing...")} size="large" />
        </ExtractionInProgressWrapper>
      ) : archiveExtractionStatus === "FAILED" ? (
        <ExtractionFailedWrapper>
          <ExtractionFailedIcon icon="closeCircle" color="#FF4D4F" size="56px" />
          <ExtractionFailedText>
            {t("Failed to decompress. Please check the file and try again.")}
          </ExtractionFailedText>
        </ExtractionFailedWrapper>
      ) : (
        <Tree
          switcherIcon={<Icon icon="caretDown" />}
          expandedKeys={[...expandedKeys]}
          selectedKeys={[...selectedKeys]}
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
          multiple={false}
          showLine
        />
      )}
    </UnzipFileListWrapper>
  );
};

const UnzipFileListWrapper = styled.div`
  height: 250px;
  overflow-y: scroll;
  background-color: #f5f5f5;
`;

const ExtractionInProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ExtractionFailedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ExtractionFailedIcon = styled(Icon)`
  margin-bottom: 28px;
`;

const CopyIcon = styled(Icon)<{ selected?: boolean }>`
  margin-left: 16px;
  visibility: ${({ selected }) => (selected ? "visible" : "hidden")};
  &:active {
    color: #096dd9;
  }
`;

const ExtractionFailedText = styled.p`
  margin-bottom: 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
`;

export default UnzipFileList;
