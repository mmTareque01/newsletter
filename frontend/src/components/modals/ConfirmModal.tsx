import React from 'react'
import Modal from '.'
import { Title } from '../typography';

export default function ConfirmModal({ modalOpen, setModalOpen, confirm }: {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    confirm: () => void;
}) {
    return (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="flex flex-col items-center justify-center gap-4">
                <Title>Are you sure?</Title>
                <div className="flex gap-4">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={confirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={() => setModalOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}
