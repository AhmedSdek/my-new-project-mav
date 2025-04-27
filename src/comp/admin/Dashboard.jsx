import { Outlet } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Container, Stack } from "@mui/material";
import NavBtn from "./NavBtn";
import Err from "../Err/Err";


function Dashboard() {
    const [user] = useAuthState(auth);
    const adminData = ['arB4bTAtCiaMCBprrnOTRz6YbmT2', 'YZia9oRhhzdNFG1JOXteZOpcdw83']
    if (user) {
        if (adminData.includes(user.uid)) {
            return (
                <>
                    <Stack>
                        <NavBtn />
                        <Container>
                            <Outlet />
                        </Container>
                    </Stack >
                </>
            )
        } else {
            return (
                <Err />
            )
        }
    } else {
        return (
            <Err />
        )
    }
}

export default Dashboard