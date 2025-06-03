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
  size?: number;
  noScaleHover?: boolean;
}

export default function ToolIcon(
  {
    children,
    bgColor,
    textColor = "white",
    tooltip,
    size = 48,
    noScaleHover = false,
    style,
    className,
    ...props
  }: ToolIconProps,
) {
  return (
    <div
      className={`tool-icon ${noScaleHover ? "no-scale-hover" : ""} ${
        className || ""
      }`}
      style={{
        backgroundColor: bgColor,
        height: size,
        width: size,
        ...style,
      }}
      {...props}
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

export function ToolIconList(
  { list, size = 48, noScaleHover = false }: {
    list: string[];
    size?: number;
    noScaleHover?: boolean;
  },
) {
  return (
    <>
      {list.includes("typescript") && (
        <ToolIcon
          bgColor="#3178c6"
          tooltip="TypeScript"
          size={size}
          noScaleHover={noScaleHover}
        >
          <TypeScriptLogo className="h-full w-full" />
        </ToolIcon>
      )}
      {list.includes("javascript") && (
        <ToolIcon
          bgColor="#f7df1e"
          textColor="black"
          tooltip="JavaScript"
          size={size}
          noScaleHover={noScaleHover}
        >
          <JavaScriptLogo className="h-full w-full" fill="black" />
        </ToolIcon>
      )}
      {list.includes("python") &&
        (
          <ToolIcon
            bgColor="#327EBD"
            tooltip="Python"
            size={size}
            noScaleHover={noScaleHover}
          >
            {/* fill="#FFDA4B" */}
            <PythonLogo className="h-full w-full" fill="white" />
          </ToolIcon>
        )}
      {list.includes("react") && (
        <ToolIcon
          bgColor="#087ea4"
          tooltip="React"
          size={size}
          noScaleHover={noScaleHover}
        >
          <ReactLogo className="h-full w-full" />
        </ToolIcon>
      )}
      {list.includes("pytorch") &&
        (
          <ToolIcon
            bgColor="#ee4c2c"
            tooltip="Pytorch"
            size={size}
            noScaleHover={noScaleHover}
          >
            <PytorchLogo className="h-full w-full" fill="white" />
          </ToolIcon>
        )}
      {list.includes("tailwind") && (
        <ToolIcon
          bgColor="#38bdf8"
          tooltip="Tailwind"
          size={size}
          noScaleHover={noScaleHover}
        >
          <TailwindLogo className="h-full w-full" fill="white" />
        </ToolIcon>
      )}
      {list.includes("vite") && (
        <ToolIcon
          bgColor="#8b73fe"
          tooltip="Vite"
          size={size}
          noScaleHover={noScaleHover}
        >
          <ViteLogo className="h-full w-full" fill="white" />
        </ToolIcon>
      )}
      {list.includes("express") && (
        <ToolIcon
          bgColor="white"
          textColor="black"
          tooltip="Express"
          size={size}
          noScaleHover={noScaleHover}
        >
          <ExpressLogo className="h-full w-full" fill="black" />
        </ToolIcon>
      )}
      {list.includes("nodejs") && (
        <ToolIcon
          bgColor="#3c873a"
          tooltip="Node"
          size={size}
          noScaleHover={noScaleHover}
        >
          <NodeJSLogo className="h-full w-full" fill="white" />
        </ToolIcon>
      )}
    </>
  );
}
