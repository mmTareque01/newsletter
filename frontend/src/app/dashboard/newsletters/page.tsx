"use client";
import React from "react";
import Form from "@/components/form/Form";
import { Table } from "@/components/table/index";
import { Title } from "@/components/typography";
import { NewsletterTypeFields } from "@/constants/newsletter";
// import { NewsletterType } from "@/types/newsletter";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "@/components/modals";
import { useNewsletter } from "@/hooks/callAPI.tsx/useNewsletter";
import { useNewsletterTypesStore } from "@/stores/newsletterTypes.store";
import { NewsletterType } from "@/types/newsletter";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { formatTime } from "@/libs/timeConvertion";

export default function NewsletterTypePage() {
  const { handleGetNewsletter, handleCreateNewsletterType, handleDeleteNewsletterType, handleUpdateNewsletterType } = useNewsletter();
  const { newsletterTypes } = useNewsletterTypesStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedNewsletterType, setSelectedNewsletterType] = useState<NewsletterType | null>(null);
  const [updateType, setUpdateType] = useState<boolean>(false);




  useEffect(() => {
    handleGetNewsletter();
  }, []);

  const handleSubmit = (data: NewsletterType) => {
    const { title, description } = data;
    if (updateType && selectedNewsletterType?.id) {
      handleUpdateNewsletterType(selectedNewsletterType.id, {
        description: description,
        title: title,
      } as NewsletterType)
        .then((res) => {
          console.log("res", res);
          setModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating newsletter type:", error);
        }).finally(() => {
          setUpdateType(false);
          setSelectedNewsletterType(null);
        }
      );
    }
    else {
      handleCreateNewsletterType({
        description: description,
        title: title,
      } as NewsletterType)
        .then((res) => {
          console.log("res", res);
          setModalOpen(false);
        })
        .catch((error) => {
          console.error("Error creating newsletter type:", error);
        });
    }
  };


  const handleDelete = () => {
    handleDeleteNewsletterType(selectedNewsletterType?.id as string)
      .then(() => {
        // console.log("Newsletter type deleted successfully");
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting newsletter type:", error);
      }
      );
  }

  const generateRows = () => {
    return newsletterTypes.map((item) => ({
      ...item,
      action: (
        <div className="flex justify-center gap-4">
          <MdOutlineDelete
            color="red"
            cursor={'pointer'}
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNewsletterType(item as NewsletterType);
              setDeleteModalOpen(true)

            }} />
        </div>
      ),
      createdAt: formatTime(item.createdAt as string).localeDate,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Title className="mb-4"> Newsletter Types </Title>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Add New
        </button>
      </div>

      <Table data={generateRows()} columns={columns}
        onClickRow={(data) => {
          console.log(data)
          setUpdateType(true);
          setSelectedNewsletterType(data as NewsletterType);
          setModalOpen(true);

        }}
      />

      <NewsletterTypeForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleSubmit={handleSubmit}
        data={selectedNewsletterType}
        updateType={updateType}
      />



      <ConfirmModal
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        confirm={handleDelete}
      />
    </div>
  );
}

const NewsletterTypeForm = ({ modalOpen, setModalOpen, handleSubmit, data, updateType = false }:
  {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    handleSubmit: (data: NewsletterType) => void;
    data?: NewsletterType | null;
    updateType?: boolean;
  }
) => {
  // console.log({ data, updateType })

  const fileds = NewsletterTypeFields?.map((field) => ({
    ...field,
    defaultValue: (updateType && data) ? (
      data[field.name as keyof NewsletterType]
    ) : "",
  }))

  return (
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <Title className="mb-4"> New Newsletter Types </Title>

        <button
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500"
          onClick={() => setModalOpen(false)}
        >
          <RxCross2 />
        </button>

        <Form
          fields={fileds}
          submitText={updateType ? "Update" : "Create"}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  )
}

const columns = [
  { key: "title", header: "Title", className: "" },
  { key: "description", header: "Description", className: "" },
  { key: "action", header: "Action", className: "text-center" },
  { key: "createdAt", header: "Created At", className: "text-center" },
];