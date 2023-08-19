import useUser from 'hooks/useUser'
import { useRouter } from 'next/router'
import { logOut } from '../../firebase/client'
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';

export default function Layout({ 
    children
}) {
    const user = useUser()
    const router = useRouter()

    const goToHome = () => {
        router.push("/home")
    }

    const goToAbout = () => {
        router.push("/about")
    }

    return (
    <>
        <header>
            <div onClick={goToHome} className="logoContainer"> 
                <img src="/logo.png" alt="Logo" />
                <h2>ContaHoras</h2>
            </div>
            {user && <h2>Ola, {user.name}</h2>}
            <div className="iconContainer">
                <div className="icon iconHelp">
                    <HelpIcon onClick={goToAbout} height={49}>Cómo se calcula?</HelpIcon>
                </div>
                <div className="icons">
                    <div className="icon">
                        <LogoutIcon onClick={logOut}>Saír</LogoutIcon>
                    </div>
                </div>
            </div>
        </header>
        <main>
            {children}
        </main>
        {/* <Footer /> */}
        <style jsx>{`
            .logoContainer {
                margin-left: var(--gutter2x);
                cursor: pointer;
                &:hover {
                    transform: scale(1.15);
                }
            }
            .iconContainer {
                display: flex;
                align-items: center;
                gap: var(--gutter);
            }
            header {
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items: center;
                height: var(--gutter6x);
                color: var(--text-primary);
                margin-top: var(--gutter);
            }
            header > div {
                display: flex;
                align-items: center;
            }
            .icons {
                display: flex;
                align-items: center;
                gap: var(--gutter);
                margin-right: var(--gutter2x);
            }
            .icon {
                cursor: pointer;
                &:hover {
                    transform: scale(1.15);
                }
            }
            .iconHelp {
                margin-right: var(--gutter2x);
            }
            h2 {
                font-size: 1rem;
            }
            img {
                width: var(--gutter4x);
            }
            main {
                padding: var(--gutter2x);
            }
        `}</style>
    </>
    )
}