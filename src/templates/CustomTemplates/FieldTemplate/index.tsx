import { Label, Stack } from "@components";
import type { FieldTemplateProps } from "@rjsf/utils";

export default function FieldTemplate(props: FieldTemplateProps) {
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
