import { useEffect, RefObject } from "react";

type EventHandler = (event: MouseEvent) => void;

export function useOutsideAlerter(ref: RefObject<HTMLElement>, cb: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
