import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, Button, NativeSelect, FormControl, Switch } from "@mui/material"
import AddressTest from "./AddressTest";
import Navigator from "../common/Navigator";

const HouseRegistrationInputText = styled.div`
    ${tw`font-semibold text-lg mr-4`}
`;
const HouseRegistrationSendButton = styled.button`
    ${tw`w-full mx-auto text-lg text-white`}
`;

const HouseRegistrationWrapper = styled.div`
    ${tw`container w-1/2 mx-auto flex flex-col mb-10 bg-white text-black justify-items-center`}
`;

const HouseRegistrationInputWrapper = styled.form`
    ${tw`border rounded m-2 py-2 px-2`}
`;

const RoomNameText = styled.div`
  ${tw`mt-5 mx-5 my-5 text-xl font-semibold tracking-wider text-gray-800`}
`;

function HouseRegister(){

    const [guestHouseName, setGuestHouseName]=useState("")
    const [location, setLocation]=useState("")
    const [specificLocation, setSpecificLocation]=useState(null)
    const [imageFiles, setImageFiles]=useState([])
    const [imageFilesUrl, setImageFilesUrl]=useState([])
    const [thumbnail, setThumbnail]=useState()
    const [thumbnailUrl, setThumbnailUrl]=useState("")
    const [isExit, setIsExit]=useState(false)
    
    const handleImage = (e)=>{

        const file = e.target.files[0]
        const err = checkImage(file)
    
        if(err) return window.alert(err)
        if(file){
            var preview = document.getElementById('preview')
            var url = URL.createObjectURL(file)
            preview.src = url
            setThumbnailUrl(url)
        }
        setThumbnail(file)
    }
    
    const checkImage = (file) =>{
        let err=""
    
        if(!file) return err="File does not exist."
        if(file.size>1024*1024){
            err = "The largest image size is 1mb."
        }
        if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
            err = "Image format is incorrect."
        }
    
        return err
    }
    
    const handleThumbnailDelete= () =>{
        setThumbnail(null)
        setThumbnailUrl(null)
        var preview = document.getElementById('preview')
        preview.src = ''
    }
    
    const handleMultipleImages=(e)=>{

        const imageLists=e.target.files
        let imageUrlLists=[...imageFilesUrl]

        for(let i=0; i<imageLists.length; i++){
            const currentImageUrl=URL.createObjectURL(imageLists[i])
            imageUrlLists.push(currentImageUrl)
        }
        setImageFilesUrl(imageUrlLists) // ????????? url ????????????

        const value=[...imageFiles, e.target.files[0]]
        setImageFiles(value) // ?????? ????????? ????????????

        console.log(imageFiles)
        console.log(imageFilesUrl)
    }

    const handleImageFilesDelete=(id)=>{
        setImageFilesUrl(imageFilesUrl.filter((_, index) => index !== id))
        setImageFiles(imageFiles.filter((_, index) => index !== id))
    }

    const changeLocation=(addr)=>{
        setLocation(addr)
    }

    const exitAddressFind = () => {
        setIsExit(true)
    }
    
    const houseInfoSubmit = () => {
    
        const body = new FormData()
        body.append("guestHouseName", guestHouseName)
        body.append("location", location)
        body.append("specificLocation", specificLocation)
        body.append("thumbnail", thumbnail)
        imageFiles.forEach((file)=>{body.append("files", file)})
        
        axios.post("/api/house/register/guesthouse", body, {
            headers: {
                "Content-Type": `multipart/form-data`,
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            console.log("??? ?????? ??????");
            let houseId=res.data.guestHouseId
            window.location.href="/house/" + houseId + "/room/register"
        }).catch(err => {
            console.log(err);
            console.log("??? ?????? ??????");
            alert("????????? ????????? ????????? ????????? ???????????????.")
            window.location.href="/"
        })
    }

    useEffect(() => {
        console.log("--------------Rendering--------------");
    })
    
    return (
        <>
            <div class="container mx-auto mb-10 bg-white text-black mt-4">
                <Navigator/>
                <HouseRegistrationWrapper>
                    <RoomNameText>
                        {"????????? ?????????????????? ??????"}
                    </RoomNameText>
                    <HouseRegistrationInputWrapper>
                        <HouseRegistrationInputText>
                            <span class="flex">?????????????????? ??????</span>
                        </HouseRegistrationInputText>
                        <Input fullWidth type="text" name="guestHouseName" value={guestHouseName} onChange={e=>{setGuestHouseName(e.target.value)}} required />
                    </HouseRegistrationInputWrapper>
        
                    <HouseRegistrationInputWrapper>
                        <HouseRegistrationInputText>
                            <span>??????</span>
                        </HouseRegistrationInputText>
                        {/* <input type="text" name="location" size="50" value={location} onChange={e=>{setLocation(e.target.value)}} required /> */}
                        <AddressTest onChange={changeLocation}/>
                        <div>
                            {location}
                        </div>
                    </HouseRegistrationInputWrapper>

                    <HouseRegistrationInputWrapper>
                        <HouseRegistrationInputText>
                            <span class="flex">?????? ??????</span>
                        </HouseRegistrationInputText>
                        <Input fullWidth type="text" name="specificLocation" value={specificLocation} onChange={e=>{setSpecificLocation(e.target.value)}} required />
                    </HouseRegistrationInputWrapper>
        
                    <HouseRegistrationInputWrapper>
                        <HouseRegistrationInputText>
                            <span>?????????</span>
                        </HouseRegistrationInputText>
                        <input type="file" name="file" id="file" accept="image/*" onChange={e=>handleImage(e)}/>
                    </HouseRegistrationInputWrapper>
                    <HouseRegistrationInputWrapper>
                    <div className="show_media" style={{display: thumbnailUrl ? 'grid':'none'}}>
                        <div id="file_media">
                            <img className="items-center" id="preview" src={''} alt="thumbnailURL" />
                            <Button fullWidth onClick={handleThumbnailDelete}>Delete</Button>
                        </div>
                    </div>
                    </HouseRegistrationInputWrapper>
                    <HouseRegistrationInputWrapper>
                        <label onChange={handleMultipleImages}>
                            <HouseRegistrationInputText>
                                <span>????????? ?????????</span>
                            </HouseRegistrationInputText>
                            <input multiple type="file" name="files" id="files" accept="image/*" onChange={e=>handleMultipleImages(e)}/>
                        </label>
                    </HouseRegistrationInputWrapper>
                    <HouseRegistrationInputWrapper>
                    <div className="imageFilesPreview" style={{display: 'flex'}}>
                        {imageFilesUrl.map((image, id) => (
                            <div className={id} key={id}>
                            <img src={image} alt={`${image}-${id}`} />
                            <Button fullWidth onClick={() => handleImageFilesDelete(id)}>Delete</Button>
                            </div>
                        ))}
                    </div>
                    </HouseRegistrationInputWrapper>
                    <div class="border rounded m-2 py-2 px-2 bg-representative-color">
                        <HouseRegistrationSendButton onClick={houseInfoSubmit}>
                            ?????? ??????
                        </HouseRegistrationSendButton>
                    </div>
                </HouseRegistrationWrapper>
            </div>


        </>
    );
}

export default HouseRegister;