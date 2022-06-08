import React, { useState, useEffect } from "react";
import Navigator from "../common/Navigator";
import MySearch from "./MySearch";
import queryString from "query-string"
import axios from "axios";

const GuestHouseCard = ({ props }) => {

    const onClick = () => {
        window.location = "/house/" + props.id + "/roomList";
    }

    return (
        <div class=" h-48 flex mx-auto w-2/3 border rouded shadow-lg m-4 cursor-pointer" onClick={onClick}>
            <div class="w-1/3 m-2">
                <img class="my-auto h-full w-full" id={props.id} src={"data:" + props.contentType + ";base64," + props.thumbnail} />
            </div>
            <div class="mt-2">
                <span class="text-3xl font-bold block">{props.name}</span>
                <span class="text-gray-500">{props.address}</span>
            </div>
        </div>);
}

const Search = ({ location }) => {

    const [guesthouseList, setGuestHouseList] = useState([]);

    useEffect(() => {
        const { search } = location;
        const queryObj = queryString.parse(search);
        const { city, district } = queryObj;
        console.log(city, district);
        const token = localStorage.getItem("token");
        axios.get("/api/house/list", {
            headers: {
                Authorization: "Bearer " + token
            },
            params: {
                city: city,
                district: district
            }
        }).then(res => {
            setGuestHouseList(res.data);
        })
    }, []);

    return (
        <>
            <Navigator />
            <div class="w-2/3 mx-auto mt-4">
                <MySearch />
            </div>
            <div class="mx-auto w-2/3 flex flex-col mt-8">
                {guesthouseList ? guesthouseList.map(guesthouse => <GuestHouseCard props={guesthouse} />) : null}
            </div>
        </>
    )
}

export default Search;