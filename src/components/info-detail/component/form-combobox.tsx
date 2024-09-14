import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormComboboxProps = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  readOnly: boolean;
};

const FormCombobox = ({
  id,
  label,
  options,
  value,
  onChange,
  readOnly,
}: FormComboboxProps) => (
  <div>
    <Label htmlFor={id} className="text-lg font-medium">
      {label}
    </Label>
    {readOnly ? (
      <Input id={id} value={value} readOnly />
    ) : (
      <Combobox value={value} onChange={onChange} options={options} />
    )}
  </div>
);

export default FormCombobox;
