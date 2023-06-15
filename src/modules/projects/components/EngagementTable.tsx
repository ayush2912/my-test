import { useState } from "react";
import styled from "styled-components";

import TaskList, { TaskListProps } from "./TaskList";
import HandShake from "../../../assets/images/HandShake.png";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import LabelValue from "../../../components/labelValuePair";
import Modal from "../../../components/Modal";
import StatusTag, { StatusType } from "../../../components/StatusTag";
import Text from "../../../components/Text";
import Tooltip from "../../../components/Tooltip";
import { convertToMonthNameFormat } from "../../../utils/dateTimeFormatter";

const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
`;

const TableHeader = styled.th`
  padding: 0px;
  text-align: left;
`;

const HeaderContent = styled.div`
  display: flex;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 16px 0px;
  height: 40px;
`;

const CellContent = styled.div`
  display: flex;
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 1px;
  align-items: center;

  &:first-child,
  &:last-child {
    padding-left: 0;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.neutral[100]};
  width: 100%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DividerCell = styled.td`
  padding: 0px;
`;

const TaskListCell = styled.td`
  padding: 0px;
  padding-bottom: 16px;
`;

const ChevronButtonIconWrapper = styled.div<{ isExpanded: boolean }>`
  width: 24px;
  height: 24px;
  transform: ${(props) => (props.isExpanded ? `rotate(180deg)` : "")};
  cursor: pointer;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DividerDiv = styled.div`
  height: 1px;
  background: #e1e4e8;
  margin: 24px 0px;
`;

const ModalContent = styled.div`
  max-width: 414px;
`;

const EmptyState = styled.div`
  padding-left: 20px;
  cursor: default;
`;

const TableTitle = styled.div`
  margin-bottom: 40px;
`;

const EmptyStateImageDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 53px 0px 36px 0px;
`;
const EmptyStateTextContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 308px;
  margin: auto;
  gap: 8px;
`;

type EngamentStateTypes =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DISCONTINUED"
  | "COMPLETED"
  | "OVERDUE";

export interface EngagementItem {
  id: string;
  name: string;
  state: EngamentStateTypes;
  startDate: Date;
  dueDate: Date;
  completedDate?: Date;
  notes: string;
  document: number;
  isOverdue: boolean;
  attributes: { name: string; value: string; type: string }[];
  tasks: TaskListProps[];
}

interface EngagementStatus {
  label: EngamentStateTypes;
  type: StatusType;
}

function EngagementTable({
  headers,
  tableData,
  onViewDocument,
}: {
  headers: { name: string; fieldName: string }[];
  tableData: EngagementItem[];
  onViewDocument: (id: string) => void;
}) {
  const cellContentMapper = (v: EngagementItem) => {
    const [showTasks, setShowTasks] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [showEngagments, setShowEngagments] = useState(false);
    const toggleTasks = () => setShowTasks(!showTasks);
    const statusTag = {
      NOT_STARTED: { label: "NOT STARTED", type: "disabled" },
      IN_PROGRESS: { label: "IN PROGRESS", type: "information" },
      DISCONTINUED: { label: "DISCONTINUED", type: "error" },
      COMPLETED: { label: "COMPLETED", type: "success" },
      OVERDUE: { label: "OVERDUE", type: "warning" },
    }[v.state] as EngagementStatus;
    const isEngamentDiscontinued = v.state === "DISCONTINUED";

    return {
      rowId: v.id,
      engagements: (
        <>
          <ColumnWrapper>
            <RowWrapper>
              <Text type="bodyBold">{v.name}</Text>
              <Tooltip text="ATTRIBUTES">
                <InfoButton
                  onClick={() => {
                    setShowEngagments(true);
                  }}
                >
                  <Icon name="information" size="small" />
                </InfoButton>
              </Tooltip>
            </RowWrapper>

            <Text type="caption" color="subdued">
              {`${v.tasks.length} tasks`}

              {v.state === "COMPLETED" && (
                <>
                  <span> &bull; </span>
                  <Text type="caption" color={"success"}>
                    Completed on{" "}
                    {v?.completedDate &&
                      convertToMonthNameFormat(v.completedDate)}
                  </Text>
                </>
              )}
            </Text>
          </ColumnWrapper>

          <Modal
            isOpen={showEngagments}
            onClose={() => {
              setShowEngagments(false);
            }}
            title="Engagement Attributes"
          >
            <ModalContent>
              <Text type="body" color="subdued">
                Registration has the following attributes. As soon as the Carbon
                Desk fills out the details, they will be available here for you
                to read.
              </Text>
              <DividerDiv />

              {v.attributes.map((attribute, index) => {
                return (
                  <LabelValue
                    key={index}
                    label={attribute?.name}
                    value={attribute?.value}
                    type={attribute?.type}
                  />
                );
              })}
            </ModalContent>
          </Modal>
        </>
      ),
      startDate: (
        <Text type="body" color={"subdued"}>
          {convertToMonthNameFormat(v.startDate)}
        </Text>
      ),
      dueDate: (
        <Text type="body" color={"subdued"}>
          {convertToMonthNameFormat(v.dueDate)}
        </Text>
      ),
      state: <StatusTag name={statusTag.label} type={statusTag.type} />,
      note: (
        <>
          {v.notes ? (
            <Button
              type="ghost"
              size="small"
              isIconButton
              onClick={() => setShowNote(true)}
            >
              <Icon name="message" />
            </Button>
          ) : (
            <EmptyState>
              <Text type="body" color="default">
                -
              </Text>
            </EmptyState>
          )}
          <Modal
            isOpen={showNote}
            onClose={() => {
              setShowNote(false);
            }}
            title="Note"
          >
            <Text type="body" color="default">
              {v.notes}
            </Text>
          </Modal>
        </>
      ),
      documents: (
        <>
          {v.document > 0 ? (
            <Button
              type="ghost"
              onClick={() => {
                onViewDocument(v.id);
              }}
              iconPosition="left"
            >
              <Icon name="file" />
              <Text type="bodyBold">{v.document}</Text>
            </Button>
          ) : (
            <EmptyState>
              <Text type="body" color="default">
                -
              </Text>
            </EmptyState>
          )}
        </>
      ),
      chevronButton: (
        <ChevronButtonIconWrapper isExpanded={showTasks} onClick={toggleTasks}>
          <Icon name="chevronButton" />
        </ChevronButtonIconWrapper>
      ),
      taskList: showTasks && (
        <TaskListCell colSpan={headers.length}>
          {v.tasks.map((v) => (
            <TaskList
              isOverdue={v.isOverdue}
              key={v.type}
              type={v.type}
              startDate={v.startDate}
              dueDate={v.dueDate}
              completedDate={v?.completedDate}
              state={isEngamentDiscontinued ? "DISCONTINUED" : v.state}
              assignee={v.assignee}
            />
          ))}
        </TaskListCell>
      ),
    };
  };

  return (
    <Card width={850}>
      <TableTitle>
        <Text color="default" type="heading3">
          Engagements & Tasks
        </Text>
      </TableTitle>

      <StyledTable>
        <thead>
          <tr>
            {headers.length > 0 &&
              headers.map((header, i) => {
                return (
                  <TableHeader key={i}>
                    <HeaderContent>
                      <Text type="smallTextBold" color="subdued">
                        {header.name}
                      </Text>
                    </HeaderContent>
                  </TableHeader>
                );
              })}
          </tr>
        </thead>

        <tbody>
          {tableData
            .map(cellContentMapper)
            .map((rowItem: any, rowIndex: number) => (
              <>
                <tr key={rowItem.rowId}>
                  {headers.map(({ fieldName }) => (
                    <TableCell key={fieldName}>
                      <CellContent>{rowItem[fieldName]}</CellContent>
                    </TableCell>
                  ))}
                </tr>

                <tr>{rowItem.taskList}</tr>

                {rowIndex !== tableData.length - 1 && (
                  <tr>
                    <DividerCell colSpan={headers.length}>
                      <Divider />
                    </DividerCell>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </StyledTable>

      {tableData.length === 0 && (
        <div>
          <EmptyStateImageDiv>
            <img src={HandShake} />
          </EmptyStateImageDiv>

          <EmptyStateTextContent>
            <Text color="default" type="heading3">
              No engagements listed yet
            </Text>

            <Text color="subdued" type="body">
              You will be notified when there are any updates about the
              engagements and tasks
            </Text>
          </EmptyStateTextContent>
        </div>
      )}
    </Card>
  );
}

export default EngagementTable;
