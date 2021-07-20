import React from 'react'
import Error404Img from '../assets/images/Error404.jpg'

export const Error404 = () => {
    return (
        <div style={{'textAlign': 'center', 'margin': '40px'}}>
           <img src={Error404Img} />
        </div>
    )
}