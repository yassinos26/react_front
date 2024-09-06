import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Repertoire = () => {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedClientIndex, setSelectedClientIndex] = useState(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [clientName, setClientName] = useState('');
  const [editClientName, setEditClientName] = useState('');

  // Load clients and their files from localStorage when the component mounts
  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(savedClients);
  }, []);

  // Save clients and their files to localStorage whenever the clients state changes
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const handleOpen = (clientIndex, fileIndex) => {
    setSelectedClientIndex(clientIndex);
    setSelectedFileIndex(fileIndex);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClientIndex(null);
    setSelectedFileIndex(null);
    setNewFile(null);
  };

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (newFile && selectedClientIndex !== null && selectedFileIndex !== null) {
      const updatedClients = [...clients];
      updatedClients[selectedClientIndex].files[selectedFileIndex] = newFile;
      setClients(updatedClients);
    }
    handleClose();
  };

  const handleDelete = (clientIndex, fileIndex) => {
    const updatedClients = [...clients];
    updatedClients[clientIndex].files = updatedClients[clientIndex].files.filter((_, i) => i !== fileIndex);
    setClients(updatedClients);
  };

  const handleAddClient = () => {
    if (clientName) {
      setClients([...clients, { name: clientName, files: [] }]);
      setClientName('');
    }
  };

  const handleAddFile = async (clientIndex, e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedClients = [...clients];
      updatedClients[clientIndex].files.push(newFile);
      setClients(updatedClients);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', newFile);

      try {
        const response = await fetch('http://127.0.0.1:8000/process-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File processed:', data);
        } else {
          console.error('Error processing file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEditClientName = (clientIndex) => {
    const updatedClients = [...clients];
    updatedClients[clientIndex].name = editClientName;
    setClients(updatedClients);
    setEditClientName('');
  };

  const handleDeleteClient = (clientIndex) => {
    const updatedClients = clients.filter((_, i) => i !== clientIndex);
    setClients(updatedClients);
  };

  return (
    <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        label="Client Name"
        variant="outlined"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        sx={{ mb: 2, width: '100%', maxWidth: 600 }}
      />
      <Button
        variant="contained"
        onClick={handleAddClient}
        sx={{ mb: 2 }}
      >
        Add Client
      </Button>
      {clients.map((client, clientIndex) => (
        <Box key={clientIndex} sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{client.name}</Typography>
            <IconButton onClick={() => setSelectedClientIndex(clientIndex)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClient(clientIndex)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          {selectedClientIndex === clientIndex && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Edit Client Name"
                variant="outlined"
                value={editClientName}
                onChange={(e) => setEditClientName(e.target.value)}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <Button variant="contained" onClick={() => handleEditClientName(clientIndex)}>
                Save
              </Button>
            </Box>
          )}
          <Button
            variant="contained"
            component="label"
            sx={{ mb: 2 }}
          >
            Add File
            <input
              type="file"
              hidden
              accept="application/pdf,image/*"
              onChange={(e) => handleAddFile(clientIndex, e)}
            />
          </Button>
          <List>
            {client.files.map((file, fileIndex) => (
              <ListItem key={fileIndex}>
                <ListItemText primary={file.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleOpen(clientIndex, fileIndex)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(clientIndex, fileIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the file, please select a new file.
          </DialogContentText>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden
              accept="application/pdf,image/*"
              onChange={handleFileChange}
            />
          </Button>
          {newFile && <Box sx={{ marginTop: '16px' }}>Selected File: {newFile.name}</Box>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Repertoire;
