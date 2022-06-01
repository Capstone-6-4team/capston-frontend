import axios from "axios";
import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import tw from "twin.macro";
import styled from "@emotion/styled"
import './Paging.css';
import Navigator from "../common/Navigator";
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const RoomListWrapper = styled.div`
  ${tw`container mx-5 my-5 bg-white text-black grid grid-cols-3 gap-4`}
`;

const CardWrapper = styled.div`
  ${tw`w-full overflow-hidden rounded-lg border-2 shadow-sm bg-white cursor-pointer sm:flex mb-10 px-3`}
`;

const ImageWrapper = styled.div`
  ${tw`w-full sm:w-1/2 px-4 py-4`}
`;

const RoomImage = styled.img`
  ${tw`object-cover w-full h-40 w-40 rounded-lg mb-5 mt-5`}
`;

const RoomContentWrapper = styled.div`
  ${tw`px-6 py-4`}
`;

const RoomNameText = styled.div`
  ${tw`mt-5 mx-5 my-5 text-xl font-semibold tracking-wider text-gray-800`}
`;

const RoomInfoText = styled.div`
  ${tw`leading-normal text-gray-700`}
`;

const RoomConstraint = ({ roomConstraint }) => {
    const smoke = roomConstraint.smoke ? "success" : "error"
    const male = roomConstraint.genderConstraint === "FEMALE_ONLY" ? "error" : "success";
    const female = roomConstraint.genderConstraint === "MALE_ONLY" ? "error" : "success";

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

    return (
        <>
            <div>
                <SmokingRoomsIcon />
                <span className="ml-2 font-semibold">흡연 </span>
                <MatchIcon value={smoke} />
            </div>
            <div>
                <MaleIcon color="info" />
                <span className="ml-2 font-semibold">남성 </span>
                <MatchIcon value={male} />
            </div>
            <div>
                <FemaleIcon color="error" />
                <span className="ml-2 font-semibold">여성 </span>
                <MatchIcon value={female} />
            </div>
        </>
    )
}

function ShowRoomList(){

    const {houseId}=useParams();
    const [rooms, setRooms]=useState([])
    const [currentButtonNum, setCurrentButtonNum]=useState(0)
    const [pageSize, setPageSize]=useState(6)
    const [totalElementNum, setTotalElementNum]=useState()

    const handlePageChange = (page) => { 

        axios.get("/api/room/" + houseId + "/roomList/" + (page - 1) + "/" + pageSize)
        .then((res) => {
            setRooms(res.data.content)
            setCurrentButtonNum(res.data.number + 1)
            setTotalElementNum(res.data.totalElements)
        })
        .catch((err) => {
            console.log(err)
        })
    };

    useEffect(()=>{
        console.log(houseId)
        axios.get("/api/room/" + houseId + "/roomList/" + currentButtonNum + "/" + pageSize)
        .then(res => {
            setRooms(res.data.content)
            setCurrentButtonNum(res.data.number + 1)
            setTotalElementNum(res.data.totalElements)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return(
        <div className="container max-w-full bg-white-100 h-200vh">
            <Navigator/>
            <RoomNameText>
                {"지역별 게스트하우스 추천"}
            </RoomNameText>
            <RoomListWrapper>
                {rooms.map(room => {
                    return(
                        <div>
                            <CardWrapper
                            value={room.id}
                            onClick={()=>{window.location.href="/room/" + room.id}}
                            >
                
                                <ImageWrapper>
                                    <RoomImage
                                        src={"data:" + room.contentType + ";base64," + room.data}
                                        alt=""
                                    />
                                </ImageWrapper>
                        
                                <RoomContentWrapper>
                                    <RoomNameText>
                                        {room.roomName}
                                    </RoomNameText>
                    
                                    <div className="flex">
                                    <div class="font-semibold">수용 가능 인원</div>
                                    <RoomInfoText>
                                        &nbsp;{room.capacity + "명"}
                                    </RoomInfoText>
                                    </div>
                            
                                    <div className="flex">
                                    <div className="font-semibold">가격</div>
                                    <RoomInfoText>
                                        &nbsp;{room.price + "원"}
                                    </RoomInfoText>
                                    </div>
                    
                                    <RoomConstraint roomConstraint={room.roomConstraint} />

                                </RoomContentWrapper>
                        
                            </CardWrapper>
                        </div>
                    )
                })}
            </RoomListWrapper>
            <Pagination
                hideNavigation
                activePage={currentButtonNum}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalElementNum}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                itemClass='page-item'
                linkClass='btn btn-light'
                onChange={(e)=>handlePageChange(e)}
            />
        </div>
    )
}

export default ShowRoomList;