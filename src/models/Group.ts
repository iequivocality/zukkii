import Member from "./Member";

export default interface Group {
    id: number,
    name: string,
    color: string,
    members : Array<Member>
}