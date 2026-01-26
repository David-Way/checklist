import { Checkbox, Radio, Select } from "@components";
import type { RegistryWidgetsType, WidgetProps } from "@rjsf/utils";

const CustomCheckbox = (props: WidgetProps) => {
  return <Checkbox {...props} onClick={() => props.onChange(!props.value)} />;
};

const CustomRadioWidget = (props: WidgetProps) => {
  return <Radio {...props} />;
};

const CustomSelectWidget = (props: WidgetProps) => {
  return <Select {...props} />;
};

const customWidgets: RegistryWidgetsType = {
  CheckboxWidget: CustomCheckbox,
  RadioWidget: CustomRadioWidget,
  SelectWidget: CustomSelectWidget,
};

export default customWidgets;
