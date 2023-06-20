// import Icon from "assets/icons/Icon";

import styled from "styled-components";

type ToasterType = "success" | "warning" | "error" | "information";

interface IToasterProps {
  title: string;
  subTitle: string;
  type: ToasterType;
  onDismiss: () => void;
}

const ToasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 12px;
  box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  position: fixed;
  width: fit-content;
  transform: translateX(50%);
  z-index: 100;
  top: 38px;
`;

const Toaster = ({ title, subTitle, type, onDismiss }: IToasterProps) => {
  const bgColor: string = {
    success: "#00A676",
    warning: "#E0A008",
    error: "#FF647C",
    information: "#8992A3",
  }[type];

  return (
    <ToasterContainer
      style={{ backgroundColor: bgColor }}
      className=" top-[8px] left-2/4 -translate-x-1/2 py-3 px-4 rounded w-fit"
    >
      <div className="flex justify-evenly space-x-3.5 items-center  ">
        {/* <Icon name={type} height="22" width="22" color="white" /> */}
        <p className="text-[#FFFFFF] text-base font-semibold leading-6">
          {title}
        </p>
        <div onClick={onDismiss} className="cursor-pointer">
          {/* <Icon name="cross" height="22" width="22" color="white" thickness="2" /> */}
        </div>
      </div>
      {subTitle && (
        <div>
          <p className="text-[#FFFFFF] text-sm font-normal  text-center leading-4">
            {subTitle}
          </p>
        </div>
      )}
    </ToasterContainer>
  );
};

export default Toaster;
