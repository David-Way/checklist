import classNames from "classnames";
import "./flex-container.scss";

// Define the prop types using an interface
export interface FlexContainerProps {
  as: string;
  innerContainerAs: string;
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  as: Element = "div",
  innerContainerAs: InnerElement = "div",
  spacing,
  justify = "flex-start",
  wrap = "wrap",
  align = "flex-start",
  direction = "row",
  children,
  className,
  innerClassName,
  ...otherProps
}) => {
  const innerStyles = classNames([
    "l-flex-container__inner-container",
    {
      [`l-flex-container__inner-container--spacing:${spacing}`]: spacing,
      [`l-flex-container__inner-container--justify:${justify}`]: justify,
      [`l-flex-container__inner-container--wrap:${wrap}`]: wrap,
      [`l-flex-container__inner-container--align:${align}`]: align,
      [`l-flex-container__inner-container--direction:${direction}`]: direction,
    },
    innerClassName,
  ]);
  return (
    <Element
      className={classNames(["l-flex-container", className])}
      {...otherProps}
    >
      <InnerElement className={innerStyles}>{children}</InnerElement>
    </Element>
  );
};

export default FlexContainer;
