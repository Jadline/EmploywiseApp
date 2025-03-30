import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUser } from "../Services/UserApi";
import { useState } from "react";

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
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
            setDeletingId(null);
        }
    });

    return { deleteUser, isDeleting, deletingId };
}
