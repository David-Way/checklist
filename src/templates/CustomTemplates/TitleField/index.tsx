import type {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from "@rjsf/utils";
import "./title-field.scss";
import classNames from "classnames";

interface TitleFieldWithRootProps extends TitleFieldProps {
  isRootObject: boolean;
  style: object;
}

const REQUIRED_FIELD_SYMBOL = "*";

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: TitleFieldWithRootProps<T, S, F>) {
  const { id, title, required, optionalDataControl, isRootObject, style } =
    props;

  const TitleElement = isRootObject ? "h1" : "span";
  return (
    <legend
      className={classNames([
        "t-title-field",
        { "t-title-field--root": isRootObject },
      ])}
      id={id}
      style={style}
    >
      <TitleElement className="t-title-field__title">{title}</TitleElement>
      {required && (
        <span className="t-title-field__required-indicator">
          {REQUIRED_FIELD_SYMBOL}
        </span>
      )}
      {optionalDataControl && (
        <span className="pull-right" style={{ marginBottom: "2px" }}>
          {optionalDataControl}
        </span>
      )}
    </legend>
  );
}
