import classNames from "classnames";
import { Children, cloneElement } from "react";
import "./stack.scss";

export type StackSpacing =
  | "form"
  | "02"
  | "04"
  | "08"
  | "12"
  | "16"
  | "24"
  | "32"
  | "48"
  | "64"
  | "72";

export interface StackProps {
  /** overrides the DOM element or React component rendered as the root element */
  as?: keyof React.JSX.IntrinsicElements | React.ElementType;

  /** specifies the size of the spacing between child elements */
  spacing?: StackSpacing;

  /** the element after which to split the stack with an auto margin */
  splitAfter?: number;

  /** children to be stacked vertically */
  children?: React.ReactNode;

  /** additional styling for the containing element */
  className?: string;
}

const Stack = ({
  spacing,
  splitAfter,
  children,
  as: Element = "div",
  className,
  ...otherProps
}) => {
  const stackStyles = classNames([
    "l-stack",
    {
      [`l-stack--${spacing}`]: spacing,
    },
    className,
  ]);
  const arrayChildren = Children.toArray(children);

  return (
    <Element className={stackStyles} {...otherProps}>
      {Children.map(arrayChildren, (child, index) => {
        const isSplit = index === splitAfter;
        if (isSplit) {
          return cloneElement(child, {
            style: { marginBlockEnd: "auto !important" },
          });
        }

        return child;
      })}
    </Element>
  );
};

export default Stack;
