export interface IFrameState {
    revealed: boolean;
    defeated: boolean;
};

export interface ICompletionState {
    [day: number]: IFrameState;
};

export const COMPLETION_STATE_LS_KEY = "completionState";
