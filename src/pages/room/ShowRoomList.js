import axios from "axios";
import Pagination from "react-js-pagination";
import { useState, useEffect, useParams } from "react";
import tw from "twin.macro";
import styled from "@emotion/styled"
import './Paging.css';

const RoomListWrapper = styled.div`
  ${tw`container w-1/2 mx-auto flex flex-col mb-10 bg-white text-black justify-items-center`}
`;

const CardWrapper = styled.div`
  ${tw`w-full overflow-hidden rounded-lg border-2 shadow-sm bg-white cursor-pointer sm:flex mb-10 duration-500`}
`;

const ImageWrapper = styled.div`
  ${tw`w-full sm:w-1/3`}
`;

const RoomImage = styled.img`
  ${tw`object-cover w-full h-60`}
`;

const RoomContentWrapper = styled.div`
  ${tw`px-6 py-4`}
`;

const RoomNameText = styled.div`
  ${tw`mb-5 mt-5 text-xl font-semibold  tracking-wider text-gray-800`}
`;

const RoomInfoText = styled.div`
  ${tw`leading-normal text-gray-700 mb-2`}
`;

function ShowRoomList(){

    // const {houseId}=useParams();
    const [rooms, setRooms]=useState([])
    const [buttonNum, setButtonNum]=useState()
    const [currentButtonNum, setCurrentButtonNum]=useState(0)
    const [pageSize, setPageSize]=useState(5)
    const [totalElementNum, setTotalElementNum]=useState()

    const handlePageChange = (page) => { 
        setCurrentButtonNum(page)
        console.log(page) 
    };

    useEffect(()=>{
        axios.get("/api/room/" + 1 + "/roomList/" + currentButtonNum + "/" + pageSize)
        .then(res => {
            setRooms(res.data.content)
            setButtonNum(res.data.totalPages)
            setCurrentButtonNum(res.data.number)
            setTotalElementNum(res.data.totalElements)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return(
        <RoomListWrapper>
            {rooms.map(room => {
                return(
                    <div>
                        <CardWrapper
                        value={room.id}
                        // onClick={onClick}
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
            
                            <div class="font-semibold">최대 수용 가능 인원</div>
                            <RoomInfoText>
                                {room.capacity}
                            </RoomInfoText>
                    
                            <div class="font-semibold">가격</div>
                            <RoomInfoText>
                                {room.price}
                            </RoomInfoText>
            
                            <div class="font-semibold">흡연 가능</div>
                            <RoomInfoText>
                                {room.roomConstraint.smoke ? "O" : "X"}
                            </RoomInfoText>
            
                            <div class="font-semibold">성별 제약</div>
                            <RoomInfoText>
                                {room.roomConstraint.genderConstraint=="MIXED" ? "X" : 
                                (room.roomConstraint.genderConstraint=="MALE_ONLY" ? "O(남자만)" : "O(여자만)")}
                            </RoomInfoText>
                            </RoomContentWrapper>
                    
                        </CardWrapper>
                    </div>
                )
            })}
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
                onChange={handlePageChange}
            />
        </RoomListWrapper>
    )
}

export default ShowRoomList;