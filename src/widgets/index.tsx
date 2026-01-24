import { Checkbox, Radio } from "@components";
import type { RegistryWidgetsType, WidgetProps } from "@rjsf/utils";

const CustomCheckbox = (props: WidgetProps) => {
  return <Checkbox {...props} onClick={() => props.onChange(!props.value)} />;
};

const CustomRadioWidget = (props: WidgetProps) => {
  return <Radio {...props} />;
};

const customWidgets: RegistryWidgetsType = {
  CheckboxWidget: CustomCheckbox,
  RadioWidget: CustomRadioWidget,
};

export default customWidgets;
