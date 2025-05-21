"use client";
import { Table } from "@/components/table/index";
import { Title } from "@/components/typography";
// import { useState } from "react";

export default function SubscribersPage() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;

  // Example data
  const subscribers = [
    {
      id: 1,
      name: "John Doe",
      status: "active",
      email: "john.doe@example.com",
      subscribedAt: "2023-10-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "active",
      email: "jane.smith@example.com",
      subscribedAt: "2023-11-02",
    },
    {
      id: 3,
      name: "Robert Johnson",
      status: "inactive",
      email: "robert.j@example.com",
      subscribedAt: "2023-09-20",
    },
    {
      id: 4,
      name: "Emily Davis",
      status: "active",
      email: "emily.davis@example.com",
      subscribedAt: "2023-12-05",
    },
    {
      id: 5,
      name: "Michael Wilson",
      status: "pending",
      email: "mike.wilson@example.com",
      subscribedAt: "2024-01-10",
    },
    {
      id: 6,
      name: "Sarah Brown",
      status: "active",
      email: "sarah.b@example.org",
      subscribedAt: "2023-08-17",
    },
    {
      id: 7,
      name: "David Taylor",
      status: "blocked",
      email: "david.t@example.net",
      subscribedAt: "2023-07-22",
    },
    {
      id: 8,
      name: "Jessica Martinez",
      status: "active",
      email: "jessica.m@example.com",
      subscribedAt: "2024-02-01",
    },
    {
      id: 9,
      name: "Thomas Anderson",
      status: "inactive",
      email: "thomas.a@example.io",
      subscribedAt: "2023-06-30",
    },
    {
      id: 10,
      name: "Lisa Jackson",
      status: "active",
      email: "lisa.j@example.com",
      subscribedAt: "2023-12-18",
    },
    {
      id: 11,
      name: "Christopher Lee",
      status: "pending",
      email: "chris.lee@example.org",
      subscribedAt: "2024-01-25",
    },
    {
      id: 12,
      name: "Amanda Harris",
      status: "active",
      email: "amanda.h@example.com",
      subscribedAt: "2023-11-30",
    },
    {
      id: 13,
      name: "Daniel Clark",
      status: "blocked",
      email: "daniel.c@example.net",
      subscribedAt: "2023-10-05",
    },
    {
      id: 14,
      name: "Michelle Lewis",
      status: "active",
      email: "michelle.l@example.com",
      subscribedAt: "2024-01-15",
    },
    {
      id: 15,
      name: "Kevin Walker",
      status: "inactive",
      email: "kevin.w@example.org",
      subscribedAt: "2023-09-12",
    },
  ];
  interface RowData {
    // email: string;
    // name: string;
    status: string; // or whatever your possible status values are
    // Add other row properties here if needed
  }
  const columns = [
    { key: "email", header: "Email", className: "text-center" },
    { key: "name", header: "Name", className: "text-center" },
    { key: "subscribedAt", header: "Joined At", className: "text-center" },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      render: (row: RowData) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      {/* <h1 className="text-2xl font-bold text-black mb-6">Subscribers</h1> */}
      <Title className="mb-4">Subscribers List</Title>

      <Table data={subscribers} columns={columns} />

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
