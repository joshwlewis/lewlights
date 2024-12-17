import Head from "next/head";
import Link from "next/link";

const pages: Record<string, string> = {
  "#home": 'home',
  "#jukebox": "jukebox",
  "#donate": 'donate',
  "#map": 'map',
  "#videos": 'videos'
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
      <div className="color-gradient min-h-screen">
        <div className="dots min-h-screen">
          <div className="diagonal-wash min-h-screen">
            <div className="container mx-auto px-2 sm:px-4 md:px-16 lg:px-64 xl:px-[24rem]">
              <header className="py-2">
                  <div className="flex flex-shrink justify-center">
                    <h3 className="text-3xl my-3 font-bold font-mono text-gradient">
                      <span>••••</span>
                      <Link href="/">lewlights</Link>
                      <span>••••</span>
                    </h3>
                  </div>
                  <div className="flex font-mono justify-center text-sm">
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
              <div className="h-full">
                <main>
                  { children }
                </main>
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
