"use client";
import { BlockIcon, DeleteIcon, UnsubscribeIcon } from "@/components/buttons/Icon.button";
import { Table } from "@/components/table/index";
import { Title } from "@/components/typography";
import { useSubscribers } from "@/hooks/callAPI.tsx/useSubscriber";
import { formatTime } from "@/libs/timeConvertion";
import { useSubscribersStore } from "@/stores/subscribers.store";
import { useEffect } from "react";

export default function SubscribersPage() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  const { handleGetSubscribers, handleUpdateSubscriber, handleDeleteSubscriber } = useSubscribers()
  const { subscribers, subscribersPagination } = useSubscribersStore();


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
