import React from 'react'

const DeleteAlertContent = ({ content, onDelete, setOpenDeleteAlert }) => {
    return (
        <div className="p-6">
            <p className="text-sm text-gray-700">{content}</p>

            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={() => setOpenDeleteAlert({ open: false, data: null })}
                    className="px-5 py-2 rounded-lg border cursor-pointer border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black transition-all duration-200 shadow-sm"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={onDelete}
                    className="px-5 py-2 rounded-lg bg-red-600 cursor-pointer text-white hover:bg-red-700 transition-all duration-200 shadow-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};


export default DeleteAlertContent