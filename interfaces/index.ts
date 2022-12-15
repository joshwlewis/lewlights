export interface ShowStatusData {
  currentSequence: CurrentSequenceData,
  nextSequence: CurrentSequenceData,
  sequences: SequenceData[],
}

export interface CurrentSequenceData {
  currentSequence: string,
}

export interface SequenceData {
  sequenceName: String,
  sequenceDisplayName: String,
  sequenceVisible: boolean,
}

