import Head from "next/head";
import Link from "next/link";

const pages: Record<string, string> = {
  "": 'Home',
  map: 'Map',
  playlist: 'Playlist',
  videos: 'Videos'
};

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return(
    <>
      <Head>
        <title>lewlights - Lakeland TN Holiday Light Show</title>
        <meta
          name="description"
          content="LewLights is an animated, synchronized Holiday Light Show in Lakeland, TN."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black min-h-screen">
        <header className="bg-black">
          <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mx-auto px-12 py-3">
            <div className="sm:text-center">
              <h3 className="text-2xl font-bold text-gradient">
                <Link href="/">•••lewlights•••</Link>
              </h3>
            </div>
            <div className="sm:ml-auto flex justify-between gap-6 text-gray-400">
              {Object.keys(pages).map((page) => {
                return (
                  <Link key={page} href={`/${page}`}>
                    <a className="hover:text-sky-400">{pages[page]}</a>
                  </Link>
                )
              })}
            </div>
          </div>
        </header>
        <div className="color-gradient">
          <div className="dots bg-blend-multiply">
            <div className="h-fade h-full py-14">
              <div className="container mx-auto">
                <main className="mx-6 p-6 rounded-lg edge-fade">
                  { children }
                </main>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-black text-gray-400 text-center p-6">
          <address>10480 Mt McKenzie Rd, Lakeland TN, 38002</address>
        </footer>
      </div>
    </>
  )
}
