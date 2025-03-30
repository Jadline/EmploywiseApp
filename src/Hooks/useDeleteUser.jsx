import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUser } from "../Services/UserApi";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function useDeleteUser(currentPage) {
    const queryClient = useQueryClient();
    const [deletingId, setDeletingId] = useState(null);

    const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
        mutationFn: (id) => DeleteUser(id),
        onMutate: (id) => setDeletingId(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData(["users", currentPage], (prevData) => {
                if (!prevData) return;

                
                const newInfo = prevData?.data?.filter(user => user.id !== id);
                localStorage.setItem(`users_page_${currentPage}`, JSON.stringify({ ...prevData, data: newInfo }));

                return { ...prevData, data: newInfo };
            });

            setDeletingId(null);
            toast.success("User deleted successfully!", { duration: 3000 });
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
            setDeletingId(null);
            toast.error("Failed to delete user. Please try again!", { duration: 5000 });
        }
    });

    return { deleteUser, isDeleting, deletingId };
}
