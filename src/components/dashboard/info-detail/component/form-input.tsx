import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  id: string;
  label: string;
  value: string | undefined;
  readOnly: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const FormInput = ({
  id,
  label,
  value,
  readOnly,
  onChange,
  type = "text",
}: FormInputProps) => (
  <div>
    <Label htmlFor={id} className="text-lg font-medium">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
    />
  </div>
);

export default FormInput;
