import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, atom } from 'recoil';
import tw from "twin.macro";
import styled from "@emotion/styled"

const Bed = styled.div`
    ${tw`w-24 h-12 bg-black relative`}
`;

const Board = styled.div`
    ${tw`w-96 h-96 m-4 p-4 border border-black border-solid relative`}
`;

let posX = 0;
let posY = 0;

let originalX = 0;
let originalY = 0;

function BedLocationTest(){

    const targetsState=atom({
        key: 'targetsState',
        default: [],
    })
    
    const container = useRef();
    const [targets, setTargets] = useRecoilState(targetsState);
    const [box, setBox] = useState();
    const [count, setCount] = useState(0);

    const dragStartHandler = (e) => {
        console.log("----------dragStartHandler----------")

        posX = e.clientX;
        posY = e.clientY;

        // (originalX, originalY)는 항상 (0, 0)을 가리킨다
        originalX = e.target.offsetLeft;
        originalY = e.target.offsetTop;

        console.log("posX: " + posX)
        console.log("posY: " + posY)

        console.log("originalX: " + originalX)
        console.log("originalY: " + originalY)
    };

    const dragHandler = (e) => {
        console.log("----------dragHandler----------")

        e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
        e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
        posY = e.clientY;
        posX = e.clientX;

        console.log("moving box left location: " + (e.target.offsetLeft + e.clientX - posX))
        console.log("moving box top location: " + (e.target.offsetTop + e.clientY - posY))

        console.log("posX: " + posX)
        console.log("posY: " + posY)
    };

    const dragEndHandler = (e) => {
        console.log("----------dragEndHandler----------")

        if (box.left < e.clientX && e.clientX < box.right && box.top < e.clientY && e.clientY < box.bottom) {
            const newTargets = [...targets];
            newTargets.push(
                {
                    num: count,
                    width: "96px",
                    height: "48px",
                    position: "absolute",
                    left: `${ e.target.offsetLeft + e.clientX - posX - box.left }px`,
                    top: `${ e.target.offsetTop + e.clientY - posY - box.top }px`,
                    'background-color': "black",
                }
            );
            setTargets(newTargets);

            let newCount=count+1
            setCount(newCount);
        }

        e.target.style.left = `${originalX}px`;
        e.target.style.top = `${originalY}px`;

        console.log("new box left location: " + (e.target.offsetLeft + e.clientX - posX - box.left))
        console.log("new box top location: " + (e.target.offsetTop + e.clientY - posY - box.top))

        console.log("original box left location: " + originalX)
        console.log("original box top location: " + originalY)
    }

    const removeHandler = (e, num) => {
        e.preventDefault();

        console.log(e)
        const oldTargets=[...targets]
        setTargets(oldTargets.filter((target) => target.num !== num ))

        let newCount=count-1
        setCount(newCount);
    }

    useEffect(() => {
        const box = container.current.getBoundingClientRect();
        setBox({
            top: box.top,
            left: box.left,
            bottom: box.top + box.height,
            right: box.left + box.width,
        });
    }, []);
    
    return(
        <div>
            <Bed onDragStart={e=>dragStartHandler(e)} onDrag={e=>dragHandler(e)} onDragEnd={e=>dragEndHandler(e)} draggable="true" id="bed">
                Bed
            </Bed>

            <Board ref={container} id="board">
                {targets.map((target, index)=>(
                    <Bed onDragStartonDragStart={e=>dragStartHandler(e)} onDrag={e=>dragHandler(e)} 
                    onDragEnd={e=>dragEndHandler(e)} onContextMenu={e=>removeHandler(e, target.num)} draggable="false" 
                    style={target} id={"bed" + index}>
                        Bed
                    </Bed>
                ))}
            </Board>
        </div>
    );
}

export default BedLocationTest;