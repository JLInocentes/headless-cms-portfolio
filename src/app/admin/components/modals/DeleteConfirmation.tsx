import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";

interface DeleteConfirmationProps {
  children: ReactNode;
  deleteFn: () => Promise<any>;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  children,
  deleteFn,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const promise = deleteFn().then((result) => {
      if (result && result.error) {
        throw new Error(result.error);
      }
      setIsOpen(false);
      return result;
    });

    toast.promise(promise, {
      loading: "Deleting project...",
      success: "Project deleted successfully",
      error: (err) => err.message || "Failed to delete project",
    });

    promise.finally(() => {
      setIsDeleting(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-red-500 cursor-pointer" onClick={deleteFn} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Yes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmation;
