import "./button.scss";
import { FlexContainer } from "@components";
import classNames from "classnames";

// Define the prop types using an interface
export interface ButtonProps {
  /** kind of button */
  kind?: "primary" | "secondary" | "ghost";
  /** size of button */
  size?: "small" | "x-small";
  /** children to be placed inside of button */
  children?: React.ReactNode;
  /** additional styling for the containing element */
  className?: string;
  // allow any other props that a button might accept (e.g. onClick, type)
  // biome-ignore lint/suspicious/noExplicitAny: Other props could be anything
  [key: string]: any;
}

const Header: React.FC<ButtonProps> = ({
  as: Element = "button",
  className,
  kind,
  size,
  children,
  ...otherProps
}) => {
  const buttonStyles = classNames([
    "c-button",
    {
      "c-button--secondary": kind === "secondary",
      "c-button--ghost": kind === "ghost",
      [`c-button--${size}`]: size,
    },
    className,
  ]);

  return (
    <FlexContainer
      as={Element}
      innerContainerAs="span"
      className={buttonStyles}
      spacing="08"
      align="center"
      {...otherProps}
    >
      {children}
    </FlexContainer>
  );
};

export default Header;
