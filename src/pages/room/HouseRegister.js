import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai"
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, NativeSelect, FormControl, Switch } from "@mui/material"

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

function HouseRegister(){
    const [guestHouseName, setGuestHouseName]=useState("")
    const [location, setLocation]=useState("")
    const [imageFiles, setImageFiles]=useState([])
    const [imageFilesUrl, setImageFilesUrl]=useState([])
    const [thumbnail, setThumbnail]=useState()
    const [thumbnailUrl, setThumbnailUrl]=useState("")
    
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
        setImageFilesUrl(imageUrlLists) // 이미지 url 업데이트

        const value=[...imageFiles, e.target.files[0]]
        setImageFiles(value) // 실제 이미지 업데이트

        console.log(imageFiles)
        console.log(imageFilesUrl)
    }

    const handleImageFilesDelete=(id)=>{
        setImageFilesUrl(imageFilesUrl.filter((_, index) => index !== id))
        setImageFiles(imageFiles.filter((_, index) => index !== id))
    }
    
    const houseInfoSubmit = () => {
    
        const body = new FormData()
        body.append("guestHouseName", guestHouseName)
        body.append("location", location)
        body.append("thumbnail", thumbnail)
        imageFiles.forEach((file)=>{body.append("files", file)})
        
        axios.post("/api/house/register/guesthouse", body, {
            headers: {
                "Content-Type": `multipart/form-data`
            }
        }).then(res => {
            console.log("방 등록 성공");
            let houseId=res.data
            window.location.href="/house/" + houseId + "/room/register"
        }).catch(err => {
            console.log(err);
            console.log("방 등록 실패");
            window.location.href="/"
        })
    }

    useEffect(() => {
        console.log("--------------Rendering--------------");
    })
    
    return (
        <>
            <div class="container mx-auto mb-10 bg-white text-black mt-4">
                <HouseRegistrationWrapper>
                    <HouseRegistrationInputWrapper>
                        <HouseRegistrationInputText>
                            <span class="flex">게스트하우스 이름</span>
                        </HouseRegistrationInputText>
                        <input type="text" name="guestHouseName" value={guestHouseName} onChange={e=>{setGuestHouseName(e.target.value)}} required />
                    </HouseRegistrationInputWrapper>
        
                    <HouseRegistrationInputWrapper>
                        <HouseRegistrationInputText>
                            <span>위치</span>
                        </HouseRegistrationInputText>
                        <input type="text" name="location" size="50" value={location} onChange={e=>{setLocation(e.target.value)}} required />
                    </HouseRegistrationInputWrapper>
        
                    <HouseRegistrationInputWrapper>
                        <HouseRegistrationInputText>
                            <span>썸네일</span>
                        </HouseRegistrationInputText>
                        <input type="file" name="file" id="file" accept="image/*" onChange={e=>handleImage(e)}/>
                    </HouseRegistrationInputWrapper>
                    <div className="show_media" style={{display: thumbnailUrl ? 'grid':'none'}}>
                        <div id="file_media">
                            <img id="preview" src={''} alt="thumbnailURL" />
                            <span onClick={handleThumbnailDelete}>Delete</span>
                        </div>
                    </div>
        
                    <HouseRegistrationInputWrapper>
                        <label onChange={handleMultipleImages}>
                            <HouseRegistrationInputText>
                                <span>등록할 사진들</span>
                            </HouseRegistrationInputText>
                            <input multiple type="file" name="files" id="files" accept="image/*" onChange={e=>handleMultipleImages(e)}/>
                        </label>
                    </HouseRegistrationInputWrapper>

                    <div className="imageFilesPreview" style={{display: 'flex'}}>
                        {imageFilesUrl.map((image, id) => (
                            <div className={id} key={id}>
                            <img src={image} alt={`${image}-${id}`} />
                            <span onClick={() => handleImageFilesDelete(id)}>Delete</span>
                            </div>
                        ))}
                    </div>
        
                    <div class="border rounded m-2 py-2 px-2 bg-representative-color">
                        <HouseRegistrationSendButton onClick={houseInfoSubmit}>
                            숙소 등록
                        </HouseRegistrationSendButton>
                    </div>
                </HouseRegistrationWrapper>
            </div>


        </>
    );
}

export default HouseRegister;