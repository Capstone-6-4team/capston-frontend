import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; import CheckIcon from '@mui/icons-material/Check';
import Carousel from "react-material-ui-carousel";
import CloseIcon from '@mui/icons-material/Close';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios";
import { useParams } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { ko } from "date-fns/locale"
import "./RoomDetail.css"

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const rdrDefinedRangesWrapper = styled.div`display: none;`;
const DivisionLine = styled.div`
    ${tw`border my-2`}
`;

const MatchIcon = ({ value }) => {
    switch (value) {
        case "warning":
            return <PriorityHighIcon color="warning" />;
        case "success":
            return <CheckIcon color="success" />;
        case "error":
            return <CloseIcon color="error" />;
    }
}

function getYmd10(d) {
    //yyyy-mm-dd 포맷 날짜 생성
    return d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
}

const TotalCharacteristicChip = ({ name, leftNum, rightNum }) => {
    return (
        <div class="flex items-center py-2">
            {/* <span>{name}</span> */}

            <span class="px-4 mx-2 border border-black rounded-full">{name}</span>
            <div class="h-4 w-1/4 flex flex-col items-center">
                <div class="my-auto w-full">
                    <LinearProgress variant="determinate" value={parseInt((leftNum / rightNum) * 100)} />
                </div>
            </div>
            <span class="mx-2">{rightNum}명 중 {leftNum}명</span>
            <MatchIcon value="success" />
        </div>
    )
}

const RoomConstraint = ({ roomConstraint }) => {
    const smoke = roomConstraint.smoke ? "success" : "error"
    const male = roomConstraint.genderConstraint === "FEMALE_ONLY" ? "error" : "success";
    const female = roomConstraint.genderConstraint === "MALE_ONLY" ? "error" : "success";
    return (
        <>
            <div>
                <SmokingRoomsIcon />
                <span class="ml-2">흡연 </span>
                <MatchIcon value={smoke} />
            </div>
            <div>
                <MaleIcon color="info" />
                <span class="ml-2">남성 </span>
                <MatchIcon value={male} />
            </div>
            <div>
                <FemaleIcon color="error" />
                <span class="ml-2">여성 </span>
                <MatchIcon value={female} />
            </div>
        </>
    )
}

const UserCharacteristic = ({ userInfo }) => {

    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>침대 번호</TableCell>
                    <TableCell align="right">성별</TableCell>
                    <TableCell align="right">흡연 여부</TableCell>
                    <TableCell align="right">음주 여부</TableCell>
                    <TableCell align="right">수면 패턴</TableCell>
                    <TableCell align="right">MBTI</TableCell>
                    <TableCell align="right">국적</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {userInfo ? userInfo.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>{row.bedNumber}</TableCell>
                        <TableCell align="right">{row.gender == "MALE" ? "남" : "여"}</TableCell>
                        <TableCell align="right">{row.smoke ? "흡연자" : "비흡연자"}</TableCell>
                        <TableCell align="right">{row.drinking ? "O" : "X"}</TableCell>
                        <TableCell align="right">{row.sleepType == "evening" ? "저녁형" : "아침형"}</TableCell>
                        <TableCell align="right">{row.mbti}</TableCell>
                        <TableCell align="right">{row.nationality}</TableCell>
                    </TableRow>
                )) : null}
            </TableBody>
        </Table>
    </TableContainer>
    );
}

const RoomDetail = () => {
    const { roomId } = useParams();
    const [roomDetailInfo, setRoomDetailInfo] = useState({
        photos: [],
        guestHouseName: "",
        roomName: "",
        price: 0,
        roomConstraint: {
            smoke: false,
            genderConstraint: "MIXED"
        }
    });

    const [reservatedUsers, setReservatedUsers] = useState(new Map());
    const [statistics, setStatistics] = useState({});
    const [period, setPeriod] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])

    useEffect(() => {
        console.log(roomId)
        axios.get("/api/room/detail/" + roomId).then(res => {
            console.log(res);
            setRoomDetailInfo(res.data);
        })

    }, []);

    useEffect(() => {
        console.log(period[0])
        var dateString = getYmd10(period[0].startDate);
        console.log(dateString);
        if (reservatedUsers.has(dateString)) {
            const data = reservatedUsers.get(dateString)
            setStatistics({
                num: data.length,
                smoke: data.filter(d => d.smoke).length,
                drinking: data.filter(d => d.drinking).length
            })
            return;
        }

        axios.get("/api/reservation/roommate-info", {
            headers: {
                Authorization: localStorage.getItem("token")
            },

            params: {
                roomId: roomId,
                checkInDate: dateString
            }
        }).then(res => {
            console.log(res);
            const data = res.data;
            setReservatedUsers(new Map([...reservatedUsers, [dateString, data]]));

            setStatistics({
                num: data.length,
                smoke: data.filter(d => d.smoke).length,
                drinking: data.filter(d => d.drinking).length
            })
        })

    }, [period]);

    const ReservationDateRangePicker = () => {
        return <DateRangePicker
            editableDateInputs={true}
            onChange={(item) => { console.log(item.selection); setPeriod([item.selection]) }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={period}
            direction="horizontal"
        />
    }

    return (
        <div class="container mx-auto px-12">

            <Carousel class="mx-auto" height="400px" navButtonsAlwaysVisible="true">
                {
                    roomDetailInfo ? roomDetailInfo.photos.map((data, index) => <img class="mx-auto h-full" key={index} src={"data:image/jpeg;base64," + data} />) : null
                }
            </Carousel>
            <span class="text-representative-color font-bold">{roomDetailInfo.address}</span>
            <div class="flex w-full">
                <span class="text-4xl font-bold w-2/3">{roomDetailInfo.guestHouseName}</span>
                <div class="my-auto flex flex-col place-items-end w-full">
                    <button>공용 채팅방<ChatIcon onClick={() => window.open('/chat/public/' + roomId, '채팅방', 'width=430,height=500,location=no,status=no,scrollbars=yes')} /></button>
                    <button>예약자 전용 채팅방<ChatIcon onClick={() => window.open('/chat/private/' + roomId, '채팅방', 'width=430,height=500,location=no,status=no,scrollbars=yes')} /></button>
                </div>
            </div>
            <span class="text-2xl text-gray-400 font-bold block">{roomDetailInfo.roomName}</span>
            <div class="block flex justify-end">
                <span class="text-right text-gray-400 block my-auto mr-2">1박 </span>
                <span class="text-3xl font-extrabold text-red-500 my-auto">{roomDetailInfo.price}원</span>
            </div>

            <DivisionLine />

            <div class="my-2">
                <span class="text-2xl font-bold block my-auto">방 이용 조건</span>
                <RoomConstraint roomConstraint={roomDetailInfo.roomConstraint} />
            </div>
            <DivisionLine />
            <DateRangePicker
                locale={ko}
                editableDateInputs={true}
                onChange={(item) => { setPeriod([item.selection]) }}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={period}
                staticRanges={[]}
                inputRanges={[]}
                direction="horizontal"
            />
            {/* <ReservationDateRangePicker /> */}
            <div class="border h-96">
                대충 도면과 침대 위치들
            </div>

            <DivisionLine />

            <div class="my-2">
                <span class="text-2xl font-bold block my-auto">예약한 룸메이트 정보</span>
                <span class="text-sm text-gray-500">* 체크인 날짜의 정보입니다</span>
                <TotalCharacteristicChip name="흡연" leftNum={statistics.smoke} rightNum={statistics.num} />
                <TotalCharacteristicChip name="음주" leftNum={statistics.drinking} rightNum={statistics.num} />
                <UserCharacteristic userInfo={reservatedUsers.get(getYmd10(period[0].startDate))} />
            </div>

        </div >
    );
}

export default RoomDetail;