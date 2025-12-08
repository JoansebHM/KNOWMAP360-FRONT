import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            {/* Results info */}
            {totalItems !== undefined && itemsPerPage !== undefined && (
                <div className="text-sm text-gray-600">
                    Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{' '}
                    {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} resultados
                </div>
            )}

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* First page */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Primera página"
                >
                    <ChevronsLeft size={18} />
                </button>

                {/* Previous page */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Página anterior"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === 'number' && onPageChange(page)}
                            disabled={page === '...'}
                            className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all ${page === currentPage
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : page === '...'
                                        ? 'cursor-default'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next page */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Página siguiente"
                >
                    <ChevronRight size={18} />
                </button>

                {/* Last page */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Última página"
                >
                    <ChevronsRight size={18} />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
