import React from 'react'
import style from './Footer.module.css'
import { useRouter } from 'next/router'

function Footer({
    onInfoClick
}) {
    const router = useRouter();
    return (
        <>
            <div className={style.footer}>
                <button onClick={onInfoClick}>Cómo se calcula?</button>
                <p>
                    <span>Realizado por</span>
                    <a 
                        href="https://www.linkedin.com/in/ines-sanluis/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Inés San Luís
                    </a>
                </p>
            </div>
        </>
    )
}

export default Footer