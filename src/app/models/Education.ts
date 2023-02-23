export interface IEduation { // the education 
    // eduId: number, // to track each education field id 
    eduTitle: string,
    eduPlace: string,
    eduLocation: string,
    eduBefore: string,
    eduAfter: string,
    eduDesc?: string, // optional paramter (contain the bech project )
    eduGpa?: string, // optional paramter (the cum gpa)
    showFields:boolean,
}