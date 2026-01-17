import classNames from "classnames";
import "./tag.scss";

// Define the prop types using an interface
export interface TagProps {
  as: string;
  className: string;
  type: string;
  size: string;
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({
  as: Element = "span",
  className,
  type,
  size = "md",
  children,
  ...otherProps
}) => {
  return (
    <Element
      className={classNames([
        "c-tag",
        {
          [`c-tag--${type}`]: type,
          [`c-tag--size-${size}`]: size,
        },
        className,
      ])}
      {...otherProps}
    >
      {children}
    </Element>
  );
};

export default Tag;
