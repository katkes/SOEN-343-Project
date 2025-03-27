import React, { useState } from 'react';
import CustomButton from './CustomButton';

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    if (onFilesSelected) onFilesSelected(newFiles);
  };

  const handleRemoveFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, index) => index !== idx));
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#273266] mb-2">Upload Digital Resources</h3>
      <div
        className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          isDragging ? 'border-[#3D50FF] bg-blue-50' : 'border-gray-300 bg-white'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
          }
        }}
      >
        <p className="text-sm text-gray-500 mb-3">Drag and drop your files here, or</p>
        <label className="cursor-pointer inline-block bg-[#3D50FF] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#273266]">
          Select File
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleFiles(e.target.files);
              }
            }}
          />
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2 text-gray-600">Uploaded Files:</h4>
          <ul className="text-sm text-gray-700 list-disc list-inside">
            {uploadedFiles.map((file, idx) => (
              <li key={idx} className="flex justify-between items-center my-1">
                <span>{file.name}</span>
                <CustomButton
                  className="ml-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded"
                  onClick={() => handleRemoveFile(idx)}
                  disableDefaults
                >
                  Remove
                </CustomButton>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
