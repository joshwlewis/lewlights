import Head from "next/head";
import Link from "next/link";

const pages: Record<string, string> = {
  "": 'home',
  "#status": "status",
  "#map": 'map',
  playlist: 'playlist',
  videos: 'videos'
};

export default function Leiout({ children }: React.PropsWithChildren<{}>) {
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
      <div className="color-gradient min-h-screen">
        <div className="dots min-h-screen">
          <div className="diagonal-wash min-h-screen">
            <div className="container mx-auto py-2 px-4 divide-y divide-gray-500">
              <header className="py-2">
                  <div className="flex flex-shrink">
                  <h3 className="text-3xl my-4 font-bold font-mono text-gradient">
                    <span>••••</span>
                    <Link href="/">lewlights</Link>
                    <span>••••</span>
                  </h3>
                  </div>
                  <div className="flex font-mono text-sm">
                    <div className="shrink text-gradient">
                      <div className="flex gap-6">
                        {Object.keys(pages).map((page) => {
                          return (
                            <Link key={page} href={`/${page}`}>
                              <a className="hover:text-sky-400">
                                •{pages[page]}•
                              </a>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
              </header>
              <div className="h-full py-10">
                <div className="">
                  <main className="py-6 rounded-lg">
                    { children }
                  </main>
                </div>
              </div>
              <footer className="text-gray-400 text-center p-6">
                <address>10480 Mt McKenzie Rd, Lakeland TN, 38002</address>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
