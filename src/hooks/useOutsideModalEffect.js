import { useEffect, useRef } from "react";

function useOutsideModalEffect({ callback }) {
  const ref = useRef();

  useEffect(
    function () {
      function handleEvent(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          callback();
        }
      }

      document.addEventListener("click", handleEvent, true);

      return () => document.removeEventListener("click", handleEvent, true);
    },
    [callback, ref]
  );

  return { ref };
}

export default useOutsideModalEffect;
