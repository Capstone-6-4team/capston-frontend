import React, {useEffect, useState} from 'react'
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, InputLabel, Select, MenuItem, FormControl, Button, Menu } from "@mui/material"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Navigator from '../common/Navigator';
import Pagination from "react-js-pagination";

const EvaluationTitle = styled.div`
    ${tw`mb-5 mt-5 text-xl font-semibold  tracking-wider text-gray-800 flex`}
`;

const EvaluationContainer = styled.div`
    width: 1100px;
    margin: 50px auto;
    position: relative;
`;

const EvaluationInputWrapper = styled.form`
    ${tw`border rounded m-2 py-2 px-2 content-center flex text-center`}
`;

const EvaluationTableHeadWrapper = styled.form`
    ${tw`m-2 py-2 px-2 flex text-center`}
`;

const EvaluationSendButton = styled.button`
    width: 50px;
    ${tw` mx-auto text-lg text-white`}
`;

const ZeroStar=()=>{
    return(
        <div className="flex">
        <StarOutlineIcon sx={{ color: "red" }} />
        <StarOutlineIcon sx={{ color: "red" }} />
        <StarOutlineIcon sx={{ color: "red" }} />
        <StarOutlineIcon sx={{ color: "red" }} />
        <StarOutlineIcon sx={{ color: "red" }} />
    </div> 
    )
}

const HalfStar=()=>{
    return(
        <div className="flex">
            <StarHalfIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const OneStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const OneAndHalfStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarHalfIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const TwoStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const TwoAndHalfStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarHalfIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const ThreeStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const ThreeAndHalfStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarHalfIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const FourStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarOutlineIcon sx={{ color: "red" }} />
        </div>
    )
}

const FourAndHalfStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarHalfIcon sx={{ color: "red" }} />
        </div>
    )
}

const FiveStar=()=>{
    return(
        <div className="flex">
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
            <StarIcon sx={{ color: "red" }} />
        </div>
    )
}

function Evaluation(){

    const [score, setScore] = useState(3.8)
    const [evaluations, setEvaluations] = useState([
        {
            userName: "유저1",
            evaluation: "이분 정말 착하고 좋은 분이에요!!",
            score: 4.5
        },
        {
            userName: "유저2",
            evaluation: "잠버릇도 없고 매너가 좋으세요^^",
            score: 5.0
        },
        {
            userName: "유저3",
            evaluation: "정말 친절해서 좋았어요~",
            score: 4.7
        },
        {
            userName: "유저4",
            evaluation: "그저 갓...",
            score: 4.9
        },
        {
            userName: "유저5",
            evaluation: "진짜 적당히 좀 합시다... 말이 너무 많아서 시끄러워 죽는 줄 알았어요...",
            score: 1.5
        }
    ])
    const [currentButtonNum, setCurrentButtonNum]=useState(0)

    const submitEvaluation = () => {

    }

    useEffect(()=>{

    }, [])

    return(
        <div className="container max-w-full bg-white-100 h-200vh">
            <Navigator />
            <EvaluationContainer>
                <EvaluationTitle>
                    {"Taehun's 평가"}
                    &nbsp;&nbsp;&nbsp;
                    {
                        (score == 0) ? <ZeroStar /> : 
                        ((score > 0 && score <= 0.5) ? <HalfStar /> : 
                        ((score > 0.5 && score <= 1.0) ? <OneStar /> : 
                        ((score > 1.0 && score <= 1.5) ? <OneAndHalfStar /> : 
                        ((score > 1.5 && score <= 2.0) ? <TwoStar /> : 
                        ((score > 2.0 && score <= 2.5) ? <TwoAndHalfStar /> : 
                        ((score > 2.5 && score <= 3.0) ? <ThreeStar /> : 
                        ((score > 3.0 && score <= 3.5) ? <ThreeAndHalfStar /> : 
                        ((score > 3.5 && score <= 4.0) ? <FourStar /> : 
                        ((score > 4.0 && score <= 4.5) ? <FourAndHalfStar /> : <FiveStar />)))))))))
                    }
                    &nbsp;&nbsp;&nbsp;
                    {score + " / 5.0"}
                </EvaluationTitle>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {evaluations ? evaluations.map((element, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <EvaluationTableHeadWrapper>
                                            {element.userName}
                                        </EvaluationTableHeadWrapper>
                                    </TableCell>
                                    <TableCell align="right">
                                        <EvaluationTableHeadWrapper>
                                            {element.score}
                                        </EvaluationTableHeadWrapper>
                                    </TableCell>
                                    <TableCell align="right">
                                        <EvaluationTableHeadWrapper>
                                            {element.evaluation}
                                        </EvaluationTableHeadWrapper>
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>

                <EvaluationInputWrapper>
                    <TextareaAutosize
                        maxRows={10}
                        minRows={4}
                        aria-label="maximum height"
                        placeholder="Enter your evaluation"
                        style={{ width: 1000 }}
                    />
                    &nbsp;&nbsp;
                    <div class="border rounded m-2 py-2 px-2 bg-representative-color">
                        <EvaluationSendButton onClick={submitEvaluation}>
                            {"평가 등록"}
                        </EvaluationSendButton>
                    </div>
                </EvaluationInputWrapper>

                <Pagination
                    hideNavigation
                    activePage={0}
                    itemsCountPerPage={5}
                    totalItemsCount={5}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    itemClass='page-item'
                    linkClass='btn btn-light'
                    // onChange={(e)=>handlePageChange(e)}
                />

            </EvaluationContainer>
        </div>
    )
}

export default Evaluation;