// import { useState, useRef, useEffect } from "react";
// import ReactDOM from "react-dom";
// import styled, { css } from "styled-components";

// interface TooltipProps {
//   data: string;
// }

// const TooltipSpan = styled.span<{ visible: boolean }>`
//   position: absolute;
//   z-index: 100;
//   max-height: 96px;
//   width: 200px;
//   padding: 2px 4px;
//   text-align: center;
//   border-radius: 0.375rem;
//   color: #363c46;
//   font-size: 12px;
//   line-height: 1.2;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   font-weight: normal;
//   background-color: white;
//   ${(props) =>
//     props.visible
//       ? css``
//       : css`
//           visibility: hidden;
//         `}
// `;

// const TooltipIcon = styled(Icon)<IconProps>`
//   margin-left: 10px;
//   position: relative;
// `;

// const Tooltip: React.FC<TooltipProps> = ({ data }) => {
//   const [visible, setVisible] = useState(false);
//   const triggerRef = useRef<HTMLSpanElement>(null);
//   const tooltipRef = useRef<HTMLSpanElement>(null);
//   const portalElement = document.getElementById("tooltip-portal");

//   useEffect(() => {
//     if (visible && triggerRef.current && tooltipRef.current) {
//       const triggerRect = triggerRef.current.getBoundingClientRect();
//       tooltipRef.current.style.left = `${triggerRect.right + 10}px`;
//       tooltipRef.current.style.top = `${
//         triggerRect.top +
//         window.pageYOffset -
//         tooltipRef.current.offsetHeight / 2
//       }px`;
//     }
//   }, [visible]);

//   return (
//     <>
//       <TooltipIcon
//         ref={triggerRef}
//         width={16}
//         height={16}
//         stroke="#8992A3"
//         onMouseEnter={() => setVisible(true)}
//         onMouseLeave={() => setVisible(false)}
//       />
//       {visible && portalElement
//         ? ReactDOM.createPortal(
//             <TooltipSpan
//               ref={tooltipRef}
//               style={{ position: "absolute" }}
//               visible={visible}
//             >
//               {data}
//             </TooltipSpan>,
//             portalElement,
//           )
//         : null}
//     </>
//   );
// };

export default Tooltip;
