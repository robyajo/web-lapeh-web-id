"use client";

import * as React from "react";

// ** Import Icons
import { TrashIcon } from "lucide-react";

// ** Import UI Components
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteManyPosts } from "../utils/data-fetching";
import AlertModal from "@/components/modal/alert-modal";

// ** Import Actions

interface ToolbarOptionsProps {
  // Current page selected users with name data
  selectedUsers: { id: number; name: string }[];
  // All selected user IDs across all pages (for operations that only need IDs)
  allSelectedUserIds?: (string | number)[];
  // Total count of selected items across all pages
  totalSelectedCount: number;
  resetSelection: () => void;
  totalItems?: number;
}

export const ToolbarOptions = ({
  selectedUsers,
  allSelectedUserIds = [],
  totalSelectedCount,
  resetSelection,
  totalItems,
}: ToolbarOptionsProps) => {
  const [loading, setLoading] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const selectionCount = totalSelectedCount || selectedUsers.length;
  const selectedIds =
    allSelectedUserIds.length > 0
      ? allSelectedUserIds
      : selectedUsers.map((user) => user.id);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="default"
        disabled={selectionCount === 0 || loading}
        onClick={() => setOpenConfirm(true)}
      >
        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
        {loading ? "Deleting..." : `Delete (${selectionCount})`}
      </Button>
      <AlertModal
        isOpen={openConfirm}
        onOpenChange={setOpenConfirm}
        data={selectedIds}
        isDeleting={loading}
        title={`Hapus ${selectionCount} data?`}
        description={`Tindakan ini akan menghapus ${selectionCount} post terpilih secara permanen.`}
        cancelLabel="Batal"
        actionLabel={loading ? "Deleting..." : "Hapus"}
        actionClassName="bg-destructive hover:bg-destructive/90"
        handleDelete={async (ids: (number | string)[]) => {
          try {
            setLoading(true);
            const token = session?.data?.token || "";
            await deleteManyPosts(ids, token);
            setOpenConfirm(false);
            resetSelection();
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
          } catch (e) {
            console.error(e);
            if (typeof window !== "undefined") alert("Gagal menghapus data");
          } finally {
            setLoading(false);
          }
        }}
      />
    </div>
  );
};
