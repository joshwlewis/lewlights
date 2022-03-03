import type { NextPage } from "next";

const vidUrls = [
  "https://www.youtube-nocookie.com/embed/oQeiWbGsHxk",
  "https://www.youtube-nocookie.com/embed/t_MNg7SGft",
  "https://www.youtube-nocookie.com/embed/Tzwfy1Etkt8"
]
const entries = [
  { name: "Jingle Bells", by: "Landon Lewis", length: "0:12" },
  { name: "Sleigh Ride", by: "101 Strings", length: "3:00" },
  { name: "Animation Break", length: "0:10"},
  { name: "Happy", by: "Pharell Williams", length: "3:53" },
  { name: "It's the Holidays my Dudes", by: "Ethan Lewis", length: "0:14" },
  { name: "Carol of the Bells", by: "David Foster", length: "2:34" },
  { name: "Animation Break", length: "0:10"},
  { name: "Blinding Lights", by: "The Weeknd", length: "3:21" },
  { name: "Animation Break", length: "0:10"},
  { name: "Let it Snoki Doki", by: "Doctor Octoroc", length: "1:06" },
  { name: "Animation Break", length: "0:10"},
]

const Playlist: NextPage = () => {
  return (
    <>
      { entries.map((entry) => {
        return (
          <div key={entry.name}>
            <h2>{ entry.name }</h2>
            <h3>{ entry.by }</h3>
            <h4>{ entry.length}</h4>
          </div>
        )
      })}
    </>
  );
}

export default Playlist;
