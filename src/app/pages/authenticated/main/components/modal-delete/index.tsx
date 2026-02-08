import { Button } from "../../../../../components/Button";
import { useNotification } from "../../../../../hooks/useNotification";
import { useDeleteEmployee } from "../../hooks/use-delete-employee";
import type { TProps } from "./type";

export const ConfirmDeleteEmployeeModal = ({ handleFinish, data }: TProps) => {
  const { isPending, mutate } = useDeleteEmployee(data?.id);
  const { show } = useNotification();

  const handleConfirmDelete = () => {
    if (!data) return;
    mutate(data.id, {
      onSuccess: () => {
        show(`Success delete employee ${data.name}`);
        handleFinish();
      },
    });
  };

  const handleCancelDelete = () => {
    handleFinish();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Delete Employee</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete employee {data?.name} ?
      </p>
      <div className="flex justify-end gap-2 pt-2">
        <Button
          disabled={isPending}
          variant="bordered"
          onClick={handleCancelDelete}
        >
          Cancel
        </Button>
        <Button
          disabled={isPending}
          variant="danger"
          onClick={handleConfirmDelete}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
