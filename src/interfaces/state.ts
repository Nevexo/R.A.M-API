// R.A.M API
// Interface: state
// This interface stores the template for information regarding R.A.M's tasks.

export interface State {
    task: string,
    mode: string,
    vehicle: string,
    path: {"city": string, "company": string},
    control_mode: string
}