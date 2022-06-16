import React, { useState } from 'react'

import './TeamWork.css'

const TeamWorkSegmenting = ({selectedSegmentation, setSelectedSegmentation}) => {

    const [options,setOptions] = useState(["default","playground","project","performance"])

    const segmentHandler = (option) => {
        if(!option)return
        setSelectedSegmentation(option)
    }

    return(
        <div className="segmentingCont">
            Segmenting:
            <ul className="segmentingListCont">
                {options.map(elem => (
                    <li 
                    style={elem == selectedSegmentation ? {fontWeight:"bold"} : {}}
                    onClick={() => segmentHandler(elem)}>{elem}</li>
                ))}
            </ul>
        </div>
    )
}

export default TeamWorkSegmenting