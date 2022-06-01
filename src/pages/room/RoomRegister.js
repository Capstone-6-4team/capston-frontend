import React, { useState, useEffect } from "react";
import { useRecoilState, atom } from 'recoil';
import axios from "axios";
import {useParams} from "react-router";
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, InputLabel, Select, MenuItem, FormControl, Button, Menu } from "@mui/material"
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import Navigator from '../common/Navigator';

const RoomRegistrationWrapper = styled.div`
    ${tw`container w-1/2 mx-auto flex flex-col mb-10 bg-white text-black justify-items-center`}
`;

const RoomRegistrationInputText = styled.div`
    ${tw`font-semibold text-lg mr-4`}
`;

const RoomRegistrationInputWrapper = styled.form`
    ${tw`border rounded m-2 py-2 px-2 content-center`}
`;

const RoomRegistrationSendButton = styled.button`
    ${tw`w-full mx-auto text-lg text-white`}
`;

const Bed = styled.div`
    ${tw`w-6 h-6 rounded bg-green-300 text-white text-center`}
`;

const Bed2 = styled.div`
    ${tw`w-8 h-6 rounded bg-green-300 text-white text-center`}
`;

const RoomNameText = styled.div`
  ${tw`mt-5 mx-5 my-5 text-xl font-semibold tracking-wider text-gray-800`}
`;

let posX = 0;
let posY = 0;

let originalX = 0;
let originalY = 0;

function RoomRegister(){

    const targetsState=atom({
        key: 'targetsState',
        default: [],
    })
    // const container = useRef();
    const [targets, setTargets] = useRecoilState(targetsState);
    const [count, setCount] = useState(0);

    const {houseId}=useParams();
    const [rooms, setRooms]=useState([
        {
            id: 1,
            roomName: "",
            capacity: null,
            price: null,
            smoke: null,
            genderConstraint: null
        }
    ])
    const [imageIdPair, setImageIdPair]=useState([])
    const [urlIdPair, setUrlIdPair]=useState([])
    const [blueprintIdPair, setBlueprintIdPair]=useState([])
    const [blueprintUrlIdPair, setBlueprintUrlIdPair]=useState([])
    const [cnt, setCnt]=useState(0)

    // const [imageLocation, setImageLocation]=useState()

    const handleChangeInput=(i, e)=>{
        console.log(e.target.value)
        console.log(e.target.name)
        const values=[...rooms]
        values[i][e.target.name]=e.target.value;
        setRooms(values)
    }

    const handleAdd=(id)=>{
        setRooms([
            ...rooms,
            {
                id: id + 2,
                roomName: "", 
                capacity: null, 
                price: null,
                smoke: null, 
                genderConstraint: null
            }])
    }

    const handleSubtract=(i)=>{
        const values1=[...rooms]
        values1.splice(i, 1)
        setRooms([...values1]);

        const values2=[...imageIdPair]
        let num2 = values2.filter((pair, _) => pair.id === i).length
        values2.splice(i, num2)
        setImageIdPair([...values2])

        const values3=[...urlIdPair]
        let num3 = values3.filter((pair, _) => pair.id === i).length
        values3.splice(i, num3)
        setUrlIdPair([...values3])

        // 도면 관련 정보 추가
        const values4=[...blueprintIdPair]
        values4.splice(i, 1)
        setBlueprintIdPair([...values4])

        const values5=[...blueprintUrlIdPair]
        values5.splice(i, 1)
        setBlueprintUrlIdPair([...values5])
        // 도면 관련 정보 추가

        const values6=[...targets]
        values6.splice(i, 1)
        setTargets([...values6])
    }

    const handleMultipleRoomImages=(i, cnt, e)=>{
        console.log(e.target.files)

        const imageLists=e.target.files
        let urlIdPairLists=[...urlIdPair]

        for(let k=0; k<imageLists.length; k++){
            const currentImageUrl=URL.createObjectURL(imageLists[k])
            const currentPair={
                id: i,
                cnt: cnt,
                url: currentImageUrl
            }
            urlIdPairLists.push(currentPair)
        }
        setUrlIdPair(urlIdPairLists) // 이미지 url 업데이트

        const value=[...imageIdPair, 
            {
                id: i,
                cnt: cnt,
                file: e.target.files[0]
            }
        ]
        setImageIdPair(value) // 실제 이미지 업데이트
    }

    const handleBlueprintImage=(i, e)=>{

        const blueprint=e.target.files[0]
        let urlIdPairLists=[...blueprintUrlIdPair]

        var preview = document.getElementById('preview ' + i)
        const currentBlueprintImageUrl=URL.createObjectURL(blueprint)
        preview.src=currentBlueprintImageUrl

        const currentBlueprintPair={
            id: i,
            url: currentBlueprintImageUrl
        }
        urlIdPairLists.push(currentBlueprintPair)
        setBlueprintUrlIdPair(urlIdPairLists) // 이미지 url 업데이트

        const value=[...blueprintIdPair, 
            {
                id: i,
                file: e.target.files[0]
            }
        ]
        setBlueprintIdPair(value) // 실제 이미지 업데이트
    }

    const handleImageFilesDelete=(id, cnt)=>{
        setUrlIdPair(urlIdPair.filter((pair, _) => pair.id !== id || pair.cnt !== cnt))
        setImageIdPair(imageIdPair.filter((pair, _) => pair.id !== id || pair.cnt !== cnt))
    }

    const handleBlueprintDelete=(id)=>{
        setBlueprintIdPair(blueprintIdPair.filter((pair) => pair.id !== id))
        setBlueprintUrlIdPair(blueprintUrlIdPair.filter((pair) => pair.id !== id))
        setTargets(targets.filter((target) => target.blueprint !== id))
    }

    const dragStartHandler = (e) => {

        posX = e.clientX; // 클릭했을 때 마우스 x좌표 위치
        posY = e.clientY; // 클릭했을 때 마우스 y좌표 위치

        originalX = e.target.offsetLeft; // 박스의 왼쪽 위 꼭지점 x좌표
        originalY = e.target.offsetTop; // 박스의 왼쪽 위 꼭지점 y좌표
    };

    const dragHandler = (e) => {

        e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
        e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;

        posY = e.clientY;
        posX = e.clientX;

    };

    const dragEndHandler = (e, i, type) => {

        let imageDiv = document.getElementById("file_media " + i)
        let imageTop = imageDiv.getBoundingClientRect().top
        let imageBottom = imageDiv.getBoundingClientRect().bottom
        let imageLeft = imageDiv.getBoundingClientRect().left
        let imageRight = imageDiv.getBoundingClientRect().right

        if (imageLeft < e.clientX && e.clientX < imageRight && imageTop < e.clientY && e.clientY < imageBottom) {
            const newTargets = [...targets];
            newTargets.push(
                {
                    blueprint: i,
                    num: count,
                    width: type ? "36px" : "24px",
                    height: "24px",
                    position: "absolute",
                    left: `${ e.clientX - imageLeft }px`,
                    top: `${ e.clientY - imageTop }px`,
                    type: type ? 1 : 0
                }
            );
            setTargets(newTargets);

            let newCount=count+1
            setCount(newCount);
        }

        e.target.style.left = `${originalX}px`;
        e.target.style.top = `${originalY}px`;
    }

    const removeHandler = (e, num) => {
        e.preventDefault();

        console.log(e)
        const oldTargets=[...targets]
        setTargets(oldTargets.filter((target) => target.num !== num ))

        let newCount=count-1
        setCount(newCount);
    }

    const roomInfoSubmit = () => {

        setImageIdPair(imageIdPair.sort(function(a, b){
            return a.id-b.id
        }))
        setUrlIdPair(urlIdPair.sort(function(a, b){
            return a.id-b.id
        }))

        setBlueprintIdPair(blueprintIdPair.sort(function(a, b){
            return a.id-b.id
        }))

        setBlueprintUrlIdPair(blueprintUrlIdPair.sort(function(a, b){
            return a.id-b.id
        }))

        let body=[]

        rooms.forEach((room, index) => {
            let num = imageIdPair.filter((pair, _) => pair.id === index).length
            let bedNum = 0

            let bedList = targets.filter((target) => target.blueprint === index)
            bedList.forEach((bed)=>{
                if(bed.type==0) {bedNum+=1}
                else if(bed.type==1) {bedNum+=2}
            })
            console.log("bedNum: " + bedNum)

            let element={
                roomName: room.roomName,
                capacity: Number(room.capacity),
                price: Number(room.price),
                numOfPhoto: num,
                numOfBed: bedNum,
                smoke: room.smoke,
                genderConstraint: Number(room.genderConstraint)
            }
            body.push(element)
        })

        console.log(body)

        const formData = new FormData()

        formData.append("guestHouseId", houseId)
        
        const json = JSON.stringify(body) 
        formData.append("room", json)

        let body2=[]

        // 침대 json 배열 만드는 단계
        targets.forEach((target) => {

            let imageDiv = document.getElementById("preview " + target.blueprint)
            let imageTop = imageDiv.getBoundingClientRect().top
            let imageBottom = imageDiv.getBoundingClientRect().bottom
            let imageLeft = imageDiv.getBoundingClientRect().left
            let imageRight = imageDiv.getBoundingClientRect().right

            const targetLeftString = target.left
            let targetLeft = parseFloat(targetLeftString.replace("px", ""))

            const targetTopString = target.top
            let targetTop = parseFloat(targetTopString.replace("px", ""))

            if(target.type==0){
                let bedElement = {
                    xLocationRatio: (Math.abs(targetLeft) / Math.abs(imageRight - imageLeft)).toFixed(15),
                    yLocationRatio: (Math.abs(targetTop) / Math.abs(imageBottom - imageTop)).toFixed(15),
                    floor: 1
                }

                body2.push(bedElement)
            }
            else if(target.type==1){
                let bedElement1 = {
                    xLocationRatio: (Math.abs(targetLeft)/Math.abs(imageRight-imageLeft)).toFixed(15),
                    yLocationRatio: (Math.abs(targetTop) / Math.abs(imageBottom-imageTop)).toFixed(15),
                    floor: 1
                }
                let bedElement2 = {
                    xLocationRatio: (Math.abs(targetLeft) / Math.abs(imageRight - imageLeft)).toFixed(15),
                    yLocationRatio: (Math.abs(targetTop) / Math.abs(imageBottom - imageTop)).toFixed(15),
                    floor: 2
                }

                body2.push(bedElement1)
                body2.push(bedElement2)
            }
        })

        const json2 = JSON.stringify(body2) 
        formData.append("bed", json2)

        imageIdPair.forEach((pair) => {
            formData.append("files", pair.file)
        })

        blueprintIdPair.forEach((pair) => {
            formData.append("blueprint", pair.file)
        })

        console.log(formData.get("guestHouseId"))
        console.log(formData.get("room"))
        console.log(formData.get("bed"))
        console.log(formData.get("files"))
        console.log(formData.get("blueprint"))

        axios.post("/api/house/register/guesthouse/room", formData, {
            headers: {
                "Content-Type": `multipart/form-data`,
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            console.log("방 등록 성공");
            // let houseId=res.data.data
            // window.location.href="/"
        }).catch(err => {
            console.log(err);
            console.log("방 등록 실패");
            alert("방 등록 실패")
        })
    }

    useEffect(() => {
        console.log("--------------Rendering--------------");
    }, [])

    return(
        <div className="container max-w-full bg-white-100 h-200vh">
            <Navigator/>

            <RoomRegistrationWrapper>
                <RoomNameText>
                    {"등록한 게스트하우스의 방 등록"}
                </RoomNameText>
                {rooms.map((room, i)=>{
                    return(
                        <>
                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">방 이름</span>
                                </RoomRegistrationInputText>
                                <Input fullWidth type="text" name="roomName" value={room.roomName} onChange={e=>{handleChangeInput(i, e)}} required />
                            </RoomRegistrationInputWrapper>

                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">수용력</span>
                                </RoomRegistrationInputText>
                                <Input fullWidth type="number" name="capacity" min="1" max="100" value={room.capacity} onChange={e=>{handleChangeInput(i, e)}} required />
                            </RoomRegistrationInputWrapper>

                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">가격 (단위: 원)</span>
                                </RoomRegistrationInputText>
                                <Input fullWidth type="number" name="price" min="1" value={room.price} onChange={e=>{handleChangeInput(i, e)}} required />
                            </RoomRegistrationInputWrapper>

                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">흡연 여부</span>
                                </RoomRegistrationInputText>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="smoke-select-label"
                                        id="smoke-select"
                                        name="smoke"
                                        label="smoke"
                                        onChange={(e)=>{handleChangeInput(i, e)}}
                                        required
                                    >
                                        <MenuItem value={false}>X</MenuItem>
                                        <MenuItem value={true}>O</MenuItem>
                                    </Select>
                                </FormControl>
                            </RoomRegistrationInputWrapper>

                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">성별 제약조건</span>
                                </RoomRegistrationInputText>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="gender-constraint-label"
                                        id="gender-constraint"
                                        name="genderConstraint"
                                        label="gender-constraint-label"
                                        onChange={e=>{handleChangeInput(i, e)}}
                                        required
                                    >
                                        <MenuItem value={0}>남자만</MenuItem>
                                        <MenuItem value={1}>여자만</MenuItem>
                                        <MenuItem value={2}>혼성</MenuItem>
                                    </Select>
                                </FormControl>
                            </RoomRegistrationInputWrapper>

                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span>방 도면/설계도</span>
                                </RoomRegistrationInputText>
                                <input type="file" name={"file" + i } id={"file" + i} accept="image/*" onChange={e=>handleBlueprintImage(i, e)}/>
                            </RoomRegistrationInputWrapper>
                            <RoomRegistrationInputWrapper>
                                <div className ="flex">
                                <RoomRegistrationInputText>
                                    <span>1층 침대</span>
                                </RoomRegistrationInputText>
                                <Bed onDragStart={e=>dragStartHandler(e)}
                                onDrag={e=>dragHandler(e)} 
                                onDragEnd={e=>dragEndHandler(e, i, 0)} draggable="true" id="bed1">
                                    <BedroomChildIcon />
                                </Bed>
                                &nbsp;&nbsp;&nbsp;
                                <RoomRegistrationInputText>
                                    <span>2층 침대</span>
                                </RoomRegistrationInputText>
                                <Bed2 onDragStart={e=>dragStartHandler(e)}
                                onDrag={e=>dragHandler(e)} 
                                onDragEnd={e=>dragEndHandler(e, i, 1)} draggable="true" id="bed2">
                                    <BedroomParentIcon />
                                </Bed2>
                                </div>
                            </RoomRegistrationInputWrapper>
                            <RoomRegistrationInputWrapper>
                                <div className="show_media" style={{position: 'relative', display: blueprintUrlIdPair[i] ? 'grid':'none'}}>

                                    <div id={"file_media " + i}>
                                        <img id={"preview " + i} src={''} alt="blueprintURL" />
                                        {targets.map((target, index)=>{
                                            if(target.blueprint==i){
                                                if(target.type==0){
                                                    return(
                                                        <Bed onContextMenu={e=>removeHandler(e, target.num)} draggable="false" 
                                                        style={target} id={"bed" + index}>
                                                            <BedroomChildIcon />
                                                        </Bed>
                                                    )
                                                }
                                                else if(target.type==1){
                                                    return(
                                                        <Bed2 onDragStartonDragStart={e=>dragStartHandler(e)} 
                                                        onDrag={e=>dragHandler(e)} 
                                                        onDragEnd={e=>dragEndHandler(e)} onContextMenu={e=>removeHandler(e, target.num)} draggable="false" 
                                                        style={target} id={"bed" + index}>
                                                            <BedroomParentIcon />
                                                        </Bed2>
                                                    )
                                                }

                                            }
                                        })}
                                    </div>
                                    <Button fullWidth onClick={() => handleBlueprintDelete(i)}>Delete</Button>
                                </div>
                            </RoomRegistrationInputWrapper>

                            <RoomRegistrationInputWrapper>
                                <label>
                                    <RoomRegistrationInputText>
                                        <span>등록할 사진들</span>
                                    </RoomRegistrationInputText>
                                    <input multiple type="file" name="files" id="files" accept="image/*" onChange={e=>{handleMultipleRoomImages(i, cnt, e); setCnt(cnt+1)}}/>
                                </label>
                            </RoomRegistrationInputWrapper>
                            <RoomRegistrationInputWrapper>
                                <div className="imageFilesPreview" style={{display: 'flex'}}>
                                    {urlIdPair.map((pair, id) => {
                                        if(pair.id==i){
                                            return(
                                                <div className={id} key={id}>
                                                    <img src={pair.url} alt={`${pair.url}-${id}`} />
                                                    <Button fullWidth onClick={() => handleImageFilesDelete(pair.id, pair.cnt)}>Delete</Button>
                                                </div>
                                            )
                                        }
                                        
                                    })}
                                </div>
                            </RoomRegistrationInputWrapper>

                            <div className="flex">
                                <span className="mb-0 text-sm flex-auto">
                                    <Button fullWidth className="mt-4" onClick={()=>{handleAdd(i)}}>
                                        +
                                    </Button>
                                </span>
                                <span className="mb-0 text-sm flex-auto">
                                    <Button fullWidth className="mt-4" disabled={room.id===1} onClick={()=>{handleSubtract(i)}}>
                                        -
                                    </Button>
                                </span>
                            </div>
                        </>
                    )
                })}

                <div class="border rounded m-2 py-2 px-2 bg-representative-color">
                    <RoomRegistrationSendButton onClick={roomInfoSubmit}>
                        숙소 등록
                    </RoomRegistrationSendButton>
                </div>
            </RoomRegistrationWrapper>
        </div>
    )
}

export default RoomRegister