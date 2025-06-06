import ReverseWaveDiv from "@/components/Atoms/WaveSVG";
import type { ReactNode } from "react";
import TypeScriptLogo from "../../assets/logo/TypescriptNoBorder.svg?react";
import "./IconSquare.style.scss";

interface IconSquareProps {
  backgroundColor?: string;
  description?: string;
  children?: ReactNode;
  showWave?: boolean;
  waveProgress?: number;
  size?: number;
  textColor?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

export default function IconSquare(
  {
    backgroundColor,
    description,
    children,
    showWave = false,
    waveProgress = 0.5,
    size = 64,
    textColor = "white",
    containerClassName,
    containerStyle,
  }: IconSquareProps,
) {
  return (
    <div
      className={"icon-square-container" +
        (containerClassName ? ` ${containerClassName}` : "")}
      style={containerStyle}
    >
      <div
        className="description"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        {description}
      </div>
      <div
        className="logo-container"
        style={{
          backgroundColor: backgroundColor,
          height: size,
          width: size,
          borderRadius: 12,
        }}
      >
        {children}
        {showWave && (
          <ReverseWaveDiv
            className="progress-wave"
            level={waveProgress}
            style={{
              backgroundColor: "#0005",
              // background: "linear-gradient(0deg,#0006 0%, #0004 100%)"
            }}
          />
        )}
      </div>
    </div>
  );
}

import DockerLogo from "@/assets/logo/devicon/docker-plain.svg?react";
import FastAPILogo from "@/assets/logo/devicon/fastapi-original.svg?react";
import GradioLogo from "@/assets/logo/gradio.svg?react";
import MediawikiLogo from "@/assets/logo/mediawiki.svg?react";
import CLogo from "../../assets/logo/c_bw.svg?react";
import CSharpLogo from "../../assets/logo/c_sharp.svg?react";
import CSSLogo from "../../assets/logo/devicon/css3-plain.svg?react";
import ReactLogo from "../../assets/logo/devicon/react-original.svg?react";
import ExpressLogo from "../../assets/logo/express.svg?react";
import JavaLogo from "../../assets/logo/java.svg?react";
import JavaScriptLogo from "../../assets/logo/js.svg?react";
import NodeJSLogo from "../../assets/logo/node.svg?react";
import PythonLogo from "../../assets/logo/python.svg?react";
import PytorchLogo from "../../assets/logo/pytorch.svg?react";
import RustLogo from "../../assets/logo/rust.svg?react";
import TailwindLogo from "../../assets/logo/Tailwind.svg?react";
import ViteLogo from "../../assets/logo/ViteBlack.svg?react";

interface IconSquareGeneratorProps extends IconSquareProps {
  toolList: string[];
}

export function IconSquareGenerator(
  { toolList, ...props }: IconSquareGeneratorProps,
) {
  return (
    <>
      {toolList.includes("typescript") && (
        <IconSquare
          backgroundColor="#3178c6"
          description="TypeScript"
          {...props}
        >
          <TypeScriptLogo className="icon" />
        </IconSquare>
      )}
      {toolList.includes("javascript") && (
        <IconSquare
          backgroundColor="#f7df1e"
          description="JavaScript"
          textColor="black"
          {...props}
        >
          <JavaScriptLogo className="icon" fill="black" />
        </IconSquare>
      )}
      {toolList.includes("python") && (
        <IconSquare
          backgroundColor="#327EBD"
          description="Python"
          {...props}
        >
          <PythonLogo className="icon" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("react") && (
        <IconSquare
          backgroundColor="#087ea4"
          description="React"
          {...props}
        >
          <ReactLogo className="icon" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("c") && (
        <IconSquare
          backgroundColor="#084a86"
          description="C"
          {...props}
        >
          <CLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("c#") && (
        <IconSquare
          backgroundColor="#66217b"
          description="C#"
          {...props}
        >
          <CSharpLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("java") && (
        <IconSquare
          backgroundColor="#5283a2"
          description="Java"
          {...props}
        >
          <JavaLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}

      {toolList.includes("rust") && (
        <IconSquare
          backgroundColor="#f74c00"
          description="Rust"
          {...props}
        >
          <RustLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("css") && (
        <IconSquare
          backgroundColor="#264de4"
          description="CSS"
          {...props}
        >
          <CSSLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("pytorch") && (
        <IconSquare
          backgroundColor="#ee4c2c"
          description="Pytorch"
          {...props}
        >
          <PytorchLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("tailwind") && (
        <IconSquare
          backgroundColor="#38bdf8"
          description="Tailwind"
          {...props}
        >
          <TailwindLogo className="icon" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("vite") && (
        <IconSquare
          backgroundColor="#8b73fe"
          description="Vite"
          {...props}
        >
          <ViteLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("express") && (
        <IconSquare
          backgroundColor="white"
          textColor="black"
          description="Express"
          {...props}
        >
          <ExpressLogo className="icon p-1" fill="black" />
        </IconSquare>
      )}
      {toolList.includes("nodejs") && (
        <IconSquare
          backgroundColor="#3c873a"
          description="Node"
          {...props}
        >
          <NodeJSLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("fastapi") && (
        <IconSquare
          backgroundColor="#049688"
          description="FastAPI"
          {...props}
        >
          <FastAPILogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("docker") && (
        <IconSquare
          backgroundColor="#019BC6"
          description="Docker"
          {...props}
        >
          <DockerLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("gradio") && (
        <IconSquare
          backgroundColor="#ff8008"
          description="Gradio"
          {...props}
        >
          <GradioLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
      {toolList.includes("mediawiki") && (
        <IconSquare
          backgroundColor="#fb5959"
          description="Mediawiki"
          {...props}
        >
          <MediawikiLogo className="icon p-1" fill="white" />
        </IconSquare>
      )}
    </>
  );
}
