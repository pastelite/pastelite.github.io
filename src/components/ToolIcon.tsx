import "./ToolIcon.style.css";
import ReactLogo from "../assets/logo/React.svg?react";
import PythonLogo from "../assets/logo/python.svg?react";
import TypeScriptLogo from "../assets/logo/TypescriptNoBorder.svg?react";
import JavaScriptLogo from "../assets/logo/js.svg?react";
import ViteLogo from "../assets/logo/ViteBlack.svg?react";
import TailwindLogo from "../assets/logo/Tailwind.svg?react";
import PytorchLogo from "../assets/logo/pytorch.svg?react";
import NodeJSLogo from "../assets/logo/node.svg?react";
import ExpressLogo from "../assets/logo/express.svg?react";

interface ToolIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  tooltip?: string;
}

export default function ToolIcon(
  { children, bgColor, textColor = "white", tooltip, ...props }: ToolIconProps,
) {
  return (
    <div
      className="tool-icon"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {children}
      {tooltip &&
        (
          <div
            className="tool-explain"
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            {tooltip}
          </div>
        )}
    </div>
  );
}

export function ToolIconList({ list }: { list: string[] }) {
  return (
    <>
      {list.includes("typescript") && (
        <ToolIcon bgColor="#3178c6" tooltip="TypeScript">
          <TypeScriptLogo className="h-full w-full" />
        </ToolIcon>
      )}
      {list.includes("javascript") && (
        <ToolIcon bgColor="#f7df1e" textColor="black" tooltip="JavaScript">
          <JavaScriptLogo className="h-full w-full" fill="black" />
        </ToolIcon>
      )}
      {list.includes("python") &&
        (
          <ToolIcon bgColor="#327EBD" tooltip="Python">
            {/* fill="#FFDA4B" */}
            <PythonLogo className="h-full w-full" fill="white" />
          </ToolIcon>
        )}
      {list.includes("react") && (
        <ToolIcon bgColor="#087ea4" tooltip="React">
          <ReactLogo className="h-full w-full" />
        </ToolIcon>
      )}
      {list.includes("pytorch") &&
        (
          <ToolIcon bgColor="#ee4c2c" tooltip="Pytorch">
            <PytorchLogo className="h-full w-full" fill="white" />
          </ToolIcon>
        )}
      {list.includes("tailwind") && (
        <ToolIcon bgColor="#38bdf8" tooltip="Tailwind">
          <TailwindLogo className="h-full w-full" fill="white" />
        </ToolIcon>
      )}
      {list.includes("vite") && (
        <ToolIcon bgColor="#8b73fe" tooltip="Vite">
          <ViteLogo className="h-full w-full" fill="white" />
        </ToolIcon>
      )}
      {list.includes("express") && (
        <ToolIcon bgColor="white" textColor="black" tooltip="Express">
          <ExpressLogo className="h-full w-full" fill="black" />
        </ToolIcon>
      )}
      {list.includes("nodejs") && (
        <ToolIcon bgColor="#3c873a" tooltip="Node">
          <NodeJSLogo className="h-full w-full" fill="white" />
        </ToolIcon>
      )}
    </>
  );
}
