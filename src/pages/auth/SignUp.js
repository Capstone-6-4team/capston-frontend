import React, { useState, useEffect } from "react";
import { signUp } from "../../api/UserAPI"
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, NativeSelect, FormControl, Switch } from "@mui/material"

// const SignupInput = styled.input`
//     ${tw`border border-black rounded `}
// `;
const SignupInputText = styled.div`
    ${tw`font-semibold text-lg mr-4`}
`;
const SignupSendButton = styled.button`
    ${tw`w-full mx-auto text-lg text-white`}
`;
const SignupOptionSelect = styled.select`
    ${tw`border border-black rounded `}
`;
const SignUpWrapper = styled.div`
    ${tw`container w-1/3 mx-auto flex flex-col mb-10 bg-white text-black justify-items-center`}
`;

const SignUpInputWrapper = styled.div`
    ${tw`border rounded m-2 py-2 px-2`}
`;

const SignupInput = (props) => {
    console.log(props.name, props.onBlur);
    return (
        <Input fullWidth
            // label="fullWidth"
            // id="fullWidth"
            onBlur={props.onBlur}
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            required />
    );
}

const SignupSelect = (props) => {
    return (
        <>
            <FormControl fullWidth>
                <NativeSelect onChange={props.onChange} inputProps={{
                    name: props.name,
                    id: props.name + "-select",
                }}>
                    {/* <option disabled="선택" defaultValue="선택">선택</option> */}
                    <option value="" disabled selected>선택</option>
                    {props.options.map((option) =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </NativeSelect>
            </FormControl>
        </>
    );
}

const SelectedLanguages = (props) => {
    props.options.availableLanguages.map((l) => console.log(l));
    return (
        <div class="mt-2">
            {props.options.availableLanguages.map((option) =>
                <>
                    <span class="border rounded p-1">{option}</span>
                    <button class="mx-2 my-auto" key={option} value={option} onClick={() => props.onClick(option)}><AiFillCloseCircle size="16" className="icon" color="red" /></button>
                </>
            )}
        </div>
    );
}

const SleepTypeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url(/sun.png)`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: 'dark', //theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: 'dark',//theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(/night-mode.png)`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be', //theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

// 
const USERTYPE_OPTIONS = [
    { value: "ROLE_GUEST", name: "게스트" },
    { value: "ROLE_HOST", name: "호스트" }
];

const NATIONALITY_OPTIONS = [
    { value: "KR", name: "대한민국" },
    { value: "US", name: "미국" },
];

const LANGUAGE_OPTIONS = [
    { value: "KOREAN", name: "한국어" },
    { value: "ENGLISH", name: "영어" }
];

const MBTI_OPTIONS = [
    { value: "ISTJ", name: "ISTJ" },
    { value: "ISTP", name: "ISTP" },
    { value: "ISFJ", name: "ISFJ" },
    { value: "ISFP", name: "ISFP" },
    { value: "INTJ", name: "INTJ" },
    { value: "INTP", name: "INTP" },
    { value: "INFJ", name: "INFJ" },
    { value: "INFP", name: "INFP" },
    { value: "ESTJ", name: "ESTJ" },
    { value: "ESTP", name: "ESTP" },
    { value: "ESFJ", name: "ESFJ" },
    { value: "ESFP", name: "ESFP" },
    { value: "ENTJ", name: "ENTJ" },
    { value: "ENTP", name: "ENTP" },
    { value: "ENFJ", name: "ENFJ" },
    { value: "ENFP", name: "ENFP" }
]

const GENDER_OPTIONS = [
    { value: "MALE", name: "남자" },
    { value: "FEMALE", name: "여자" }
]

const Signup = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
        userType: "",
        availableLanguages: []
    });

    const [characteristic, setCharacteristic] = useState({

        nationality: "",
        smoke: false,
        drinking: false,
        mbti: "",
        gender: "",
        drinking: "",
        sleepPattern: ""
    });

    const submit = () => {
        console.log({ ...inputs, characteristic })
        signUp({ ...inputs, characteristic }).then(res => {
            console.log("회원가입 성공");
        })
            .catch(err => {
                console.log(err);
                console.log("회원가입 실패");
            })
    }

    const onUserInfoChange = (e) => {
        const { value, name } = e.target;

        switch (name) {
            case "email":
                // checkEmail();
                break;
            case "password":
                // checkPassword();
                break;
        }
        console.log(value, name);
        setInputs({
            ...inputs,
            [name]: value
        });
        console.log(inputs)
    };

    const onCharacteristicChange = (e) => {
        let { value, name } = e.target;
        switch (name) {
            case "smoke":
            case "drinking":
                value = e.target.checked;
                break;
            case "sleepPattern":
                value = e.target.checked ? "MORNING" : "EVENING";
                break;
        }
        console.log(value, name);
        setCharacteristic({
            ...characteristic,
            [name]: value
        });
        console.log(characteristic);
    }

    const onLanguageSelect = (e) => {
        const { value, name } = e.target;

        console.log(value, name);
        if (inputs.availableLanguages.find((l) => l === value)) {
            return;
        }
        setInputs({
            ...inputs,
            availableLanguages: [...inputs.availableLanguages, value]
        });
        console.log(inputs)
    }

    const onLanguageRemove = (option) => {
        console.log(option)
        const availableLanguages = inputs.availableLanguages.filter((l) => l !== option);
        console.log(availableLanguages)
        setInputs({
            ...inputs,
            availableLanguages: availableLanguages
        })
        console.log(inputs)
    }

    useEffect(() => {
        console.log("리렌더링!");
    })

    return (
        <div class="container mx-auto mb-10 bg-white text-black mt-4">
            <SignUpWrapper>
                <SignUpInputWrapper>
                    <SignupInputText>
                        <span class="flex">이메일</span>
                    </SignupInputText>
                    <SignupInput type="email" name="email" onChange={onUserInfoChange} required />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>비밀번호</span>
                    </SignupInputText>
                    <SignupInput type="password" name="password" onChange={onUserInfoChange} required />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>이름</span>
                    </SignupInputText>
                    <SignupInput type="text" name="name" onChange={onUserInfoChange} required />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>성별</span>
                    </SignupInputText>
                    <SignupSelect title="성별" options={GENDER_OPTIONS} name="gender" onChange={onCharacteristicChange} />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>회원 종류</span>
                    </SignupInputText>
                    <SignupSelect options={USERTYPE_OPTIONS} name="userType" onChange={onUserInfoChange} />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>사용 가능한 언어</span>
                    </SignupInputText>
                    <SignupSelect options={LANGUAGE_OPTIONS} name="availableLanguages" onChange={onLanguageSelect} />
                    <SelectedLanguages options={inputs} onClick={onLanguageRemove} />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>국적</span>
                    </SignupInputText>
                    <SignupSelect options={NATIONALITY_OPTIONS} name="nationality" onChange={onCharacteristicChange} />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>흡연</span>
                        <Switch color="primary" name="smoke" onChange={onCharacteristicChange} />
                    </SignupInputText>
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>음주</span>
                        <Switch color="primary" name="drinking" onChange={onCharacteristicChange} />
                    </SignupInputText>
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>MBTI</span>
                    </SignupInputText>
                    <SignupSelect options={MBTI_OPTIONS} name="mbti" onChange={onCharacteristicChange} />
                </SignUpInputWrapper>

                <SignUpInputWrapper>
                    <SignupInputText>
                        <span>수면 패턴</span>
                        <SleepTypeSwitch sx={{ m: 1 }} defaultChecked name="sleepPattern" onChange={onCharacteristicChange} />
                    </SignupInputText>
                </SignUpInputWrapper>

                <div class="border rounded m-2 py-2 px-2 bg-representative-color">
                    <SignupSendButton disabled={false} onClick={submit}>
                        회원가입
                    </SignupSendButton>
                </div>
            </SignUpWrapper>
        </div>
    );
}

export default Signup