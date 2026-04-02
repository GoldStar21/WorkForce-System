import { logout } from "@/lib/services/auth_service";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useSharedHook = <T>(
  deleteFunctionn: (id: number) => Promise<void>,
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  /**  GENERIC HOOK
   * This hook is used for "shared logic" with goal to minimize code
   * in current hooks. In current hooks we have functions like delete,
   * update etc. These functions need to be written multiple times in
   * these hooks. By using functions from this "shared" hook,
   * unnecessary code is being removed and maintenance is easier.
   */

  // 1. DELETE
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => {
    setConfirmationDialogOpen(true);
    setDataToDelete(id);
  };

  const closeDeleteDialog = () => {
    setConfirmationDialogOpen(false);
    setDataToDelete(null);
  };

  const deleteConfirmation = async () => {
    if (dataToDelete === null) return;

    try {
      await deleteFunctionn(dataToDelete);
      setItems((previousState) =>
        previousState.filter((item: any) => item.id !== dataToDelete),
      );
      toast.success("Successfully deleted!", { duration: 4000 });
    } catch {
      toast.error("Error deleting!", { duration: 4000 });
    } finally {
      closeDeleteDialog();
    }
  };
  return {
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
  };
};
