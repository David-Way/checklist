import { Button, FlexContainer } from "@components";
import { getSubmitButtonOptions, type SubmitButtonProps } from "@rjsf/utils";

export default function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <FlexContainer className="u-pv:24 u-ph:16">
      <Button type="submit">Submit</Button>
    </FlexContainer>
  );
}
