import { useState, useEffect } from "react";
import { AngleRight } from "./icons";

interface Data {
  companiesData: any;
  optionsData: {
    pageSize: number;
    recordsTotal: number;
    availablePageSizes: string[];
  };
  visibleData: any[];
  handlePagination: (paginationData: PaginationData) => void;
}

interface PaginationData {
  page: number;
  pageSize: number;
}

export default function BottomPagination({ optionsData, companiesData, visibleData, handlePagination }: Data) {
  const { pageSize } = optionsData;
  const { recordsTotal } = companiesData;
  const [pages, setPages] = useState<number[]>([]);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [viewPage, setViewPage] = useState<number>(1)

  useEffect(() => {
    const totalPages = Math.ceil(recordsTotal / currentPageSize);
    console.log(`🔥 ~ useEffect ~ totalPages:`, totalPages)
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
    totalPages > 0 && setViewPage(1);
  }, [recordsTotal, currentPageSize]);

  const handlePagePerView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPageSize(parseInt(e.target.value));
    handlePagination({ page: 1, pageSize: parseInt(e.target.value) });
  };

  const handlePageClick = (operation: string) => {
    let page;
    if (operation == 'increase') {
      page = viewPage + 1;
    } else {
      page = viewPage - 1;
    }
    if (pages.includes(page)) setViewPage(page)
  }

  return (
    <div className="my-8 flex justify-start items-center">
      <div className="flex-1">
        Rows per page:
        <select
          defaultValue={currentPageSize}
          className="p-1 bg-[#eaeaea] rounded-md ml-1 cursor-pointer"
          onChange={handlePagePerView}
        >
          {optionsData.availablePageSizes.length > 0 &&
            optionsData.availablePageSizes.map((psize: string) => (
              <option key={psize} value={psize}>
                {psize}
              </option>
            ))}
        </select>
      </div>

      <div className="flex-1">
        {visibleData.length < 15 && visibleData.length > 0 ? (
          <span>
            1 - {visibleData.length} of {visibleData.length} items
          </span>
        ) : (
          <span>
            {(viewPage - 1) * currentPageSize + 1} - {Math.min(viewPage * currentPageSize, recordsTotal)} of {recordsTotal} items
          </span>
        )}
      </div>

      <div className="flex-1 flex space-x-2 justify-start items-center gap-x-2">
        <button onClick={() => handlePageClick('decrease')}><AngleRight className="w-[18px] h-[18px] rotate-180" /></button>
        {visibleData.length < 15 && visibleData.length > 0 ? <div
          className={`cursor-pointer px-2 py-1 rounded-md bg-blue-500 text-white`}
        >
          1
        </div> :
          pages.map((page) => (
            <div
              key={page} className={`cursor-pointer px-2 py-1 rounded-md ${page == viewPage ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setViewPage(page)}
            >
              {page}
            </div>
          ))}

        <button onClick={() => handlePageClick('increase')}><AngleRight className="w-[18px] h-[18px]" /></button>
      </div>
    </div>
  );
}
