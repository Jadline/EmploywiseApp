import styled from "styled-components";
import { Heading } from "../Components/Heading";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Column } from "../Components/Column";
import { Button } from "../Components/Button";
import { InlineItem } from "../Components/InlineElement";
import { Input } from "../Components/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../Services/UserApi";
import { useNavigate } from "react-router-dom";

const StyledLogin = styled.div`
  display: grid;
  place-items: center;
  margin-top: 10%;
  width: 100%;
`;

const LoginContainer = styled.div`
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.2);
  width: 30%;
`;

const RightSection = styled.div`
  padding: 1rem;
`;

const Label = styled.label`
  font-size: 1.7rem;
  margin-top: 0.7rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  border: 0.1rem solid #000;
  background-color: #fff;
  align-items: center;
  padding-left: 0.5rem;

  &:focus-within {
    border: 0.2rem solid #e50808;
  }
`;

function Login() {
    const { register, handleSubmit, formState : {errors} } = useForm({
        defaultValues: {
            email: "eve.holt@reqres.in",
            password: "cityslicka",      
        }
    });
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      navigate("/userslist");
    },
    onError: (err) => {
      console.error("Login failed", err);
    },
  });

  function onSubmit(data) {
    login(data);
  }

  return (
    <StyledLogin>
      <LoginContainer>
        <RightSection>
          <Heading $isCenter>Login to Your Account</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Column>
              <Label>
                Email
                {errors.email && (
                  <InlineItem $isCenter $color="red">
                    {errors.email.message} *
                  </InlineItem>
                )}
              </Label>
              <InputContainer>
                <FaEnvelope size={15} />
                <Input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "This field is required",
                    validate: (value) =>
                      value === "eve.holt@reqres.in" || "Invalid email",
                  })}
                />
              </InputContainer>
            </Column>

            <Column>
              <Label>
                Password
                {errors.password && (
                  <InlineItem $isCenter $color="red">
                    {errors.password.message} *
                  </InlineItem>
                )}
              </Label>
              <InputContainer>
                <FaLock size={15} />
                <Input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "This field is required",
                    validate: (value) =>
                      value === "cityslicka" || "Invalid password",
                  })}
                />
              </InputContainer>
            </Column>

            <Button $margin="1rem" $width="100%" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </RightSection>
      </LoginContainer>
    </StyledLogin>
  );
}

export default Login;
