import React from 'react'
import style from './styles.module.css'

function Range({
    time,
    start,
    end,
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
        <p
            className={style.range}
            style={containerStyle}
        >
            <span className={style.time}>{time}</span>
            <span>
                {start} a {end}
            </span>
        </p>
    )
}

export default Range