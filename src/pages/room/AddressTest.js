import React, { useState } from 'react';
import PopupDom from './PopupDom'
import PopupPostCode from './PopupPostCode';
import { Button } from "@mui/material";

const AddressTest = (props) => {
	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [address, setAddress] = useState(null)
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    const changeAddress = (addr) => {
        // setAddress(addr)
        props.onChange(addr)
    }
 
    return(
        <div className="float-left">
        	{/* 버튼 클릭 시 팝업 생성 */}
            <Button type='button' onClick={openPostCode}>주소 검색</Button>
            {/* 팝업 생성 기준 div */}
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} onChange={changeAddress} />
                    </PopupDom>
                )}
            </div>
            {/* <div>
                {address}
            </div> */}
        </div>
    )
}

export default AddressTest;