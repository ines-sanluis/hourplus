import React from 'react'
import style from './Time.module.css'

function Time({
    time,
    title,
    backgroundColor,
    color,
    disabled
}) {
    const containerStyle = {
        backgroundColor: disabled ? '#c8c8c8' : backgroundColor,
        color: disabled ? 'gray' : color,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
    };

    return (
        <div style={containerStyle} className={style.time}>
            <span>{time}</span>
            <p>{title}</p>
        </div>
    )
}

export default Time