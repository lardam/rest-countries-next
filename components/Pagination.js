export default function Pagination ({ arr, setPage }) {
    const totalPages = Math.ceil(arr.length / 20);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return(
        <div id="pagination-container" className="w-full mt-10 flex">
            <ul className="w-full min-h-10 px-12 py-4 bg-gray-200 flex flex-wrap gap-5 items-center justify-center">
                {pages.length === 0 ? null : pages.map((page, index) => (
                    <li className="text-xl cursor-pointer hover:font-semibold hover:text-amber-600" key={index} onClick={() => setPage(page - 1)}>{page}</li>
                ))}
            </ul>
        </div>
    )
}