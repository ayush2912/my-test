/* eslint-disable import/default */
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const NewTooltip = React.forwardRef(
  ({ data, visible }: { data: string; visible: boolean }, ref) => {
    //   const [visible, setVisible] = useState(false);
    //   const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const portalElement = document.getElementById("new-tooltip");

    useEffect(() => {
      if (visible && ref.current && tooltipRef.current) {
        const triggerRect = ref.current.getBoundingClientRect();
        tooltipRef.current.style.left = `${triggerRect.right + 10}px`;
        tooltipRef.current.style.top = `${
          triggerRect.top +
          window.pageYOffset -
          tooltipRef.current.offsetHeight / 2
        }px`;
      }
    }, [visible]);

    const TooltipContainer = styled.div`
    position: absolute;
    z-index: 100;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07));
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    max-height: 96px;
    width: 200px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 4px;
    padding-right: 4px;
    vertical-align: middle;
    border-radius: 0.5rem;
    color: #363c46;
    font-size: 12px;
    line-height: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    font-weight: normal;
    background-color: rgb(255 255 255);
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
  `;

    return (
      <>
        {/* <span
        ref={triggerRef}
        className="ml-[10px] relative group"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <Icon name="tooltipIcon" width="16" height="16" stroke="#8992A3" />
      </span> */}
        {visible && portalElement
          ? ReactDOM.createPortal(
              <span
                ref={tooltipRef}
                // className={`absolute z-[100] drop-shadow-md max-h-[96px] w-[200px] py-2 px-4 align-middle rounded-lg text-[#363C46] text-[12px] leading-4 shadow-md font-normal bg-white ${
                //   visible ? "" : "hidden"
                // }`}
                style={{
                  position: "absolute",
                  visibility: visible ? "" : "hidden",
                }}
              >
                <TooltipContainer>{data}</TooltipContainer>
              </span>,
              portalElement,
            )
          : null}
      </>
    );
  },
);

NewTooltip.displayName = "NewTooltip";

export default NewTooltip;
