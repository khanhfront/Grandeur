"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Sử dụng Shadcn UI Button
import { cn } from "@/lib/utils"; // Hàm kết hợp classnames nếu cần

interface StepperProps {
  steps: string[]; // Tiêu đề các bước
  currentStep: number; // Bước hiện tại
  onStepChange?: (step: number) => void; // Callback khi bước thay đổi
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  const handleClick = (step: number) => {
    if (onStepChange) {
      onStepChange(step);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex items-center">
          {/* Hiển thị số bước */}
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border-2",
              index === currentStep
                ? "border-blue-500 bg-blue-500 text-white"
                : index < currentStep
                ? "border-green-500 bg-green-500 text-white"
                : "border-gray-300 bg-white text-gray-500"
            )}
          >
            {index + 1}
          </div>
          {/* Hiển thị tiêu đề bước */}
          <div className="ml-2 text-sm font-semibold">{step}</div>
          {/* Hiển thị đường nối giữa các bước */}
          {index !== steps.length - 1 && (
            <div className="flex-1 h-1 bg-gray-300 mx-2">
              <div
                className={cn(
                  "h-full bg-blue-500",
                  index < currentStep ? "w-full" : "w-0"
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function StepperContainer() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <div className="space-y-4 p-4">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      {/* Nội dung của bước hiện tại */}
      <div className="mt-4">
        <p className="text-lg font-medium">
          {`Current Step: ${currentStep + 1}`}
        </p>
      </div>

      {/* Nút để chuyển bước */}
      <div className="flex space-x-4">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
