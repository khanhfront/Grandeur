import { Button } from "@/components/ui/button";

type FormActionsProps = {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  setIsDialogOpen: (isOpen: boolean) => void;
};

const FormActions = ({
  isEditing,
  onEdit,
  onCancel,
  onSave,
  setIsDialogOpen,
}: FormActionsProps) => (
  <div className="sm:col-span-2 flex justify-start space-x-4 mt-4">
    {isEditing ? (
      <>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </>
    ) : (
      <div className="flex flex-1 justify-between col-span-full">
        <Button onClick={onEdit}>Edit</Button>
        <Button variant={"destructive"} onClick={() => setIsDialogOpen(true)}>
          Delete
        </Button>
      </div>
    )}
  </div>
);

export default FormActions;
