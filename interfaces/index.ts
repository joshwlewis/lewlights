export interface ShowStatusData {
  currentSequence: CurrentSequenceData,
  nextSequence: CurrentSequenceData,
  sequences: SequenceData[],
}

export interface CurrentSequenceData {
  currentSequence: string,
}

export interface SequenceData {
  sequenceName: string,
  sequenceDisplayName: string,
  sequenceVisible: boolean,
}

