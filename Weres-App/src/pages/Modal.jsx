import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import UCard from './UCard';
import { Close, Delete } from '@mui/icons-material';

const Modal = ({ openDeleteDialog, handleOpenDeleteDialog, selectedUser, onDelete }) => {
    const handleDelete = () => {
        if (selectedUser) {
            onDelete(selectedUser.id);
            handleOpenDeleteDialog(false);
        }
    };

    return (
        <Dialog open={openDeleteDialog} onClose={() => handleOpenDeleteDialog(false)}>
            <DialogTitle>{openDeleteDialog ? '¿Desea eliminar el usuario?' : 'Detalles del Usuario'}</DialogTitle>
            <DialogContent>
                {selectedUser && (
                    <UCard
                        user={selectedUser}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="error" variant="contained" startIcon={<Delete />}>
                    Eliminar
                </Button>
                <Button onClick={() => handleOpenDeleteDialog(false)} color="primary" variant="contained" startIcon={<Close />}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;