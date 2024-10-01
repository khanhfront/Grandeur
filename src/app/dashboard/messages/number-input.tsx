import React, { useState } from "react";

interface NumberInputProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  min = 1,
  max = 10,
  step = 1,
  value = 3,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<number>(value);

  const increment = () => {
    if (internalValue < max) {
      const newValue = internalValue + step;
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const decrement = () => {
    if (internalValue > min) {
      const newValue = internalValue - step;
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        type="button"
        className="border-2 border-teal-500 rounded-full w-8 h-8 flex items-center justify-center text-teal-500"
        onClick={decrement}
      >
        −
      </button>
      <input
        type="number"
        className="w-12 text-center border-none"
        value={internalValue}
      />
      <button
        type="button"
        className="border-2 border-teal-500 rounded-full w-8 h-8 flex items-center justify-center text-teal-500"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
