import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, atom } from 'recoil';
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, getDialogActionsUtilityClass } from '@mui/material'
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
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from './Slide';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Api } from "@mui/icons-material";
import Navigator from "../common/Navigator";
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';

const rdrDefinedRangesWrapper = styled.div`display: none;`;
const DivisionLine = styled.div`
    ${tw`border my-2`}
`;

const Bed = styled.button`
    ${tw`w-6 h-6 rounded bg-green-300 text-white text-center`}
`;

const Bed2 = styled.div`
    ${tw`w-8 h-6 rounded bg-green-300 text-white text-center`}
`;

const Container = styled.div`
    width: 350px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 300px;
    overflow: hidden;
}

`;
const CarouselButton = styled.div`
    all: unset;
    padding: 0.5em 1em;
    margin: 2em 2em;
    color: burlywood;
    border-radius: 10px;
    border: 1px solid burlywood;
    cursor: pointer;
    &:hover {
    background-color: burlywood;
    color: #fff;
    }
`;
const SliderContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 2em;
    display: flex;
    
`;
const Center = styled.div`
    text-align: center;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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
        <div className="flex items-center py-2">
            {/* <span>{name}</span> */}

            <span className="px-4 mx-2 border border-black rounded-full">{name}</span>
            <div className="h-4 w-1/4 flex flex-col items-center">
                <div className="my-auto w-full">
                    <LinearProgress variant="determinate" value={parseInt((leftNum / rightNum) * 100)} />
                </div>
            </div>
            <span className="mx-2">{rightNum}명 중 {leftNum}명</span>
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
                <span className="ml-2">흡연 </span>
                <MatchIcon value={smoke} />
            </div>
            <div>
                <MaleIcon color="info" />
                <span className="ml-2">남성 </span>
                <MatchIcon value={male} />
            </div>
            <div>
                <FemaleIcon color="error" />
                <span className="ml-2">여성 </span>
                <MatchIcon value={female} />
            </div>
        </>
    )
}



const UserCharacteristic = ({ userInfo, isReservatedUser }) => {

    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">침대 번호</TableCell>
                    <TableCell align="center">이름</TableCell>
                    <TableCell align="center">성별</TableCell>
                    <TableCell align="center">흡연 여부</TableCell>
                    <TableCell align="center">음주 여부</TableCell>
                    <TableCell align="center">수면 패턴</TableCell>
                    <TableCell align="center">MBTI</TableCell>
                    <TableCell align="center">국적</TableCell>
                    <TableCell align="center">평가기록</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {userInfo ? userInfo.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center">{row.bedId}</TableCell>
                        <TableCell align="center">{isReservatedUser ? row.name : "#####"}</TableCell>
                        <TableCell align="center">{row.gender == "MALE" ? "남" : "여"}</TableCell>
                        <TableCell align="center">{row.smoke ? "흡연자" : "비흡연자"}</TableCell>
                        <TableCell align="center">{row.drinking ? "O" : "X"}</TableCell>
                        <TableCell align="center">{row.sleepPattern == "evening" ? "저녁형" : "아침형"}</TableCell>
                        <TableCell align="center">{row.mbti}</TableCell>
                        <TableCell align="center">{row.nationality}</TableCell>
                        <TableCell align='center'>
                            <Button onClick={() => window.location.href = "/evaluation"}>
                                평가보기
                            </Button>
                        </TableCell>
                    </TableRow>
                )) : null}
            </TableBody>
        </Table>
    </TableContainer>
    );
}

function RoomDetail() {
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

    const bedButtonInfosState = atom({
        key: 'bedButtonInfosState',
        default: [],
    })
    const [bedButtonInfos, setBedButtonInfos] = useRecoilState(bedButtonInfosState)

    const [reservationOrNotInfos, setReservationOrNotInfos] = useState([])

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);

    const [isReservatedUser, setIsReservatedUser] = useState(false);
    const [userCharacteristics, setUserCharacteristics] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => {
        setIsModalOpen(true);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    // Next 버튼 클릭 시
    const NextSlide = () => {
        if (currentSlide >= roomDetailInfo.photos.length - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    // Prev 버튼 클릭 시
    const PrevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(roomDetailInfo.photos.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }, [currentSlide]);

    useEffect(() => {
        console.log(roomId)
        axios.get("/api/room/detail/" + roomId).then(res => {
            console.log(res);
            let data = res.data;

            let sortedBeds = data.beds.sort(function (a, b) {
                return a.bedId - b.bedId;
            })

            sortedBeds.map((bed, index) => {
                bed.bedNumber = index + 1
            })

            data.beds = sortedBeds

            setRoomDetailInfo(data);

            let bedButtonDatas = [];
            let count = 0;
            let isDouble = false;

            for (var i = 0; i < sortedBeds.length; i++) {
                for (var j = i + 1; j < sortedBeds.length; j++) {
                    if (sortedBeds[i].xlocationRatio == sortedBeds[j].xlocationRatio &&
                        sortedBeds[i].ylocationRatio == sortedBeds[j].ylocationRatio) {

                        let bedButtonInfo = {
                            bedNumber: count,
                            xLocationRatio: sortedBeds[i].xlocationRatio,
                            yLocationRatio: sortedBeds[i].ylocationRatio,
                            position: "absolute",
                            bedIds: [sortedBeds[i].bedId, sortedBeds[j].bedId]
                        }
                        bedButtonDatas.push(bedButtonInfo)

                        count += 1
                        isDouble = true
                        break
                    }
                }

                if (!isDouble) {
                    let bedButtonInfo = {
                        bedNumber: count,
                        xLocationRatio: sortedBeds[i].xlocationRatio,
                        yLocationRatio: sortedBeds[i].ylocationRatio,
                        position: "absolute",
                        bedIds: [sortedBeds[i].bedId]
                    }
                    count += 1
                    bedButtonDatas.push(bedButtonInfo)
                }
            }

            setBedButtonInfos(bedButtonDatas)
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
                Authorization: "Bearer " + localStorage.getItem("token")
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

            axios.get("/api/reservation/roommate-info-license", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: {
                    localDate: dateString
                }
            }).then((res) => {
                console.log(res.data.reservationPresence)
                setIsReservatedUser(res.data.reservationPresence)
                setUserCharacteristics(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })

    }, [period]);

    function reservationOrInfo(bedIds) {
        console.log(roomDetailInfo)
        console.log(bedButtonInfos)

        let newReservationOrNotInfos = []

        for (var i = 0; i < bedIds.length; i++) {
            let info = isReservatedOrNot(reservatedUsers, bedIds[i])
            newReservationOrNotInfos.push(info)
        }

        setReservationOrNotInfos(newReservationOrNotInfos)
    }

    function isReservatedOrNot(rUsers, id) {
        for (let start = period[0].startDate; start <= period[0].endDate; start = addDays(start, 1)) {
            let users = rUsers.get(getYmd10(start))
            if (users != undefined) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].bedId == id) {
                        const info = {
                            ...users[i],
                            isReservated: true
                        }
                        return info
                    }
                }
            }
        }

        const info = {
            bedId: id,
            isReservated: false
        }
        return info
    }

    function bedReservation(id) {
        const formData = {
            bedId: id,
            checkInDate: getYmd10(period[0].startDate),
            checkOutDate: getYmd10(period[0].endDate)
        }

        axios.post("/api/reservation/create", formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

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

    function resize() {
        for (var i = 0; i < roomDetailInfo.photos.length; i++) {
            var img = document.getElementById("guestHouseImage " + i);
            console.log("i: " + i)
            console.log("original height: " + img.style.height)
            console.log("original width: " + img.style.width)

            img.style.height *= 500 / img.style.width;
            img.style.width = 500

            console.log("width: " + img.style.width)
            console.log("height: " + img.style.height)
        }
    }

    function checkUnmatchedUser(bedId) {
        let users = reservatedUsers.get(getYmd10(period[0].startDate))
        let isMatched = true;
        for (var i = 0; i < users.length; i++) {
            if (users[i].smoke != userCharacteristics.smoke ||
                users[i].drinking != userCharacteristics.drinking ||
                users[i].sleepPattern != userCharacteristics.sleepPattern) {

                isMatched = false;
                break;
            }
        }

        if (isMatched) {
            bedReservation(bedId)
        }
        else {
            setIsModalOpen(true)
        }
    }

    // function getBedNumber(bedId){
    //     let i=0;
    //     console.log(bedButtonInfos.length)
    //     for(;i<bedButtonInfos.length;i++){
    //         console.log(bedButtonInfos[i].bedIds)
    //         if(bedButtonInfos[i].bedIds.includes(bedId)) {
    //             break;
    //         }
    //     }

    //     return bedButtonInfos[i].bedNumber
    // }

    // const canvasRef=useRef()
    // const imgRef=useRef()

    // function resize() {
    // 	const image = new Image();
    // 	const canvas = canvasRef.current
    //     const ctx=canvas?.getContext('2d')

    //     if(ctx){
    //         canvas.width = 360;
    //         canvas.height = 540;
    //         canvas.backgroundColor = 'rgb(255, 255, 255)';

    //         image.src = "https://user-images.githubusercontent.com/71132893/109293741-91567f00-786f-11eb-88ff-4204af9d0bdb.jpg";

    //         image.onload = function(){
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             ctx.drawImage(image, 0, 0, 360, 540);
    //         }


    //         canvas.toBlob(function(blob) {
    //             const reader = new FileReader();
    //             reader.onload = function(e) {
    //                 imgRef.current.src = reader.result;
    //             }
    //             reader.readAsDataURL(blob);
    //         })
    //     }else{
    //         throw new Error('Could not get context')
    //     }
    // };

    // useEffect(()=>{
    //     drawCanvas()
    // },[])

    return (
        <>
            <Navigator />
            <div className="container mx-auto px-12">

                {/* <Carousel className="mx-auto" height="400px" navButtonsAlwaysVisible="true">
                {
                    roomDetailInfo ? roomDetailInfo.photos.map((data, index) => <img className="mx-auto h-full" key={index} src={"data:" + roomDetailInfo.contentTypes[index] + ";base64," + data} />) : null
                }
            </Carousel> */}
                <Container>
                    <SliderContainer ref={slideRef}>
                        {
                            roomDetailInfo.photos.map((data, index) => {
                                return <img className="mx-auto h-full rounded-lg" id={"guestHouseImage " + index} key={index}
                                    src={"data:" + roomDetailInfo.contentTypes[index] + ";base64," + data} style={{ width: "auto", height: "300px" }} />
                            })
                        }
                    </SliderContainer>

                </Container>
                <Center>
                    <CarouselButton onClick={PrevSlide}>{"<"}</CarouselButton>
                    <CarouselButton onClick={NextSlide}>{">"}</CarouselButton>
                </Center>
                <span className="text-representative-color font-bold">{roomDetailInfo.address}</span>
                <div className="flex w-full">
                    <span className="text-4xl font-bold w-full">{roomDetailInfo.guestHouseName}</span>
                    <div class="my-auto flex flex-col place-items-end w-full">
                        <button>공용 채팅방<ChatIcon onClick={() => window.open('/chat/public/' + roomId, '채팅방', 'width=430,height=500,location=no,status=no,scrollbars=yes')} /></button>
                        <button>예약자 전용 채팅방<ChatIcon onClick={() => window.open('/chat/private/' + roomId, '채팅방', 'width=430,height=500,location=no,status=no,scrollbars=yes')} /></button>
                    </div>
                </div>
                <span className="text-2xl text-gray-400 font-bold block">{roomDetailInfo.roomName}</span>
                <div className="block flex justify-end">
                    <span className="text-right text-gray-400 block my-auto mr-2">1박 </span>
                    <span className="text-3xl font-extrabold text-red-500 my-auto">{roomDetailInfo.price}원</span>
                </div>


                <DivisionLine />

                <div className="my-2">
                    <span className="text-2xl font-bold block my-auto">방 이용 조건</span>
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
                <div className="border h-96 relative" id="blueprintBox">
                    <img src={"data:" + roomDetailInfo.contentType + ";base64," + roomDetailInfo.blueprint} alt="" id="blueprint" style={{ "max-width": "100%", "max-height": "100%" }} />
                    {bedButtonInfos.map((bedButtonInfo, index) => {
                        let imageDiv = document.getElementById("blueprint")
                        let imageTop = imageDiv.getBoundingClientRect().top
                        let imageBottom = imageDiv.getBoundingClientRect().bottom
                        let imageLeft = imageDiv.getBoundingClientRect().left
                        let imageRight = imageDiv.getBoundingClientRect().right

                        const BedButtonStyle = {
                            ...bedButtonInfo,
                            left: String(Math.abs(imageRight - imageLeft) * bedButtonInfos[index].xLocationRatio) + "px",
                            top: String(Math.abs(imageTop - imageBottom) * bedButtonInfos[index].yLocationRatio) + "px"
                        }

                        if (bedButtonInfo.bedIds.length == 1) {
                            return (
                                <Bed
                                    onClick={() => reservationOrInfo(bedButtonInfo.bedIds)}
                                    style={BedButtonStyle}
                                    id={bedButtonInfo.bedNumber}>
                                    <BedroomChildIcon />
                                </Bed>
                            )
                        }
                        else if (bedButtonInfo.bedIds.length == 2) {
                            return (
                                <Bed2
                                    onClick={() => reservationOrInfo(bedButtonInfo.bedIds)}
                                    style={BedButtonStyle}
                                    id={bedButtonInfo.bedNumber}>
                                    <BedroomParentIcon />
                                </Bed2>
                            )
                        }
                    })}
                </div>

                <DivisionLine />

                <div className="my-2">
                    <span className="text-2xl font-bold block my-auto">예약한 룸메이트 정보</span>
                    <span className="text-sm text-gray-500">* 체크인 날짜의 정보입니다</span>
                    <TotalCharacteristicChip name="흡연" leftNum={statistics.smoke} rightNum={statistics.num} />
                    <TotalCharacteristicChip name="음주" leftNum={statistics.drinking} rightNum={statistics.num} />
                    <span className="text-sm text-gray-500">* 예약한 모든 유저의 정보입니다 (다른 유저의 이름은 예약 후 확인 가능합니다)</span>
                    <UserCharacteristic userInfo={reservatedUsers.get(getYmd10(period[0].startDate))} isReservatedUser={isReservatedUser} />
                </div>

                <DivisionLine />

                <div className="my-2">
                    <span className="text-sm text-gray-500">* 해당 침대에 예약한 유저의 정보입니다 (다른 유저의 이름은 예약 후 확인 가능합니다)</span>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">침대 층수</TableCell>
                                    <TableCell align="center">이름</TableCell>
                                    <TableCell align="center">성별</TableCell>
                                    <TableCell align="center">흡연 여부</TableCell>
                                    <TableCell align="center">음주 여부</TableCell>
                                    <TableCell align="center">수면 패턴</TableCell>
                                    <TableCell align="center">MBTI</TableCell>
                                    <TableCell align="center">국적</TableCell>
                                    <TableCell align="center">평가</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reservationOrNotInfos ? reservationOrNotInfos.map((info, index) => {
                                    if (info.isReservated) {
                                        return (
                                            <TableRow
                                                key={info.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{(index + 1)}</TableCell>
                                                <TableCell align="center">{isReservatedUser ? info.name : "#####"}</TableCell>
                                                <TableCell align="center">{info.gender == "MALE" ? "남" : "여"}</TableCell>
                                                <TableCell align="center">{info.smoke ? "흡연자" : "비흡연자"}</TableCell>
                                                <TableCell align="center">{info.drinking ? "O" : "X"}</TableCell>
                                                <TableCell align="center">{info.sleepPattern == "evening" ? "저녁형" : "아침형"}</TableCell>
                                                <TableCell align="center">{info.mbti}</TableCell>
                                                <TableCell align="center">{info.nationality}</TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={() => window.location.href = "/evaluation"}>
                                                        평가하기
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    else {
                                        return (
                                            <TableRow
                                                key={info.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{(index + 1)}</TableCell>
                                                <TableCell align="center" colSpan={6}>
                                                    {/* <Button variant="contained" onClick={()=>bedReservation(info.bedId)}>예약하기</Button> */}
                                                    <Button variant="contained" onClick={() => checkUnmatchedUser(info.bedId)}>예약하기</Button>
                                                    <Modal
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description"
                                                        open={isModalOpen}
                                                        onClose={handleClose}
                                                    >
                                                        <Box sx={{ ...style, width: 200 }}>
                                                            <h2 id="child-modal-title">알림</h2>
                                                            <p id="child-modal-description">
                                                                나와 성향이 맞지 않는 유저가 있습니다. 그래도 예약하시겠습니까?
                                                            </p>
                                                            <Button onClick={() => bedReservation(info.bedId)}>예약</Button>
                                                            <Button onClick={handleClose}>취소</Button>
                                                        </Box>
                                                    </Modal>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    }

                                }) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* <div className="my-2">
                {reservationOrNotInfos.map((info, index) => {
                    if(info.isReservated) {
                        return(
                            <div>
                                정보들
                            </div>
                        )
                    }
                    else {
                        return(
                            <button onClick={()=>bedReservation(info.bedId)}>
                                예약하기
                            </button>
                        )
                    }
                })}
            </div> */}

            </div >
        </>
    );
}

export default RoomDetail;