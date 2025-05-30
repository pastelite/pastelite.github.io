import "./ToolIcon.style.css";

interface ToolsIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  color?: string;
  tooltip?: string;
}

export default function ToolsIcon(
  { children, color, tooltip, ...props }: ToolsIconProps,
) {
  return (
    <div
      className="tool-icon"
      style={{
        backgroundColor: color,
      }}
    >
      {children}
      {tooltip &&
        (
          <div
            className="tool-explain"
            style={{
              backgroundColor: color,
            }}
          >
            {tooltip}
          </div>
        )}
    </div>
  );
}
