import { Dispatch, SetStateAction } from "react";

const PaperCard: React.FC<{
    id: number,
    title: string,
    authors: string,
    categories: string,
    date: string,
    setOnClick: Dispatch<SetStateAction<number | boolean>>,
    setModalActive: Dispatch<SetStateAction<boolean>>
}> = ({id, title, authors, categories, date, setOnClick, setModalActive}) => {
    return (
        <article onClick={() => {setOnClick(id); setModalActive(true)}} id={id?.toString()} className="font-semibold rounded-xl bg-primary px-4 py-6 hover:bg-secondary cursor-pointer transition-all active:scale-95
        xl:w-4/5 ">
            <h1 className=" text-lg">
                {title}
            </h1>
            <div className="text-sm mt-4 space-y-2 md:flex md:space-y-0 md:justify-between">
                <h2>
                    {authors}
                </h2>
                <h3>{categories} / {date}</h3>
            </div>
        </article>
    );
};

export default PaperCard;
