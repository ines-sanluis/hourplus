import useUser from 'hooks/useUser'
// import Footer from '../Footer'
import Avatar from 'components/Avatar'

export default function Layout({ 
    children
}) {
    const user = useUser()

    return (
    <>
        <header>
            <div>
                <img src="/logo.png" alt="Logo" />
                <h2>ContaHoras</h2>
            </div>
            {user && <Avatar
                src={user.avatar}
                alt={user.name}
                withText
            />}
        </header>
        <main>
            {children}
        </main>
        {/* <Footer /> */}
        <style jsx>{`
            header {
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items: center;
                height: var(--gutter6x);
                border-bottom: 1px solid var(--shadow);
            }
            header > div {
                display: flex;
                align-items: center;
                margin-left: var(--gutter);
                margin-right: var(--gutter);
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