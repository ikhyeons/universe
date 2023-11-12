import { useEffect, useState } from "react";
import "./summary.scss";
import { useRecoilState } from "recoil";
import { aSummary } from "../utils/recoilStore";
function Summary() {
  const [summary] = useRecoilState(aSummary);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log(summary.text);
    document.addEventListener("mousemove", (e) => {
      if (summary.isOn) {
        setPosition({ x: e.screenX, y: e.screenY });
      }
    });
  }, [summary.text]);
  return (
    summary.isOn && (
      <div
        className="summaryBox"
        style={{
          transform: `translate(${position.x}px, ${position.y - 100}px)`,
        }}
      >
        {summary.text}
      </div>
    )
  );
}

export default Summary;
