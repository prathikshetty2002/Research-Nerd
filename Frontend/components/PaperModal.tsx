import { Dispatch, SetStateAction } from "react";
import {m} from 'framer-motion'

const PaperCard: React.FC<{
    id?: number | undefined;
    title?: string | undefined;
    authors?: string | undefined;
    categories?: string | undefined;
    date?: string | undefined;
    abstract?: string | undefined;
    setModalActive: Dispatch<SetStateAction<boolean>>

}> = ({ id, title, authors, categories, date, abstract, setModalActive }) => {
    return (
        <m.div 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0
        }}
        transition={{
            duration: 0.2
        }}
        className="relative z-20" >
            <div onClick={() => setModalActive(false)} className="fixed z-20 top-0 left-0 bg-primary bg-opacity-[45%] w-[100vw] h-[100vh]"></div>
            <article
                id={id?.toString()}
                className="fixed z-30 w-4/5 top-[10%] font-semibold rounded-xl px-4 py-6 md:px-8 md:py-12 bg-secondary
                md:left-[10%] "
            >
                <h1 className="text-2xl xl:text-6xl">{title}</h1>
                <div className="mt-4 lg:mt-8 space-y-4 lg:space-y-0 lg:flex justify-between items-center" >
                    <span className="text-sm xl:text-xl" >
                        <h2>{authors}</h2>
                        <h3>
                            {categories} / {date}
                        </h3>
                    </span>
                    <a href={`https://arxiv.org/pdf/${id}.pdf`} className="flex items-center font-semibold text-sm bg-primary px-4 py-2 rounded-lg" >
                        <svg
                            width="25"
                            height="25"
                            className="mr-4"
                            viewBox="0 0 41 41"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M23.5 18.75C23.1833 18.75 22.8667 18.6333 22.6167 18.3833C22.1333 17.9 22.1333 17.1 22.6167 16.6167L36.2833 2.94999C36.7666 2.46666 37.5666 2.46666 38.05 2.94999C38.5333 3.43333 38.5333 4.23333 38.05 4.71666L24.3833 18.3833C24.15 18.6167 23.8333 18.75 23.5 18.75Z"
                                fill="#292D32"
                            />
                            <path
                                d="M30.2167 20.0833H22.1667C21.4834 20.0833 20.9167 19.5167 20.9167 18.8333V10.7833C20.9167 10.1 21.4834 9.53334 22.1667 9.53334C22.8501 9.53334 23.4167 10.1 23.4167 10.7833V17.5833H30.2167C30.9001 17.5833 31.4667 18.15 31.4667 18.8333C31.4667 19.5167 30.9001 20.0833 30.2167 20.0833Z"
                                fill="#292D32"
                            />
                            <path
                                d="M25.4999 38.4167H15.4999C6.44992 38.4167 2.58325 34.55 2.58325 25.5V15.5C2.58325 6.45 6.44992 2.58333 15.4999 2.58333H18.8333C19.5166 2.58333 20.0833 3.14999 20.0833 3.83333C20.0833 4.51666 19.5166 5.08333 18.8333 5.08333H15.4999C7.81659 5.08333 5.08325 7.81666 5.08325 15.5V25.5C5.08325 33.1833 7.81659 35.9167 15.4999 35.9167H25.4999C33.1833 35.9167 35.9166 33.1833 35.9166 25.5V22.1667C35.9166 21.4833 36.4833 20.9167 37.1666 20.9167C37.8499 20.9167 38.4166 21.4833 38.4166 22.1667V25.5C38.4166 34.55 34.5499 38.4167 25.4999 38.4167Z"
                                fill="#292D32"
                            />
                        </svg>
                        Download
                    </a>
                </div>
                <p className="font-normal leading-7 mt-8" >{abstract}</p>
            </article>
        </m.div>
    );
};

export default PaperCard;
