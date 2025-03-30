import styled from "styled-components";
import { Column } from "./Column";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { Row } from "./Row";
import { Input } from "../Components/Input";
import { Label } from "./Label";
import { Button } from "./Button";
import { useEffect } from "react";
import { useEditUser } from "../Hooks/useEditUser";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledForm = styled.form``;

const FormContainer = styled.div`
    width: 50%;
    padding: 1.2rem;
    background-color: #5d2b2b;
    color: #fff;
    box-shadow: 0.2rem 0.2rem 1rem rgba(0,0,0,0.2);
    border-radius: 1rem;
`;

function UserForm({ user, onClose, currentPage, setEditingUser }) {
   
    const { register, setValue, handleSubmit } = useForm();

  
    const { editUser, isEditing } = useEditUser(currentPage, setEditingUser);

    
    useEffect(() => {
        if (user) {
            setValue("first_name", user.first_name);
            setValue("last_name", user.last_name);
            setValue("email", user.email);
        }
    }, [user, setValue]);

    function onSubmit(data) {
        const updatedData = { id: user.id, ...data };
        editUser(updatedData);
    }

    return (
        <ModalOverlay>
            <FormContainer>
                <Row $justifycontent="space-between" $backgroundcolor="#c31818" $color="#fff">
                    <h1>Edit Details</h1>
                    <FaTimes size={20} onClick={onClose} />
                </Row>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <Column>
                        <Label>First Name</Label>
                        <Input
                            $border=".1rem solid #fff"
                            type="text"
                            id="first_name"
                            $color="#fff"
                            {...register("first_name")}
                        />
                    </Column>
                    <Column>
                        <Label>Last Name</Label>
                        <Input
                            $border=".1rem solid #fff"
                            type="text"
                            id="last_name"
                            $color="#fff"
                            {...register("last_name")}
                        />
                    </Column>
                    <Column>
                        <Label>Email</Label>
                        <Input
                            $border=".1rem solid #fff"
                            type="email"
                            id="email"
                            $color="#fff"
                            {...register("email")}
                        />
                    </Column>
                    <Button type="submit" $padding="1rem 4.3rem" $margin="1rem" disabled={isEditing}>
                        {isEditing ? "Editing..." : "Edit"}
                    </Button>
                </StyledForm>
            </FormContainer>
        </ModalOverlay>
    );
}

export default UserForm;
