import type { WidgetProps } from "@rjsf/utils";
import { useId } from "react";
import "./checkbox.scss";

const Checkbox = (props: WidgetProps) => {
  const {
    schema: { label, description, value, onChange },
  } = props;

  const uuid = useId();

  return (
    <div className="c-checkbox">
      <label
        className="c-checkbox__label"
        {...(description ? { "aria-describedby": uuid } : {})}
      >
        <input
          type="checkbox"
          {...(value ? { checked: "checked" } : {})}
          name={`checkbox-${uuid}`}
          // onClick={() => onChange(!value)}
          onClick={onChange}
        />
        <span className="c-checkbox__label-text">{String(label)}</span>
      </label>
      {description && (
        <p id={uuid} className="c-checkbox__description">
          {description}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
