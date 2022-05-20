import { useState } from 'react';
import styled from "@emotion/styled";
import tw from "twin.macro";
import Logo from '../../assets/main_logo.png';
import isAuthorized from '../../api/isAuthorized';

const NavigatorWrapper = styled.div`
    font-family: "NanumGothic-Bold";
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #45bfc9;
    height: 70px;
    ${tw` max-w-full shadow-lg relative border-b-2 border-white`}
`;

const NavigatorLogo = styled.img`
    width: 60px;
    ${tw`m-3 cursor-pointer ml-20`}
`;

const NavigatorText = styled.text`
    font-family: "NanumGothic-Regular";
    @media screen and (max-width: 500px) {
    display: none;
    }
    ${tw`bg-clip-text my-auto font-black text-lg text-transparent bg-gradient-to-r via-white select-none text-white`}
`;

const NavigatorLink = styled.div`
    font-family: "NanumGothic-Regular";
    color: white;
    height: 70px;
    font-weight: 800;
    font-size: 14px;
    @media screen and (max-width: 500px) {
    display: none;
    }
    &:hover {
    color: #9E9E9E;
    border-bottom: 4px solid #B8B8B8;
    }
    &:focus {
    color: #9E9E9E;
    border-bottom: 4px solid #B8B8B8;
    }
    ${tw`overflow-hidden tracking-wider flex items-center align-middle mx-10 duration-300 cursor-pointer`}
`;

const DropDown = styled.div`
    ${tw`origin-top-right absolute top-5 right-0 mt-2 w-56 text-black rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
`;

const DropDownItem = styled.div`
    font-family: "NanumGothic-Regular";
    &:hover {
    background: #dcdce0;
    }
    ${tw`text-gray-700  px-4 py-3 text-sm font-semibold`}
`;

function Navigator(){

    const [userName, setUserName]=useState("Taehun")

    return(
        <>
            <NavigatorWrapper>
            <div className="flex">
                <NavigatorLogo
                onClick={() => (window.location.href = "/")}
                src={Logo}
                ></NavigatorLogo>
                <NavigatorText>Introduce Customized GuestHouse</NavigatorText>
            </div>
            <div>
                {isAuthorized() ? (
                <div className="flex">
    
                    <NavigatorLink onClick={() => (window.location.href = "/feedback")}>
                        <div>
                            피드백
                        </div>
                    </NavigatorLink>
    
                    <NavigatorLink onClick={() => (window.location.href = "/reservationList")}>
                        <div>
                            신청 내역
                        </div>
                    </NavigatorLink>
                    <NavigatorLink onClick={() => (window.location.href = "/chatroomList")}>
                        <div>
                            채팅방 목록
                        </div>
                    </NavigatorLink>

                    <NavigatorLink onClick={() => (window.location.href = "/logout")}>
                        <span className="text-red-600">
                            로그아웃
                        </span>
                    </NavigatorLink>
    
                    
                    <NavigatorLink>
                        <div>
                            {userName}
                        </div>
                    </NavigatorLink>
                </div>
                ) : (
                <div className="flex">
                    <NavigatorLink onClick={() => (window.location.href = "/login")}>
                    <div
                        // className={focus === "로그인" ? "my-auto text-gray-500"  : ""}
                    >
                        로그인
                    </div>
                    </NavigatorLink>
    
                    <NavigatorLink onClick={() => (window.location.href = "/signup")}>
                    <div
                        // className={focus === "회원가입" ? "my-auto text-gray-500"  : ""}
                    >
                        회원가입
                    </div>
                    </NavigatorLink>
                </div>
                )}
            </div>
            </NavigatorWrapper>
        </>
    )
}

export default Navigator;