import React, { useState, useEffect } from "react";
import { signUp } from "../../api/UserAPI"
import styled from "@emotion/styled"

const SignupInput = styled.input``;
const SignupInputText = styled.div``;
const SignupSendButton = styled.button``;
const SignupOptionSelect = styled.select``;

const Select = (props) => {
    return (
        <SignupOptionSelect name={props.name} onChange={props.onChange}>
            {props.options.map((option) =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </SignupOptionSelect>
    );
}

const SelectedLanguages = (props) => {
    props.options.availableLanguages.map((l) => console.log(l));
    return (
        <div>
            {/* {props.options.availableLanguages} */}
            {props.options.availableLanguages.map((option) =>
                <button key={option} value={option} onClick={props.onClick}>{option}</button>
            )}
            {/* 왜안될까요? */}
        </div>
    );
}
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
        mbti: "",
        gender: "",
        drinking: "",
        bedTime: "",
        wakeUpTime: ""
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

    const onLanguageRemove = (e) => {
        const { value, name } = e.target;
        console.log(value, name);

        const availableLanguages = inputs.availableLanguages.filter((l) => l !== value);
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
        <div>
            <SignupInputText>
                <span>이메일</span>
            </SignupInputText>
            <SignupInput type="email" name="email" onBlur={onUserInfoChange} required />

            <SignupInputText>
                <span>비밀번호</span>
            </SignupInputText>
            <SignupInput type="password" name="password" onBlur={onUserInfoChange} required />

            <SignupInputText>
                <span>이름</span>
            </SignupInputText>
            <SignupInput type="text" name="name" onChange={onUserInfoChange} required />

            <SignupInputText>
                <span>성별</span>
            </SignupInputText>
            <Select options={GENDER_OPTIONS} name="gender" onChange={onCharacteristicChange} />


            <SignupInputText>
                <span>회원 종류</span>
            </SignupInputText>
            <SignupOptionSelect name="userType" onChange={onUserInfoChange}>
                <option value="ROLE_GUEST">게스트</option>
                <option value="ROLE_HOST">호스트</option>
            </SignupOptionSelect>

            <SignupInputText>
                <span>사용 가능한 언어</span>
            </SignupInputText>
            <Select options={LANGUAGE_OPTIONS} name="availableLanguages" onChange={onLanguageSelect} />
            <SelectedLanguages options={inputs} onClick={onLanguageRemove} />

            <SignupInputText>
                <span>국적</span>
            </SignupInputText>
            <Select options={NATIONALITY_OPTIONS} name="nationality" onChange={onCharacteristicChange} />

            <SignupInputText>
                <span>흡연</span>
            </SignupInputText>
            <SignupInput type="checkbox" name="smoke" onChange={onCharacteristicChange} />

            <SignupInputText>
                <span>MBTI</span>
            </SignupInputText>
            <Select options={MBTI_OPTIONS} name="mbti" onChange={onCharacteristicChange} />

            <SignupInputText>
                <span>음주</span>
            </SignupInputText>
            <SignupInput type="checkbox" name="drinking" onChange={onCharacteristicChange} />

            <SignupInputText>
                <span>취침 시각(0 ~ 24)</span>
            </SignupInputText>
            <SignupInput type="number" name="bedTime" onChange={onCharacteristicChange} required />

            <SignupInputText>
                <span>기상 시각(0 ~ 24)</span>
            </SignupInputText>
            <SignupInput type="number" name="wakeUpTime" onChange={onCharacteristicChange} required />

            <div>
                <SignupSendButton disabled={false} onClick={submit}>
                    제출하기
                </SignupSendButton>
            </div>

            {/* 
            mbti: "",
            drinking: "",
            bedTime: "",
            wakeUpTime: ""
         */}
        </div>
    );
}

export default Signup