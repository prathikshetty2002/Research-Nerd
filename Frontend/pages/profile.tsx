import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = dynamic(() => import("../components/Header"));

const Profile: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <m.div
            className="md:flex"
            initial={{
                opacity: 0,
                y: -50,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 50,
            }}
        >
            <Header />
            <main>
                <button className="text-black flex items-center border border-black px-6 py-2 mx-8 my-4 rounded-full">
                    <svg
                        className="mr-2"
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.4562 27.4459C14.1791 27.4459 13.9021 27.3438 13.6833 27.125L4.83123 18.273C4.40831 17.85 4.40831 17.15 4.83123 16.7271L13.6833 7.87505C14.1062 7.45213 14.8062 7.45213 15.2291 7.87505C15.6521 8.29797 15.6521 8.99797 15.2291 9.42088L7.14998 17.5L15.2291 25.5792C15.6521 26.0021 15.6521 26.7021 15.2291 27.125C15.025 27.3438 14.7333 27.4459 14.4562 27.4459Z"
                            fill="#292D32"
                        />
                        <path
                            d="M30.3958 18.5938H5.85205C5.25413 18.5938 4.7583 18.0979 4.7583 17.5C4.7583 16.9021 5.25413 16.4062 5.85205 16.4062H30.3958C30.9937 16.4062 31.4896 16.9021 31.4896 17.5C31.4896 18.0979 30.9937 18.5938 30.3958 18.5938Z"
                            fill="#292D32"
                        />
                    </svg>
                    Go Back
                </button>
                <div className="md:flex flex-row-reverse">
                    <img
                        className="xl:w-2/5 xl:py-8 w-4/5 mx-auto md:mx-0 lg:w-1/2 md:w-2/5 md:mr-8"
                        src="profileimg.svg"
                        alt=""
                    />
                    <div className="md:w-2/4">
                        <h1 className="md:text-7xl md:pb-8 pb-4 text-4xl font-bold mx-8 mt-5">
                            Profile
                        </h1>
                        <div className="space-y-2 lg:space-y-4">
                            <h1 className="md:text-4xl font-bold pl-8">
                                {user?.displayName}
                            </h1>
                            <h1 className="md:text-xl font-bold pl-8 text-xs">
                                {user?.email}
                            </h1>
                        </div>
                    </div>
                </div>
            </main>
        </m.div>
    );
};

export default Profile;
