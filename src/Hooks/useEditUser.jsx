import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUser } from "../Services/UserApi";

export function useEditUser(currentPage, setEditingUser) {
    const queryClient = useQueryClient();

    const { mutate: editUser, isLoading: isEditing } = useMutation({
        mutationFn: UpdateUser,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["users", currentPage], (prevData) => {
                const newUserList = prevData?.data?.map((user) =>
                    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
                );
                const newData = { ...prevData, data: newUserList };

               
                localStorage.setItem(`users_page_${currentPage}`, JSON.stringify(newData));
                return newData;
            });

            
            setEditingUser(null);
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        },
    });

    return { editUser, isEditing };
}
