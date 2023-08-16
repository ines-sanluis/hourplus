import React, { useEffect, useState } from "react"
import Head from "next/head"
import Button from "../components/Button"
import Google from "../components/Icons/Google"

import { loginWithGoogle, onAuthStateChanged } from "../firebase/client"

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGoogle()
      .then((response) => {
        const userData = response.user.user.multiFactor.user
        setUser({
          name: userData.displayName,
          avatar: userData.photoURL,
          id: userData.uid,
          email: userData.email,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>ContaHoras 🕒</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <img src="/logo.png" alt="Logo" />
        <h1>ContaHoras</h1>
        <h2>A ponte entre as tuas horas e o teu soldo</h2>
        <div>
          {user === null && (
            <Button onClick={handleClick}>
              <Google fill="#fff" width={24} height={24} />
              Login con Google
            </Button>
          )}
          {user && user.avatar && (
            <div>
              <img src={user.avatar} alt={user.name} />
              <strong>{user.name}</strong>
            </div>
          )}
        </div>
      </section>
      <style jsx>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        h1 {
          color: var(--secondary);
          font-weight: bold;
          font-size: 3rem;
          margin: var(--gutter);
        }

        h2 {
          color: var(--primary);
          font-size: 1.75rem;
          margin: 0;
          text-align: center;
          margin-bottom: var(--gutter3x);
          max-width: 400px;
        }
      `}</style>
    </>
  )
}
