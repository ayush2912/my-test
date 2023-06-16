// import { useRef, useEffect, ForwardedRef } from "react";
// import ReactDOM from "react-dom";
// import styled from "styled-components";

// const TooltipContainer = styled.div`
//   position: absolute;
//   z-index: 100;
//   max-height: 96px;
//   width: 200px;
//   padding: 2px 4px;
//   vertical-align: middle;
//   border-radius: 0.5rem;
//   color: #363c46;
//   font-size: 12px;
//   line-height: 1rem;
//   box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
//   font-weight: normal;
//   background-color: rgb(255 255 255);
//   bottom: 125%;
//   left: 50%;
//   transform: translateX(-50%);
// `;

// const NewTooltip = React.forwardRef(
//   (
//     { data, visible }: { data: string; visible: boolean },
//     ref: ForwardedRef<HTMLElement>,
//   ) => {
//     const tooltipRef = useRef(null);
//     const portalElement = document.getElementById("new-tooltip");

//     useEffect(() => {
//       if (visible && ref.current && tooltipRef.current) {
//         const triggerRect = ref.current.getBoundingClientRect();
//         tooltipRef.current.style.left = `${triggerRect.right + 10}px`;
//         tooltipRef.current.style.top = `${
//           triggerRect.top +
//           window.pageYOffset -
//           tooltipRef.current.offsetHeight / 2
//         }px`;
//       }
//     }, [visible, ref]);

//     return (
//       <>
//         {visible && portalElement
//           ? ReactDOM.createPortal(
//               <span
//                 ref={tooltipRef}
//                 style={{
//                   position: "absolute",
//                   visibility: visible ? "" : "hidden",
//                 }}
//               >
//                 <TooltipContainer>{data}</TooltipContainer>
//               </span>,
//               portalElement,
//             )
//           : null}
//       </>
//     );
//   },
// );

// NewTooltip.displayName = "NewTooltip";

// export default NewTooltip;
export const emptytempobj = {};
