import { useRef, useState } from "react";
import Flag from "react-world-flags";
import styled from "styled-components";

import { BarPopup } from "./BarPopup";
import { useOutsideAlerter } from "../../../hooks/useOutsiderAlerter";
import EyeButton from "../../EyeButton";
import Text from "../../Text";
import { IProjectBarData } from "../GanttChart.types";
import useGanttChartControls from "../useGanttChartControls";

export const ModalHeader = styled.div`
  width: 100%;
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
  align-items: center;
  gap: 4px;
`;

const CountriesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 18px;
  width: 58px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 0px;
  user-select: none;
`;

const Bar = styled.div<{
  width: number;
  offsetFromLeft: number;
  focus: boolean;
}>`
  display: flex;
  align-items: center;
  height: 24px;
  max-width: ${({ width }) => width}px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  cursor: pointer;
  overflow: visible;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }

  ${({ focus }) => (focus ? "text-decoration: underline" : "")}
`;

const TextWrapper = styled.div`
  width: 224px;
  white-space: normal;
`;

export const ProjectBar = ({
  projectData,
}: {
  projectData: IProjectBarData;
}) => {
  const { view } = useGanttChartControls();
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const projectTypes: string = projectData.types
    .map((type: { id: string; name: string }) => type.name)
    .join(", ");
  const barRef = useRef(null);
  const popupRef = useRef(null);

  useOutsideAlerter(barRef, () => {
    if (showPopup) setShowPopup(false);
  });

  const handleContainerMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setShowPopup(true);
    setPopupPosition({ top: event.clientY, left: event.clientX });
  };

  const handlePopupMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <Container>
      <Bar
        ref={barRef}
        width={projectData.bar.width[view]}
        offsetFromLeft={projectData.bar.offsetFromLeft[view]}
        onMouseDown={handleContainerMouseDown}
        focus={showPopup}
      >
        {showPopup && (
          <BarPopup
            ref={popupRef}
            onMouseDown={handlePopupMouseDown}
            top={popupPosition.top}
            left={popupPosition.left}
          >
            <ModalHeader>
              <TextWrapper>
                <Text type="captionBold" color="default">
                  {projectData.name}
                </Text>
              </TextWrapper>

              <EyeButton
                onClick={() => {
                  projectData.onViewClick(projectData.id);
                }}
              />
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
                <div style={{ display: "flex", gap: "8px" }}>
                  {projectData.countries.map(
                    (country: { iso3Name: string; name: string }) => (
                      <CountriesContainer key={country?.iso3Name}>
                        <Flag
                          code={country?.iso3Name}
                          width={17}
                          height={9}
                          style={{ marginRight: "8px" }}
                        />

                        <Text type="caption" color="default">
                          {country?.name}
                        </Text>
                      </CountriesContainer>
                    ),
                  )}
                </div>
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
        <Text type={showPopup ? "linkTextBold" : "bodyBold"} color="default">
          {projectData.name}
        </Text>
      </Bar>
    </Container>
  );
};
