import { Secret, sign } from "jsonwebtoken";

export function getRemoteFalconKey(): string {
  // const accessToken = process.env.REMOTEFALCON_ACCESS_TOKEN || 'example-remote-falcon-token';
  // const secretKey: Secret = process.env.REMOTEFALCON_SECRET_KEY || 'example-remote-falcon-show-secret';
  const secretKey: Secret = process.env.REMOTEFALCON_VIEWER_SIGN_KEY || 'example-remote-falcon-viewer-secret';
  return sign({ iss: "remotefalcon", showSubdomain: "lewlights", expiresIn: 86400 }, secretKey);
}

export async function queryRemoteFalcon(jwt: string): Promise<Show> {
    let res = await fetch(
        'https://remotefalcon.com/remote-falcon-viewer/graphql',{
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({ variables: {}, query }),
        });
    switch (res.status) {
        case 200:
            let rf_data = await res.json() as RFData;
            return rf_data.data.getShow;
        default:
            let body = await res.text()
            throw `Error retrieving show data: ${ body }`;
    }
}

export interface Sequence {
    name: string,
    displayName: string,
    artist: string,
    imageUrl: string,
    visible: boolean,
}

export interface Show {
    showSubdomain: string,
    playingNow: string,
    playingNext: string,
    playingNextFromSchedule: string,
    sequences: Sequence[],
}

export interface GetShow {
    getShow: Show
}
export interface RFData {
    data: GetShow
}

const query = `{
  getShow {
    showSubdomain
    playingNow
    playingNext
    playingNextFromSchedule
    showName
    preferences {
      viewerControlEnabled
      viewerControlMode
      resetVotes
      jukeboxDepth
      locationCheckMethod
      showLatitude
      showLongitude
      allowedRadius
      checkIfVoted
      checkIfRequested
      psaEnabled
      psaFrequency
      jukeboxRequestLimit
      locationCode
      hideSequenceCount
      makeItSnow
      managePsa
      sequencesPlayed
      pageTitle
      pageIconUrl
      selfHostedRedirectUrl
    }
    sequences {
      name
      key
      displayName
      duration
      visible
      index
      order
      imageUrl
      active
      visibilityCount
      type
      group
      category
      artist
    }
    sequenceGroups {
      name
      visibilityCount
    }
    pages {
      name
      active
      html
    }
    requests {
      sequence {
        name
        displayName
      }
      position
      ownerRequested
    }
    votes {
      sequence {
        name
        displayName
      }
      sequenceGroup {
        name
      }
      votes
      lastVoteTime
      ownerVoted
    }
    activeViewers {
      ipAddress
      visitDateTime
    }
  }
}`;


