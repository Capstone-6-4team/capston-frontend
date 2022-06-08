import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, InputLabel, Select, MenuItem, FormControl, Button, Menu } from "@mui/material"
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Navigator from '../common/Navigator';
import Pagination from "react-js-pagination";
import axios from 'axios';

const EvaluationTitle = styled.div`
    ${tw`mb-5 mt-5 text-xl font-semibold  tracking-wider text-gray-800 flex`}
`;

const EvaluationContainer = styled.div`
    width: 1100px;
    margin: 50px auto;
    position: relative;
`;

const EvaluationTableHeadWrapper = styled.form`
    ${tw`m-2 py-2 px-2 flex text-center`}
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

function ShowEvaluation(){

    const {id} = useParams();
    const history = useHistory();
    const [userName, setUserName] = useState()
    const [score, setScore] = useState(3.8)
    const [evaluations, setEvaluations] = useState([])
    // const [currentButtonNum, setCurrentButtonNum]=useState(0)

    useEffect(()=>{
        axios.get("/api/review/" + id + "/info")
        .then((res)=>{
            console.log(res.data)
            setScore(res.data.average)
            setEvaluations(res.data.reviews)
            setUserName(res.data.userName)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

    return(
        <div className="container max-w-full bg-white-100 h-200vh">
            <Navigator />
            <EvaluationContainer>
                <EvaluationTitle>
                    {userName + "에 대한 평가"}
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
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={() => history.goBack()}>
                        뒤로 가기
                    </Button>
                </EvaluationTitle>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {evaluations ? evaluations.map((evaluation, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <EvaluationTableHeadWrapper>
                                            {evaluation.writerName}
                                        </EvaluationTableHeadWrapper>
                                    </TableCell>
                                    <TableCell align="right">
                                        <EvaluationTableHeadWrapper>
                                            {evaluation.score}
                                        </EvaluationTableHeadWrapper>
                                    </TableCell>
                                    <TableCell align="right">
                                        <EvaluationTableHeadWrapper>
                                            {evaluation.comment}
                                        </EvaluationTableHeadWrapper>
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* <EvaluationInputWrapper>
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
                </EvaluationInputWrapper> */}

                {/* <Pagination
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
                /> */}

            </EvaluationContainer>
        </div>
    )
}

export default ShowEvaluation;