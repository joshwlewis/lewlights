import Head from "next/head";

const pages: Record<string, string> = {
  playlist: 'Playlist',
  map: 'Map',
  videos: 'Videos',
  awards: 'Awards',
  donations: 'Donations',
};

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return(
    <>
      <Head>
        <title>LewLights - Lakeland TN Holiday Light Show</title>
        <meta
          name="description"
          content="LewLights is an animated, synchronized Holiday Light Show in Lakeland, TN."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="bg-gray-900 min-h-screen">
          <header className="bg-gray-900 ">
            <div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mx-auto px-12 py-3">
              <div className="sm:text-center">
                <h3 className="text-2xl font-bold text-gradient">
                  LewLights
                </h3>
              </div>
              <div className="grow flex justify-between gap-2 text-gray-400">
                {Object.keys(pages).map((page) => {
                  return (
                    <>
                      <a href={page}>{pages[page]}</a>
                    </>
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
        <footer className="bg-gray-900 text-gray-400 text-center p-6">
          <address>10480 Mt McKenzie Rd, Lakeland TN, 38002</address>
        </footer>
      </div>
    </>
  )
}
