import { useHistory } from "react-router";
import useTimeout from "./useTimeout";

export default function useRedirect(link : string, timeout : number, flag : boolean = false) {
    let history = useHistory();
    useTimeout(() => {
        if (flag) {
            history.push(link);
        }
    }, timeout);
}