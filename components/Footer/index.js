import React from 'react'
import style from './styles.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Footer({
}) {
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <div className={style.footer}>
            {currentPath === "/" ? <Link href="/about">
                Cómo se calcula?
            </Link> : <Link href="/">
                <ArrowBackIosIcon></ArrowBackIosIcon>
                Atrás
            </Link>}
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
    )
}

export default Footer