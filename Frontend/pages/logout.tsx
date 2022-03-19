import { signOut } from "firebase/auth";
import Router from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase";

const Logout: React.FC = () => {
    useEffect(() => {
        signOut(auth);
        Router.push("/");
    }, []);

    return <></>;
};

export default Logout;
