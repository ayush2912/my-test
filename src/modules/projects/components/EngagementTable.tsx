import { useState } from "react";
import styled from "styled-components";

import TaskList, { TaskListProps } from "./TaskList";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import LabelValue from "../../../components/labelValuePair";
import Modal from "../../../components/Modal";
import StatusTag, { StatusType } from "../../../components/StatusTag";
import Text from "../../../components/Text";
import { convertToEuropeanDateFormat } from "../../../utils/dateTimeFormatter";

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

type EngamentStateTypes =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DISCONTINUED"
  | "COMPLETED"
  | "OVERDUE";

export interface EngagementItem {
  name: string;
  state: EngamentStateTypes;
  startDate: Date;
  dueDate: Date;
  note: string;
  document: number;
  attributes: { label: string; value: string }[];
  tasks: TaskListProps[];
}

interface EngagementStatus {
  label: EngamentStateTypes;
  type: StatusType;
}

function EngagementTable({
  headers,
  tableData,
}: {
  headers: { name: string; fieldName: string }[];
  tableData: EngagementItem[];
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
      engagements: (
        <>
          <ColumnWrapper>
            <RowWrapper>
              <Text type="bodyBold">{v.name}</Text>
              <InfoButton
                onClick={() => {
                  setShowEngagments(true);
                }}
              >
                <Icon name="information" size="small" />
              </InfoButton>
            </RowWrapper>

            <Text type="caption" color="subdued">
              {`${v.tasks.length} tasks`}
              <span> &bull; </span>
              {`Completed on DD/MM/YYYY`}
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
              <DividerDiv></DividerDiv>

              {v.attributes.map((attribute, index) => {
                return (
                  <LabelValue
                    key={index}
                    label={attribute?.label}
                    value={attribute?.value}
                  />
                );
              })}
            </ModalContent>
          </Modal>
        </>
      ),
      startDate: (
        <Text type="body" color={"subdued"}>
          {convertToEuropeanDateFormat(v.startDate)}
        </Text>
      ),
      dueDate: (
        <Text type="body" color={v.state === "OVERDUE" ? "warning" : "subdued"}>
          {convertToEuropeanDateFormat(v.dueDate)}
        </Text>
      ),
      state: <StatusTag name={statusTag.label} type={statusTag.type} />,
      note: (
        <>
          <Button type="ghost" onClick={() => setShowNote(true)}>
            <Icon name="message" />
          </Button>
          <Modal
            isOpen={showNote}
            onClose={() => {
              setShowNote(false);
            }}
            title="Note"
          >
            <Text type="body" color="default">
              {v.note}
            </Text>
          </Modal>
        </>
      ),
      documents: (
        <Button type="ghost" onClick={() => setShowNote(true)}>
          <Icon name="file" />
          <Text type="bodyBold">{20}</Text>
        </Button>
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
              key={v.name}
              name={v.name}
              startDate={v.startDate}
              dueDate={v.dueDate}
              status={isEngamentDiscontinued ? "DISCONTINUED" : v.status}
            />
          ))}
        </TaskListCell>
      ),
    };
  };

  return (
    <Card width={850}>
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
    </Card>
  );
}

export default EngagementTable;
