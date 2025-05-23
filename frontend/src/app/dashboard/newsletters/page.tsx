"use client";
import Form from "@/components/form/Form";
import { Table } from "@/components/table/index";
import { Title } from "@/components/typography";
import { NewsletterTypeFields } from "@/constants/newsletter";
import { NewsletterType } from "@/types/newsletter";
import { useState, ChangeEvent, FormEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from '@/components/Modal'

export default function NewsletterTypePage() {
  const [newsletterTypes, setNewsletterTypes] = useState<NewsletterType[]>([]);
  const [form, setForm] = useState<NewsletterType>({
    title: "",
    description: "",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    if (form.title && form.description) {
      setNewsletterTypes([...newsletterTypes, form]);
      setForm({ title: "", description: "" });
      setModalOpen(false);
    }
    console.log(form);
  };

  const newsletter = [
    {
      id: 1,
      title: "John Doe",
      //   status: "active",
      description: "john.doe@example.com",
      createdAt: "2023-10-15",
    },
    {
      id: 2,
      title: "Jane Smith",
      //   status: "active",
      description: "jane.smith@exam˝ple.com",
      createdAt: "2023-11-02",
    },
    {
      id: 3,
      title: "Robert Johnson",
      //   status: "inactive",
      description: "robert.j@example.com",
      createdAt: "2023-09-20",
    },
    {
      id: 4,
      title: "Emily Davis",
      //   status: "active",
      description: "emily.davis@example.com",
      createdAt: "2023-12-05",
    },
    {
      id: 5,
      title: "Michael Wilson",
      //   status: "pending",
      description: "mike.wilson@example.com",
      createdAt: "2024-01-10",
    },
    {
      id: 6,
      title: "Sarah Brown",
      //   status: "active",
      description: "sarah.b@example.org",
      createdAt: "2023-08-17",
    },
    {
      id: 7,
      title: "David Taylor",
      //   status: "blocked",
      description: "david.t@example.net",
      createdAt: "2023-07-22",
    },
    {
      id: 8,
      title: "Jessica Martinez",
      //   status: "active",
      description: "jessica.m@example.com",
      createdAt: "2024-02-01",
    },
    {
      id: 9,
      title: "Thomas Anderson",
      //   status: "inactive",
      description: "thomas.a@example.io",
      createdAt: "2023-06-30",
    },
    {
      id: 10,
      title: "Lisa Jackson",
      //   status: "active",
      description: "lisa.j@example.com",
      createdAt: "2023-12-18",
    },
    {
      id: 11,
      title: "Christopher Lee",
      //   status: "pending",
      description: "chris.lee@example.org",
      createdAt: "2024-01-25",
    },
    {
      id: 12,
      title: "Amanda Harris",
      //   status: "active",
      description: "amanda.h@example.com",
      createdAt: "2023-11-30",
    },
    {
      id: 13,
      title: "Daniel Clark",
      //   status: "blocked",
      description: "daniel.c@example.net",
      createdAt: "2023-10-05",
    },
    {
      id: 14,
      title: "Michelle Lewis",
      //   status: "active",
      description: "michelle.l@example.com",
      createdAt: "2024-01-15",
    },
    {
      id: 15,
      title: "Kevin Walker",
      //   status: "inactive",
      description: "kevin.w@example.org",
      createdAt: "2023-09-12",
    },
  ];

  const columns = [
    { key: "title", header: "Title", className: "" },
    { key: "description", header: "Description", className: "" },
    { key: "action", header: "Action", className: "text-center" },
    { key: "createdAt", header: "Created At", className: "text-center" },
    // {
    //   key: "status",
    //   header: "Status",
    //   className: "text-center",
    //   render: (row: RowData) => (
    //     <span
    //       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
    //         row.status === "active"
    //           ? "bg-green-100 text-green-800"
    //           : "bg-red-100 text-red-800"
    //       }`}
    //     >
    //       {row.status}
    //     </span>
    //   ),
    // },
  ];
  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Title className="mb-4">Newsletter Types</Title>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Add New
        </button>
      </div>

      <Table data={newsletter} columns={columns} />

      {/* {modalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex items-center justify-center z-50">
    
        </div>
      )} */}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
          <Title className="mb-4">New Newsletter Types</Title>

          <button
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500"
            onClick={() => setModalOpen(false)}
          >
            <RxCross2 />
          </button>

          <Form
            fields={NewsletterTypeFields}
            submitText="Create"
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
}
