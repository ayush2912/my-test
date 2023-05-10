import { useRef, useState } from "react";
import styled from "styled-components";

import { useOutsideAlerter } from "@/hooks/useOutsiderAlerter";

import { BarPopup } from "./BarPopup";
import Text from "../../Text";
import { IBar } from "../GanttChart.types";

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextHolder = styled.div`
  display: flex;
  gap: 4px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 0px;
  user-select: none;
`;

const Bar = styled.div<IBar>`
  display: flex;
  align-items: center;
  height: 24px;
  width: ${({ width }) => width}px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProjectBar = ({ projectData }: { projectData: any }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const projectTypes: string = projectData.types
    .map((type: { id: string; name: string }) => type.name)
    .join(", ");
  const popupRef = useRef(null);
  useOutsideAlerter(popupRef, () => {
    if (showPopup) setShowPopup(false);
  });

  const handleContainerMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setShowPopup(true);
    setPopupPosition({ top: event.clientY, left: event.clientX });
  };

  return (
    <Container>
      <Bar
        ref={popupRef}
        width={projectData.bar.width}
        offsetFromLeft={projectData.bar.offsetFromLeft}
        onMouseDown={handleContainerMouseDown}
      >
        {showPopup && (
          <BarPopup top={popupPosition.top} left={popupPosition.left}>
            <ModalHeader>
              <Text type="captionBold" color="default">
                {projectData.name}
              </Text>
              {/* <button>click</button> */}
            </ModalHeader>

            <ModalContent>
              <TextHolder>
                <Text type="caption" color="subdued">
                  Registry :
                </Text>
                <Text type="caption" color="default">
                  {projectData.registry.name}
                </Text>
              </TextHolder>

              <TextHolder>
                <Text type="caption" color="subdued">
                  Registry project ID :
                </Text>
                <Text type="caption" color="default">
                  {projectData.registryProjectId}
                </Text>
              </TextHolder>
              <TextHolder>
                <Text type="caption" color="subdued">
                  Countries :
                </Text>
                <Text type="caption" color="default">
                  {}
                </Text>
              </TextHolder>
              <TextHolder>
                <Text type="caption" color="subdued">
                  Project type :
                </Text>
                <Text type="caption" color="default">
                  {projectTypes}
                </Text>
              </TextHolder>
            </ModalContent>
          </BarPopup>
        )}
        <Text type="bodyBold" color="default">
          {projectData.name}
        </Text>
      </Bar>
    </Container>
  );
};
