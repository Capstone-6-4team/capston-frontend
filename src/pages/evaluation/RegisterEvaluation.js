import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import tw from "twin.macro";
import styled from "@emotion/styled"
import { Input, InputLabel, Select, MenuItem, FormControl, Button, Menu } from "@mui/material"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Navigator from '../common/Navigator';
import Pagination from "react-js-pagination";
import axios from 'axios';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const EvaluationContainer = styled.div`
    width: 1100px;
    margin: 50px auto;
    position: relative;
`;

const EvaluationTitle = styled.div`
    ${tw`mb-5 mt-5 text-xl font-semibold  tracking-wider text-gray-800 flex`}
`;

const EvaluationInputWrapper = styled.form`
    ${tw`border rounded m-2 py-2 px-2 content-center flex text-center`}
`;

const EvaluationSendButton = styled.button`
    width: 50px;
    ${tw` mx-auto text-lg text-white`}
`;

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function RegisterEvaluation(){
    const { id } = useParams()
    const history = useHistory()
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [comment, setComment] = useState();
    
    useEffect(()=>{

    }, [])

    const submitEvaluation = () => {
        const formData = new FormData()

        console.log(id)
        console.log(comment)
        console.log(value)
        formData.append("targetUserId", id)
        formData.append("comment", comment)
        formData.append("score", value)

        axios.post("/api/review/register", formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log("review id: " + res.data)
            history.goBack()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onChangeComment = (e) => {
        console.log(e.target.value)
        setComment(e.target.value)
    }
    
    return(
        <div className="container max-w-full bg-white-100 h-200vh">
            <Navigator />
            <EvaluationContainer>
                <EvaluationTitle>
                    {"User에 대한 평가"}
                    &nbsp;&nbsp;&nbsp;
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                console.log("evaluation score: " + value)
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={() => history.goBack()}>
                        뒤로 가기
                    </Button>
                </EvaluationTitle>

                {/* <TableContainer component={Paper}>
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
                </TableContainer> */}

                <EvaluationInputWrapper>
                    <TextareaAutosize
                        maxRows={10}
                        minRows={4}
                        aria-label="maximum height"
                        placeholder="Enter your evaluation"
                        style={{ width: 1000 }}
                        value={comment}
                        onChange={(e)=>onChangeComment(e)}
                    />
                    &nbsp;&nbsp;
                    <div class="border rounded m-2 py-2 px-2 bg-representative-color">
                        <EvaluationSendButton onClick={submitEvaluation}>
                            {"평가 등록"}
                        </EvaluationSendButton>
                    </div>
                </EvaluationInputWrapper>

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

export default RegisterEvaluation;