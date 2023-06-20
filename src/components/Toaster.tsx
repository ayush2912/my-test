import styled from "styled-components";

import Icon from "./Icon";
import Text from "./Text";

type ToasterType = "success" | "warning" | "error" | "information";

interface IToasterProps {
  title: string;
  subTitle: string;
  type: ToasterType;
  onDismiss: () => void;
}

const ToasterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  position: fixed;
  width: fit-content;
  z-index: 100;
  top: 8px;
  transform: translateX(-50%);
  left: 50%;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 12px;
`;

const Toaster = ({ title, subTitle, type, onDismiss }: IToasterProps) => {
  const bgColor: string = {
    success: "#00A676",
    warning: "#E0A008",
    error: "#FF647C",
    information: "#8992A3",
  }[type];

  const iconName: string = {
    success: "toasterSuccess",
    warning: "toasterWarning",
    error: "toasterError",
    information: "toasterInformation",
  }[type];

  return (
    <ToasterContainer style={{ backgroundColor: bgColor }}>
      <Content>
        <Icon name={iconName} />
        <div
          style={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <div>
            <Text color="white" type="bodyBold">
              {title}
            </Text>
          </div>
          <div>
            {subTitle && (
              <Text color="white" type="caption">
                {subTitle}
              </Text>
            )}
          </div>
        </div>

        <div onClick={onDismiss} className="cursor-pointer">
          <Icon name="toasterClose" strokeColor="white" />
        </div>
      </Content>
    </ToasterContainer>
  );
};

export default Toaster;
