import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Modal, Divider } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

type SupportPageProps = {
  open: boolean;
  onClose: () => void;
};

const SupportPage = ({ open, onClose }: SupportPageProps) => {
  const [title, setTitle] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    console.log('Title:', title);
    console.log('Contact Info:', contactInfo);
    console.log('Description:', description);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight="bold">
          Contact Support
        </Typography>

        <Typography color="error" mt={2} mb={2} fontWeight="bold">
          Please refer to 'FAQ' before requesting support
        </Typography>
        <Typography color="error" fontWeight="bold">
          Contact IT: 0913677744. If the request is important
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          <TextField label="Title *" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />

          <TextField
            label="Contact information (mobile or email)"
            variant="outlined"
            fullWidth
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />

          <Typography variant="body1" fontWeight="bold">
            Description
          </Typography>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            init={{
              height: 200,
              menubar: false,
              plugins: 'lists link',
              toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link'
            }}
            onEditorChange={(content) => setDescription(content)}
          />
          <Typography variant="caption" color="text.secondary">
            (*) For word documents: Paste single page per time
          </Typography>
        </Stack>

        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button variant="text" onClick={onClose}>
            CLOSE
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            SAVE
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SupportPage;
