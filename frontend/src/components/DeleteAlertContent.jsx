import React from 'react'
import { Button } from './ui/button'

const DeleteAlertContent = ({ content, onDelete, setOpenDeleteAlert }) => {
    return (
        <div className="">
            <div className="flex flex-col gap-2 mb-6">
                <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
            </div>

            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDeleteAlert({ open: false, data: null })}
                    className="text-muted-foreground hover:text-white"
                >
                    Cancel
                </Button>

                <Button
                    type="button"
                    variant="destructive"
                    onClick={onDelete}
                    className="bg-red-600 hover:bg-red-700 text-white border-0 font-bold"
                >
                    Delete Forever
                </Button>
            </div>
        </div>
    );
};

export default DeleteAlertContent