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
import { DeleteIcon } from "@/components/buttons/Icon.button";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { formatTime } from "@/libs/timeConvertion";
import { useAppStore } from "@/stores/app.store";

export default function NewsletterTypePage() {
  const { handleGetNewsletter, handleCreateNewsletterType, handleDeleteNewsletterType, handleUpdateNewsletterType } = useNewsletter();
  const { newsletterTypes, newsletterPagination, setNewsletterPagination } = useNewsletterTypesStore();
  const { setHeader } = useAppStore();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedNewsletterType, setSelectedNewsletterType] = useState<NewsletterType | null>(null);
  const [updateType, setUpdateType] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);




  // console.log({newsletterPagination})

  useEffect(() => {
    handleGetNewsletter();
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
          placeholder="Search by title or description..."
          className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
        />
        <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs text-gray-500 dark:border-gray-800 dark:bg-white/5 dark:text-gray-400">
          <span>⌘</span>
          <span>K</span>
        </button>
      </div>
    </div>)
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


          <DeleteIcon onClick={() => {
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
          setUpdateType(true);
          setSelectedNewsletterType(data as NewsletterType);
          setModalOpen(true);
        }}
        paginate={newsletterPagination}
        setPageNo={(pageNo) => {
          // setNewsletterPagination({
          //   ...newsletterPagination,
          //   pageNo: pageNo,
          // });
          handleGetNewsletter(pageNo, pageSize);
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