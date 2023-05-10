import { useRef, useState } from "react";
import Flag from "react-world-flags";
import styled from "styled-components";

import EyeButton from "@/components/EyeButton";
import { useOutsideAlerter } from "@/hooks/useOutsiderAlerter";

import { BarPopup } from "./BarPopup";
import { type } from "../../StatusTag";
import Text from "../../Text";
import { IBar } from "../GanttChart.types";
import useGanttChartControls from "../useGanttChartControls";

const FlagHolder = styled.div`
  height: 12px;
  width: 22px;
  margin-right: 8px;
`;
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
  gap: 4px;
`;

const CountryList = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 0px;
  user-select: none;
`;

const Bar = styled.div<IBar & { focus: boolean }>`
  display: flex;
  align-items: center;
  height: 24px;
  max-width: ${({ width }) => width}px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${({ focus }) => (focus ? "text-decoration: underline" : "")}
`;

export const ProjectBar = ({ projectData }: { projectData: any }) => {
  const { view } = useGanttChartControls();
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
  console.log(projectData);
  return (
    <Container>
      <Bar
        ref={popupRef}
        width={projectData.bar.width[view]}
        offsetFromLeft={projectData.bar.offsetFromLeft[view]}
        onMouseDown={handleContainerMouseDown}
        focus={showPopup}
      >
        {showPopup && (
          <BarPopup top={popupPosition.top} left={popupPosition.left}>
            <ModalHeader>
              <Text type="captionBold" color="default">
                {projectData.name}
              </Text>
              <EyeButton
                onClick={() => {
                  console.log("clicked");
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
                      <CountryList key={country?.iso3Name}>
                        <FlagHolder>
                          <Flag code={country?.iso3Name} />
                        </FlagHolder>
                        <div>
                          <Text type="caption" color="default">
                            {country?.name}
                          </Text>
                        </div>
                      </CountryList>
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
        <Text type="bodyBold" color="default">
          {projectData.name}
        </Text>
      </Bar>
    </Container>
  );
};
