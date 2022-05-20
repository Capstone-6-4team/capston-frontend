import React, { useState, useEffect } from "react";
import { useRecoilState, atom } from 'recoil';
import axios from "axios";
import {useParams} from "react-router";
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, NativeSelect, FormControl, Switch, Button } from "@mui/material"

const RoomRegistrationWrapper = styled.div`
    ${tw`container w-1/2 mx-auto flex flex-col mb-10 bg-white text-black justify-items-center`}
`;

const RoomRegistrationInputText = styled.div`
    ${tw`font-semibold text-lg mr-4`}
`;

const RoomRegistrationInputWrapper = styled.form`
    ${tw`border rounded m-2 py-2 px-2`}
`;

const RoomRegistrationSendButton = styled.button`
    ${tw`w-full mx-auto text-lg text-white`}
`;

const Bed = styled.div`
    ${tw`w-6 h-6 bg-black text-white`}
`;

const Bed2 = styled.div`
    ${tw`w-8 h-6 bg-black text-white`}
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
        console.log("----------dragStartHandler----------")

        posX = e.clientX; // 클릭했을 때 마우스 x좌표 위치
        posY = e.clientY; // 클릭했을 때 마우스 y좌표 위치

        originalX = e.target.offsetLeft; // 박스의 왼쪽 위 꼭지점 x좌표
        originalY = e.target.offsetTop; // 박스의 왼쪽 위 꼭지점 y좌표

        // console.log("posX: " + posX)
        // console.log("posY: " + posY)

        // console.log("originalX: " + originalX)
        // console.log("originalY: " + originalY)
    };

    const dragHandler = (e) => {
        console.log("----------dragHandler----------")

        e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
        e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;

        // console.log("moving box left location: " + (e.target.offsetLeft + e.clientX - posX))
        // console.log("moving box top location: " + (e.target.offsetTop + e.clientY - posY))

        posY = e.clientY;
        posX = e.clientX;

        // console.log("posX: " + posX)
        // console.log("posY: " + posY)
    };

    const dragEndHandler = (e, i, type) => {
        console.log("----------dragEndHandler----------")

        // console.log("posX: " + posX)
        // console.log("posY: " + posY)
        // console.log("e.offsetX: " + e.offsetX)
        // console.log("e.offsetY: " + e.offsetY)

        // console.log("offsetLeft: " + e.target.offsetLeft)
        // console.log("offsetTop: " + e.target.offsetTop)

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
                    'background-color': "black",
                    type: type ? 1 : 0
                }
            );
            setTargets(newTargets);

            let newCount=count+1
            setCount(newCount);
        }

        e.target.style.left = `${originalX}px`;
        e.target.style.top = `${originalY}px`;

        // console.log("new box left location: " + (e.target.offsetLeft + e.clientX - posX - imageLeft))
        // console.log("new box top location: " + (e.target.offsetTop + e.clientY - posY - imageTop))

        // console.log("original box left location: " + originalX)
        // console.log("original box top location: " + originalY)
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

        // body.forEach((room) => {
        //     const json = JSON.stringify(room) 
        //     formData.append("room", json)
        // })
        
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
            console.log("newImageTop: " + imageTop)
            console.log("newImageBottom: " + imageBottom)
            console.log("newImageLeft: " + imageLeft)
            console.log("newImageRight: " + imageRight)

            const targetLeftString = target.left
            let targetLeft = parseFloat(targetLeftString.replace("px", ""))
            console.log("targetLeft: " + targetLeft)

            const targetTopString = target.top
            let targetTop = parseFloat(targetTopString.replace("px", ""))
            console.log("targetTop: " + targetTop)
            console.log("\n")

            if(target.type==0){
                let bedElement = {
                    xLocationRatio: (Math.abs(targetLeft) / Math.abs(imageRight - imageLeft)).toFixed(15),
                    yLocationRatio: (Math.abs(targetTop) / Math.abs(imageBottom - imageTop)).toFixed(15),
                    floor: 1
                }
                // const json = JSON.stringify(bedElement)
                // console.log(json)
                // formData.append("bed", json)

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
                "Content-Type": `multipart/form-data`
            }
        }).then(res => {
            console.log("방 등록 성공");
            // let houseId=res.data.data
            window.location.href="/"
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
        <>
            <RoomRegistrationWrapper>
                {rooms.map((room, i)=>{
                    return(
                        <>
                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">방 이름</span>
                                </RoomRegistrationInputText>
                                <input type="text" name="roomName" value={room.roomName} onChange={e=>{handleChangeInput(i, e)}} required />
                            </RoomRegistrationInputWrapper>
                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">수용력</span>
                                </RoomRegistrationInputText>
                                <input type="number" name="capacity" min="1" max="100" value={room.capacity} onChange={e=>{handleChangeInput(i, e)}} required />
                            </RoomRegistrationInputWrapper>
                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">가격</span>
                                </RoomRegistrationInputText>
                                <input type="number" name="price" min="1" value={room.price} onChange={e=>{handleChangeInput(i, e)}} required />
                            </RoomRegistrationInputWrapper>
                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">흡연 여부</span>
                                </RoomRegistrationInputText>
                                <select name="smoke" id="smoke-select" onChange={e=>{handleChangeInput(i, e)}} required>
                                    <option value="">--Please choose an option--</option>
                                    <option value="false">X</option>
                                    <option value="true">O</option>
                                </select>
                            </RoomRegistrationInputWrapper>
                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span class="flex">성별 제약조건</span>
                                </RoomRegistrationInputText>
                                <select name="genderConstraint" id="sexConstraint-select" onChange={e=>{handleChangeInput(i, e)}} required>
                                    <option value="">--Please choose an option--</option>
                                    <option value="0">남자만</option>
                                    <option value="1">여자만</option>
                                    <option value="2">혼성</option>
                                </select>
                            </RoomRegistrationInputWrapper>

                            <RoomRegistrationInputWrapper>
                                <RoomRegistrationInputText>
                                    <span>방 도면/설계도</span>
                                </RoomRegistrationInputText>
                                <input type="file" name={"file" + i } id={"file" + i} accept="image/*" onChange={e=>handleBlueprintImage(i, e)}/>
                            </RoomRegistrationInputWrapper>
                            <Bed onDragStart={e=>dragStartHandler(e)}
                            onDrag={e=>dragHandler(e)} 
                            onDragEnd={e=>dragEndHandler(e, i, 0)} draggable="true" id="bed1">
                                1
                            </Bed>
                            <Bed2 onDragStart={e=>dragStartHandler(e)}
                            onDrag={e=>dragHandler(e)} 
                            onDragEnd={e=>dragEndHandler(e, i, 1)} draggable="true" id="bed2">
                                2
                            </Bed2>

                            <div className="show_media" style={{position: 'relative', display: blueprintUrlIdPair[i] ? 'grid':'none'}}>

                                <div id={"file_media " + i}>
                                    <img id={"preview " + i} src={''} alt="blueprintURL" />
                                    {targets.map((target, index)=>{
                                        if(target.blueprint==i){
                                            if(target.type==0){
                                                return(
                                                    <Bed onContextMenu={e=>removeHandler(e, target.num)} draggable="false" 
                                                    style={target} id={"bed" + index}>
                                                        1
                                                    </Bed>
                                                )
                                            }
                                            else if(target.type==1){
                                                return(
                                                    <Bed2 onDragStartonDragStart={e=>dragStartHandler(e)} 
                                                    onDrag={e=>dragHandler(e)} 
                                                    onDragEnd={e=>dragEndHandler(e)} onContextMenu={e=>removeHandler(e, target.num)} draggable="false" 
                                                    style={target} id={"bed" + index}>
                                                        2
                                                    </Bed2>
                                                )
                                            }

                                        }
                                    })}
                                </div>
                                <span onClick={() => handleBlueprintDelete(i)}>Delete</span>
                            </div>

                            <RoomRegistrationInputWrapper>
                                <label>
                                    <RoomRegistrationInputText>
                                        <span>등록할 사진들</span>
                                    </RoomRegistrationInputText>
                                    <input multiple type="file" name="files" id="files" accept="image/*" onChange={e=>{handleMultipleRoomImages(i, cnt, e); setCnt(cnt+1)}}/>
                                </label>
                            </RoomRegistrationInputWrapper>
                            {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
                            <div className="imageFilesPreview" style={{display: 'flex'}}>
                                {urlIdPair.map((pair, id) => {
                                    if(pair.id==i){
                                        return(
                                            <div className={id} key={id}>
                                                <img src={pair.url} alt={`${pair.url}-${id}`} />
                                                <span onClick={() => handleImageFilesDelete(pair.id, pair.cnt)}>Delete</span>
                                            </div>
                                        )
                                    }
                                    
                                })}
                            </div>
                            <span className="mb-0 text-sm">
                                <Button className="mt-4" onClick={()=>{handleAdd(i)}}>
                                    +
                                </Button>
                            </span>
                            <span className="mb-0 text-sm">
                                <Button className="mt-4" disabled={room.id===1} onClick={()=>{handleSubtract(i)}}>
                                    -
                                </Button>
                            </span>
                        </>
                    )
                })}
                <div class="border rounded m-2 py-2 px-2 bg-representative-color">
                    <RoomRegistrationSendButton onClick={roomInfoSubmit}>
                        숙소 등록
                    </RoomRegistrationSendButton>
                </div>
            </RoomRegistrationWrapper>
        </>
    )
}

export default RoomRegister