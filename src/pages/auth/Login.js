import React, { useState, useEffect } from "react";
import { login } from "../../api/AuthAPI"
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, Button, ButtonGroup, Switch } from "@mui/material"

const LoginWrapper = styled.div`
    ${tw`container w-1/3 h-screen mx-auto flex flex-col mb-10 bg-white text-black items-center`}
`;

const LoginInputWrapper = styled.div`
    ${tw`w-full border rounded m-2 py-2 px-2`}
`;

const LoginSendButton = styled.button`
    ${tw`w-full mx-auto text-lg text-white`}
`;

const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const submit = () => {
        login(inputs).then(res => {
            console.log(res)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
        })
            .catch(err => {
                console.log(err);
                alert("이메일 또는 비밀번호가 잘못되었습니다.");
            })
    }

    return <div class="container h-screen mx-auto mb-10 bg-white text-black mt-4">
        <LoginWrapper>
            <div class="my-auto flex flex-col w-full items-center">
                <LoginInputWrapper>

                    <Input fullWidth
                        placeholder="Email"
                        name="email"
                        type="email"
                        class="my-4"
                        required
                        onBlur={onChange}
                    />
                </LoginInputWrapper>

                <LoginInputWrapper>
                    <Input fullWidth
                        placeholder="Password"
                        name="password"
                        type="password"
                        onBlur={onChange}
                        required />
                </LoginInputWrapper>
                <div class="border w-full rounded my-2 py-2 px-2 bg-representative-color">
                    <LoginSendButton onClick={submit}>로그인</LoginSendButton>
                </div>

                <ButtonGroup size="large" color="inherit" variant="text" aria-label="outlined button group">
                    <Button>아이디 찾기</Button>
                    <Button>비밀번호 찾기</Button>
                    <Button>회원가입</Button>
                </ButtonGroup>
            </div>
        </LoginWrapper>
    </div>;
}

export default Login;