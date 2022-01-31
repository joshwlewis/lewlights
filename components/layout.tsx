import Head from "next/head";

const pages: Record<string, string> = {
  playlist: 'Playlist',
  map: 'Map',
  videos: 'Videos',
  awards: 'Awards',
  donations: 'Donations',
};

export default function Layout({children}) {
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
      <div className="h-screen gradient">
        <div className="h-screen dots bg-blend-multiply">
          <header className="bg-gray-900 backlit">
            <div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mx-auto p-4 mb-14">
              <div className="sm:text-center">
                <h3 className="text-2xl font-bold text-gradient">
                  LewLights
                </h3>
              </div>
              <div className="grow flex justify-between gap-2 text-gray-300">
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
          <main className="container mx-auto p-6 bg-gray-900 backlit rounded-xl">
            { children }
          </main>
        </div>
      </div>
    </>
  )
}
