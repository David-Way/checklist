import { Button, Field, FlexContainer, Label, Stack } from "@components";
import {
  type ArrayFieldItemTemplateProps,
  type ArrayFieldTemplateProps,
  buttonId,
  canExpand,
  descriptionId,
  type FieldTemplateProps,
  type FormContextType,
  getSubmitButtonOptions,
  getTemplate,
  getUiOptions,
  type ObjectFieldTemplatePropertyType,
  type ObjectFieldTemplateProps,
  type RJSFSchema,
  type StrictRJSFSchema,
  type SubmitButtonProps,
  titleId,
} from "@rjsf/utils";
import { type CSSProperties } from "react";
import { SubmitButton } from "./CustomTemplates/SubmitButton";

function CustomFieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    style,
    label,
    help,
    required,
    description,
    errors,
    children,
  } = props;

  console.log(">> field", props);
  return (
    <Stack spacing="16" className={classNames} style={style}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {/* {description} */}
      {children}
      {errors}
      {help}
    </Stack>
  );
}

/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateProps` props for the component
 */
function CustomArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    canAdd,
    className,
    disabled,
    fieldPathId,
    uiSchema,
    items,
    optionalDataControl,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate<
    "ArrayFieldDescriptionTemplate",
    T,
    S,
    F
  >("ArrayFieldDescriptionTemplate", registry, uiOptions);
  const ArrayFieldTitleTemplate = getTemplate<
    "ArrayFieldTitleTemplate",
    T,
    S,
    F
  >("ArrayFieldTitleTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  const showOptionalDataControlInTitle = !readonly && !disabled;
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <Stack spacing="4" as="fieldset" className={className} id={fieldPathId.$id}>
      <ArrayFieldTitleTemplate
        fieldPathId={fieldPathId}
        title={uiOptions.title || title}
        required={required}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
        optionalDataControl={
          showOptionalDataControlInTitle ? optionalDataControl : undefined
        }
      />
      <ArrayFieldDescriptionTemplate
        fieldPathId={fieldPathId}
        description={uiOptions.description || schema.description}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
      />
      {!showOptionalDataControlInTitle ? optionalDataControl : undefined}
      <Stack spacing="12" className="row array-item-list">
        {items}
      </Stack>
      {canAdd && (
        <AddButton
          id={buttonId(fieldPathId, "add")}
          className="rjsf-array-item-add"
          onClick={onAddClick}
          disabled={disabled || readonly}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </Stack>
  );
}

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldItemTemplateProps` props for the component
 */
function CustomArrayFieldItemTemplate<
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

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
function CustomObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ObjectFieldTemplateProps<T, S, F>) {
  const {
    className,
    description,
    disabled,
    formData,
    fieldPathId,
    onAddProperty,
    optionalDataControl,
    properties,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
  } = props;
  const options = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate", T, S, F>(
    "TitleFieldTemplate",
    registry,
    options,
  );
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, options);

  // For "pure union" schemas (oneOf/anyOf without properties), skip rendering the empty fieldset wrapper.
  // The AnyOfField/OneOfField will handle rendering the union selector and selected variant's content directly.
  const isPureUnionSchema =
    (schema.oneOf || schema.anyOf) &&
    !schema.properties &&
    properties.length === 0;

  if (isPureUnionSchema) {
    return null;
  }

  const showOptionalDataControlInTitle = !readonly && !disabled;
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <Stack
      as="fieldset"
      spacing="24"
      className={className}
      id={fieldPathId.$id}
    >
      {title && (
        <TitleFieldTemplate
          id={titleId(fieldPathId)}
          title={title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
          optionalDataControl={
            showOptionalDataControlInTitle ? optionalDataControl : undefined
          }
        />
      )}
      {description && (
        <DescriptionFieldTemplate
          id={descriptionId(fieldPathId)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {!showOptionalDataControlInTitle ? optionalDataControl : undefined}
      {properties.map((prop: ObjectFieldTemplatePropertyType) => prop.content)}
      {canExpand<T, S, F>(schema, uiSchema, formData) && (
        <AddButton
          id={buttonId(fieldPathId, "add")}
          className="rjsf-object-property-expand"
          onClick={onAddProperty}
          disabled={disabled || readonly}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </Stack>
  );
}

export default {
  ButtonTemplates: { SubmitButton },
  FieldTemplate: CustomFieldTemplate,
  ArrayFieldTemplate: CustomArrayFieldTemplate,
  ArrayFieldItemTemplate: CustomArrayFieldItemTemplate,
  ObjectFieldTemplate: CustomObjectFieldTemplate,
};
