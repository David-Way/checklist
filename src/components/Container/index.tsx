import classNames from "classnames";
import "./container.scss";

export type ContainerMaxWidth =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "auto";

// Define the prop types using an interface
export interface ContainerProps {
  children: Node;
  as?: boolean;
  className?: string;
  maxWidth: ContainerMaxWidth;
}

const Container: React.FC<React.FC<ContainerProps>> = ({
  as: Element = "div",
  maxWidth = "auto",
  className,
  children,
}) => (
  <Element
    className={classNames(
      "l-container",
      {
        [`l-container--${maxWidth}`]: maxWidth,
      },
      className,
    )}
  >
    {children}
  </Element>
);

export default Container;
