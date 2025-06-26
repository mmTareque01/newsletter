"use client";
import { BlockIcon, DeleteIcon, UnsubscribeIcon } from "@/components/buttons/Icon.button";
import { Table } from "@/components/table/index";
import { Title } from "@/components/typography";
import { useSubscribers } from "@/hooks/callAPI.tsx/useSubscriber";
import { formatTime } from "@/libs/timeConvertion";
import { useAppStore } from "@/stores/app.store";
import { useSubscribersStore } from "@/stores/subscribers.store";
import { useEffect } from "react";

export default function SubscribersPage() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  const { handleGetSubscribers, handleUpdateSubscriber, handleDeleteSubscriber } = useSubscribers()
  const { subscribers, subscribersPagination } = useSubscribersStore();
  const { setHeader } = useAppStore();


  // console.log({subscribers})
  // Example data

  interface RowData {
    // email: string;
    // name: string;
    status: string; // or whatever your possible status values are
    // Add other row properties here if needed
  }
  const columns = [
    { key: "email", header: "Email", className: "text-center" },
    { key: "name", header: "Name", className: "text-center" },

    {
      key: "status",
      header: "Status",
      className: "text-center",
      render: (row: RowData) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status == "ACTIVE"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "action", header: "Action", className: "text-center" },
    { key: "createdAt", header: "Joined At", className: "text-center" },

  ];

  useEffect(() => {
    handleGetSubscribers()
    setHeader(<div className="hidden lg:block">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            className="fill-gray-500 dark:fill-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
              fill=""
            />
          </svg>
        </span>
        <input
          // ref={inputRef}
          type="text"
          placeholder="Search by email..."
          className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
        />
        <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs text-gray-500 dark:border-gray-800 dark:bg-white/5 dark:text-gray-400">
          <span>⌘</span>
          <span>K</span>
        </button>
      </div>
    </div>)
  }, [])




  const generateRows = () => {
    return subscribers.map((subscriber) => ({
      ...subscriber,
      createdAt: formatTime(subscriber.createdAt).localeDate,
      action: (
        <div className="flex justify-center space-x-2">
          <DeleteIcon onClick={() => { handleDeleteSubscriber(subscriber.id) }} />
          <BlockIcon onClick={() => { handleUpdateSubscriber(subscriber.id, { status: 'blocked' }) }} />
          <UnsubscribeIcon onClick={() => { handleUpdateSubscriber(subscriber.id, { status: 'unsubscribe' }) }} />

        </div>
      )
    }));
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      {/* <h1 className="text-2xl font-bold text-black mb-6">Subscribers</h1> */}
      <Title className="mb-4">Subscribers List</Title>

      <Table data={generateRows()} columns={columns} paginate={subscribersPagination} setPageNo={(pageNo) => {
        handleGetSubscribers(pageNo)
      }} />

      {/* {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )} */}
    </div>
  );
}
