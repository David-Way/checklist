import "./label.scss";
import classNames from "classnames";

const REQUIRED_FIELD_SYMBOL = "*";

export type LabelProps = {
  /** The label for the field */
  label?: string;
  /** A boolean value stating if the field is required */
  required?: boolean;
  /** The id of the input field being labeled */
  id?: string;
  /** root element */
  as?: string;
  /** additional class names */
  className?: string;
};

/** Renders a label for a field
 *
 * @param props - The `LabelProps` for this component
 */
function Label(props: LabelProps) {
  const { label, required, id, as: Element = "label", className } = props;
  if (!label) {
    return null;
  }
  return (
    <Element className={classNames(["c-label", className])} htmlFor={id}>
      {label}
      {required && (
        <span className="c-label__required">{REQUIRED_FIELD_SYMBOL}</span>
      )}
    </Element>
  );
}

export default Label;
