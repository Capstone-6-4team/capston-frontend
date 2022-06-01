import styled from "@emotion/styled";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import tw from "twin.macro";
import MySearch from "../search/MySearch"
import Navigator from '../common/Navigator';
import './MainPage.css';

const CarouselContainer = styled.div`
    width: 1100px;
    margin: 50px auto;
    position: relative;
`;

const InnerCarousel = styled.div`
    width: 100%;
    height: 400px;
    overflow: hidden;
`;

const Track = styled.div`
    display: inline-flex;
    height: 100%;
    transition: transform 0.2s ease-in-out;
    width: 100%;
`;

const CardContainer = styled.div`
    width: 275px;
    height: 300px;
    flex-shrink: 0;
    padding-right: 10px;
    ${tw`mx-auto`}
`;

const ImageWrapper = styled.div`
   width: 100%;
   height: 80%;
   background-position: center bottom;
   background-size: center;
   background-repeat: no-repeat;
   border-radius: 10px;
   ${tw`mx-auto w-full`}
`;

const RoomImage = styled.img`
  ${tw`object-cover w-full h-60 rounded-lg mb-5 mt-5`}
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


function MainPage() {
    const container = useRef();
    const prev = useRef();
    const next = useRef();
    const track = useRef();
    const [index, setIndex] = useState(0);
    const [width, setWidth] = useState();
    const [city, setCity] = useState("서울")
    const [guestHouseList, setGuestHouseList] = useState([]);
    const [maxSlideCnt, setMaxSlideCnt] = useState();

    const nextClick = (e) => {
        e.preventDefault();

        if (index == maxSlideCnt) setIndex(0);
        else setIndex(index + 1);
    }

    const prevClick = (e) => {
        e.preventDefault();

        if (index === 0) setIndex(maxSlideCnt)
        else setIndex(index - 1)
    }

    const changeCity = (e) => {
        let newCity = e.target.value;
        setCity(newCity)
    }

    useEffect(() => {
        track.current.style.transition = 'transform 0.5s ease-in-out';
        track.current.style.transform = `translateX(${index * (-width)}px)`;
    }, [index])

    useEffect(() => {
        const box = container.current.getBoundingClientRect();
        setWidth(box.width)
    }, [])

    useEffect(() => {
        console.log("city: " + city)
        let encodedCity = encodeURIComponent(city);
        axios.get("/api/house/guesthouse/location?city=" + encodedCity)
            .then((res) => {
                console.log(res.data)
                setGuestHouseList(res.data)
                setMaxSlideCnt(res.data.length / 4 - 1)
            })
    }, [city])

    return (

        <div className="container max-w-full bg-white-100 h-200vh">
            <Navigator />
            <CarouselContainer>
                <MySearch />
            </CarouselContainer>
            <CarouselContainer ref={container}>
                <RoomNameText>
                    {"지역별 게스트하우스 추천"}
                </RoomNameText>
                <Button value={"서울"} onClick={(e) => changeCity(e)}>서울</Button>
                <Button value={"부산"} onClick={(e) => changeCity(e)}>부산</Button>
                <Button value={"제주"} onClick={(e) => changeCity(e)}>제주</Button>
                <Button value={"인천"} onClick={(e) => changeCity(e)}>인천</Button>
                <Button value={"강릉"} onClick={(e) => changeCity(e)}>강릉</Button>
                <InnerCarousel>

                    <Track ref={track}>
                        {guestHouseList ? guestHouseList.map((guestHouse) => {
                            return (
                                <CardContainer>
                                    <ImageWrapper>
                                        <RoomImage
                                            src={"data:" + guestHouse.contentType + ";base64," + guestHouse.data}
                                            alt=""
                                        />
                                    </ImageWrapper>
                                    <RoomContentWrapper>
                                        <RoomNameText>
                                            {guestHouse.guestHouseName}
                                        </RoomNameText>
                                        <div className="flex">
                                            <div class="font-semibold">가격</div>
                                            <RoomInfoText>
                                                &nbsp;{"100000원"}
                                            </RoomInfoText>
                                        </div>
                                    </RoomContentWrapper>
                                </CardContainer>
                            )
                        }) : null}
                    </Track>
                    <div className="nav">
                        <button className="prev" ref={prev} onClick={(e) => prevClick(e)}>
                            <div className="text-2xl font-medium">{"<<"}</div>
                        </button>
                        <button className="next" ref={next} onClick={(e) => nextClick(e)}>
                            <div className="text-2xl font-medium">{">>"}</div>
                        </button>
                    </div>
                </InnerCarousel>
            </CarouselContainer>

        </div>

    )
}

export default MainPage;