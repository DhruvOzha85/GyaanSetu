import api from './api';

const uploadService = {
  uploadFile: (file, folder = 'general', onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });
  },

  deleteFile: (fileUrl) => api.delete('/upload', { data: { url: fileUrl } }),
};

export default uploadService;
