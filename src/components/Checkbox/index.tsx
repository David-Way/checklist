import type { WidgetProps } from "@rjsf/utils";
import { useId } from "react";
import "./checkbox.scss";

const Checkbox = (props: WidgetProps) => {
  console.log("CBOX", props);
  const {
    schema: { label, description },
  } = props;

  const uuid = useId();

  return (
    <div className="c-checkbox">
      <label
        className="c-checkbox__label"
        {...(props.description ? { "aria-describedby": uuid } : {})}
      >
        <input
          type="checkbox"
          {...(props.value ? { checked: "checked" } : {})}
          name={`checkbox-${uuid}`}
          onClick={() => props.onChange(!props.value)}
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
