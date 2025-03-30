import styled from "styled-components";
import { Heading } from "../Components/Heading";
import { Button } from "../Components/Button";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchUsers } from "../Services/UserApi";
import { InlineItem } from "../Components/InlineElement";
import UserForm from "../Components/userForm";
import { useDeleteUser } from "../Hooks/useDeleteUser";
import { useEditUser } from "../Hooks/useEditUser";

const StyledUsersList = styled.div`
    display: grid;
    padding: 1.4rem;
`;

const GridTable = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: ${(props) => props.$padding || "0"};
    background-color: ${(props) => props.$backgroundColor || "transparent"};
    color: ${(props) => props.$color || "#000"};
    box-shadow: ${(props) => props.$boxShadow || "none"};
    gap: ${(props) => props.$gap || "0rem"};
`;

const UserData = styled.div`
    align-self: center;
    justify-self: center;
    font-size: 1.6rem;
    display: ${(props) => (props.$isFlex ? "flex" : "block")};
    gap: 1rem;
`;

const TableHeading = styled.h2`
    text-align: center;
`;

const Avatar = styled.img`
    max-width: 6rem;
    border-radius: 50%;
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
    gap: 2rem;
`;

function UsersList() {
    const [currentPage, setCurrentPage] = useState(() => Number(localStorage.getItem("current_page")) || 1);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        localStorage.setItem("current_page", currentPage);
    }, [currentPage]);

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ["users", currentPage],
        queryFn: () => FetchUsers(currentPage),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000, 
        refetchOnWindowFocus: false, 
    });

    const { deleteUser, isDeleting, deletingId } = useDeleteUser(currentPage);
    const { editUser, isEditing } = useEditUser(currentPage, setEditingUser);

    function handleCloseEdit() {
        setEditingUser(null);
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>There was an error fetching data</p>;

    return (
        <StyledUsersList>
            <Heading>Users List</Heading>
            
           
            <GridTable $backgroundColor="#970505" $padding="1rem" $color="#fff">
                <TableHeading>Avatar</TableHeading>
                <TableHeading>Id</TableHeading>
                <TableHeading>First Name</TableHeading>
                <TableHeading>Last Name</TableHeading>
                <TableHeading>Email</TableHeading>
                <TableHeading>Action</TableHeading>
            </GridTable>

            
            {userData?.data?.map((user) => (
                <GridTable
                    key={user.id}
                    $boxShadow=".2rem .2rem 1rem rgba(250,0,0,0.2)"
                    $gap="1rem"
                    $padding=".7rem"
                >
                    <UserData>
                        <Avatar src={user.avatar} alt={`${user.first_name} avatar`} />
                    </UserData>
                    <UserData>{user.id}</UserData>
                    <UserData>{user.first_name}</UserData>
                    <UserData>{user.last_name}</UserData>
                    <UserData>{user.email}</UserData>
                    <UserData $isFlex>
                        <Button
                            $padding="1rem 3.3rem"
                            $backgroundColor="#f85a5aea"
                            onClick={() => setEditingUser(user)}
                            disabled={isEditing}
                        >
                            {isEditing && editingUser?.id === user.id ? "Editing..." : "Edit"}
                        </Button>
                        <Button
                            $padding="1rem 3.3rem"
                            $backgroundColor="#f85a5aea"
                            onClick={() => deleteUser(user.id)}
                            disabled={deletingId === user.id}
                        >
                            {deletingId === user.id ? "Deleting..." : "Delete"}
                        </Button>
                    </UserData>
                </GridTable>
            ))}

           
            {editingUser && (
                <UserForm
                    user={editingUser}
                    onClose={handleCloseEdit}
                    currentPage={currentPage}
                    setEditingUser={setEditingUser}
                />
            )}

            
            <PaginationControls>
                <Button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
                    Previous
                </Button>
                <InlineItem $fontSize="1.4rem">
                    {currentPage} / {userData?.total_pages}
                </InlineItem>
                <Button
                    $padding="1.4rem 3.2rem"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === userData?.total_pages}
                >
                    Next
                </Button>
            </PaginationControls>
        </StyledUsersList>
    );
}

export default UsersList;
