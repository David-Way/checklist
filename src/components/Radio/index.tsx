import {
  ariaDescribedByIds,
  enumOptionsIsSelected,
  enumOptionsValueForIndex,
  type FormContextType,
  optionId,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
} from "@rjsf/utils";
import "./radio.scss";
import { ConditionalContainer, FlexContainer, Label, Stack } from "@components";
import classNames from "classnames";
import { type FocusEvent, useCallback } from "react";

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */

function Radio<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  label,
  options,
  value,
  required,
  disabled,
  readonly,
  autofocus = false,
  onBlur,
  onFocus,
  onChange,
  id,
  htmlName,
  className,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, inline, emptyValue } = options;
  const isInline = inline || options?.inline;
  const handleBlur = useCallback(
    ({ target }: FocusEvent<HTMLInputElement>) =>
      onBlur(
        id,
        enumOptionsValueForIndex<S>(target?.value, enumOptions, emptyValue),
      ),
    [onBlur, enumOptions, emptyValue, id],
  );

  const handleFocus = useCallback(
    ({ target }: FocusEvent<HTMLInputElement>) =>
      onFocus(
        id,
        enumOptionsValueForIndex<S>(target?.value, enumOptions, emptyValue),
      ),
    [onFocus, enumOptions, emptyValue, id],
  );

  return (
    <Stack
      as="fieldset"
      spacing="8"
      className={classNames([
        "c-radio-group",
        {
          "c-radio-group--inline": isInline,
        },
        className,
      ])}
      id={id}
      role="radiogroup"
    >
      <Label as="legend" label={label} className="c-radio-group__label" />

      <ConditionalContainer
        condition={isInline}
        container={(children) => (
          <FlexContainer
            spacing={8}
            className="c-radio-group__container--inline"
          >
            {children}
          </FlexContainer>
        )}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, i) => {
            const checked = enumOptionsIsSelected<S>(option.value, value);
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            const disabledCls =
              disabled || itemDisabled || readonly ? "disabled" : "";

            const handleChange = () => onChange(option.value);

            return (
              <div className="c-radio" key={i}>
                <label className="c-radio__label">
                  <input
                    type="radio"
                    id={optionId(id, i)}
                    checked={checked}
                    name={htmlName || id}
                    required={required}
                    value={String(i)}
                    disabled={disabledCls}
                    autoFocus={autofocus && i === 0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    aria-describedby={ariaDescribedByIds(id)}
                  />
                  <span className="c-radio__label-text">{option.label}</span>
                </label>
              </div>
            );
          })}
      </ConditionalContainer>
    </Stack>
  );
}

export default Radio;
