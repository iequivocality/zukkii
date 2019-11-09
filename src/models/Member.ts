import { Age } from "./Age";

export interface MemberGroup {
    [key : string] : boolean
}

export default interface Member {
    id : number,
    group : MemberGroup,
    name : string,
    kana : string,
    birthdate : string,
    prefecture : string,
    height : number,
    bloodType : string,
    generation : number,
    ageByYears : number,
    ageByDays : number
}