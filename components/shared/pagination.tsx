/* This example requires Tailwind CSS v2.0+ */
import { NextPage } from 'next'

type PaginationProps = {
    currentPage: number,
    totalCount: number,
    onPrevClicked: () => void;
    onNextClicked: () => void;
}

export const Pagination: NextPage<PaginationProps> = ({ currentPage, totalCount, onPrevClicked, onNextClicked }) => {
    return (
        <div className="px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
            <div className="flex-1 flex items-center justify-between">
                {/*<div>
                    <p className="text-sm text-opacity-60">
                        Showing <span className="font-medium">{(currentPage * 10) + 1}</span> to <span className="font-medium">{totalCount < (currentPage + 1) * 10 ? totalCount : (currentPage + 1) * 10}</span> of{' '}
                        <span className="font-medium">{totalCount}</span> results
                    </p>
    </div>*/}
                <div className="flex-1 flex justify-end">
                    {currentPage > 0 && <a
                        href="#"
                        className="neon-box-blue relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-50"
                        onClick={onPrevClicked}
                    >
                        Prev
                    </a>}
                    {totalCount > (currentPage + 1) * 10 && <a
                        href="#"
                        className="neon-box-blue ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-50"
                        onClick={onNextClicked}
                    >
                        Next
                    </a>}
                </div>
            </div>
        </div>
    )
}