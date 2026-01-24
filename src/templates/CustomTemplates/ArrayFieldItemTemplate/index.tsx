import {
  type ArrayFieldItemTemplateProps,
  type FormContextType,
  getTemplate,
  getUiOptions,
  type RJSFSchema,
  type StrictRJSFSchema,
} from "@rjsf/utils";

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldItemTemplateProps` props for the component
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldItemTemplateProps<T, S, F>) {
  const {
    children,
    className,
    buttonsProps,
    displayLabel,
    hasDescription,
    hasToolbar,
    registry,
    uiSchema,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate<
    "ArrayFieldItemButtonsTemplate",
    T,
    S,
    F
  >("ArrayFieldItemButtonsTemplate", registry, uiOptions);
  return (
    <div className={className}>
      <div
        className={hasToolbar ? "col-xs-9 col-md-10 col-xl-11" : "col-xs-12"}
      >
        {children}
      </div>
      {hasToolbar && (
        <div className="col-xs-3 col-md-2 col-xl-1 array-item-toolbox">
          <div className="btn-group">
            <ArrayFieldItemButtonsTemplate {...buttonsProps} />
          </div>
        </div>
      )}
    </div>
  );
}
