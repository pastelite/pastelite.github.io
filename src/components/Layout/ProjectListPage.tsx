import { useState } from "react";
import ProjectList from "./ProjectList";

export default function ProjectListPage() {
  const [selected, setSelected] = useState(-1);
  function handleSelection(index: number) {
    if (index === selected) {
      setSelected(-1);
    } else {
      setSelected(index);
    }
  }

  return (
    <ProjectList
      style={{
        // width: selected > -1 ? "50%" : "100%",
        height: 1000,
        // scale: selected > -1 ? 0.8 : 1,
      }}
      numberOfColumns={3}
      className={`${selected === -1 ? "" : "show-description"}`}
    >
      {/* <div className="project-list-item" onClick={() => setSelected(0)}>Test Item</div> */}
      {[...Array(9)].map((_, index) => (
        <div
          className={`project-list-item ${
            selected === index ? "selected" : ""
          }`}
          key={index}
          onClick={() => handleSelection(index)}
        >
          Test Item {index}
        </div>
      ))}
    </ProjectList>
  );
}
