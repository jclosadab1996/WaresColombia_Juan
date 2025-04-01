import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Tooltip } from '@mui/material';
import styles from './List.module.css';
import { Delete as DeleteIcon } from '@mui/icons-material';

const UTable = ({ users, handleDelete }) => {
    return (
        <TableContainer component={Paper} className={styles.userTableList}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Type Document</TableCell>
                        <TableCell>Document Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name_type_document_id}</TableCell>
                            <TableCell>{user.document_number}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.name_user_type}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete" arrow>
                                    <Button
                                        onClick={() => handleDelete(user.id)}
                                        variant="outlined"
                                        color="error"
                                        sx={{ minWidth: 'auto', padding: '8px' }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UTable;