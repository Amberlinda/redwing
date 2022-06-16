import React, { Fragment } from 'react'

const BottomStatistics = ({count=[], label, color="#fff"}) => {
    return(
        <Fragment>
            <div>
                <span style={{color:color}}>{count ? count.length : 0} {label}: </span> 
                {count.map(el => el).join(", ")}
            </div>
        </Fragment>
    )
}

export default BottomStatistics