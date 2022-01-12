import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className="h-screen gradient">
      <div className="h-screen dots bg-blend-multiply">
        <Head>
          <title>LewLights - Lakeland TN Holiday Light Show</title>
          <meta name="description" content="LewLights is an animated, synchronized Holiday Light Show in Lakeland, TN." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="container mx-auto">
          <h1 className="text-2xl font-bold">
            LewLights
          </h1>
          <svg width="24" height="24">
            <path d="M 0 0 L 0 24 L 24 24 L 24 0 L 0 0
                     M 6, 12
                     a 6 6 0 1 1  12 0
                     a 6 6 0 1 1 -12 0 Z">

          </path>
          </svg>
        </main>
      </div>
    </div>
  )
}

export default Home
