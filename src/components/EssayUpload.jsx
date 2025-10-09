// import React, { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { 
//   Upload, 
//   FileText, 
//   Image, 
//   AlertCircle, 
//   CheckCircle, 
//   Loader, 
//   X, 
//   Eye, 
//   ChevronRight,
//   BookOpen,
//   GraduationCap,
//   Scan
// } from 'lucide-react';
// import axios from 'axios';

// const EssayUpload = ({ studentId, onSubmitSuccess }) => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [progress, setProgress] = useState({ stage: '', percent: 0 });
//   const [error, setError] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const onDrop = useCallback((acceptedFiles) => {
//     const uploadedFile = acceptedFiles[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       setError(null);

//       if (uploadedFile.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = (e) => setPreview(e.target.result);
//         reader.readAsDataURL(uploadedFile);
//       } else {
//         setPreview(null);
//       }
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': ['.png', '.jpg', '.jpeg'],
//       'application/pdf': ['.pdf'],
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
//       'text/plain': ['.txt']
//     },
//     maxFiles: 1,
//     maxSize: 10 * 1024 * 1024
//   });

//   const handleSubmit = async () => {
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }

//     setUploading(true);
//     setProcessing(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('essay', file);
//     formData.append('studentId', studentId);

//     try {
//       setProgress({ stage: 'Uploading Document...', percent: 20 });

//       const response = await axios.post('/api/essays/grade', formData, {
//         headers: {
//           'Content-Type': 'multipart-form/data'
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setProgress({ stage: 'Uploading Document...', percent: percentCompleted * 0.3 });
//         }
//       });

//       setProgress({ stage: 'Extracting Text Content...', percent: 40 });
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       setProgress({ stage: 'Analyzing Writing Quality...', percent: 60 });
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       setProgress({ stage: 'Generating Academic Feedback...', percent: 80 });
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       setProgress({ stage: 'Assessment Complete!', percent: 100 });

//       setTimeout(() => {
//         onSubmitSuccess(response.data);
//       }, 500);

//     } catch (err) {
//       console.error('Upload error:', err);
//       setError(err.response?.data?.message || 'Failed to process essay. Please try again.');
//       setProcessing(false);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemove = () => {
//     setFile(null);
//     setPreview(null);
//     setError(null);
//   };

//   const getFileIcon = (fileType) => {
//     if (fileType.startsWith('image/')) {
//       return <Image className="w-10 h-10 text-blue-500" />;
//     } else if (fileType === 'application/pdf') {
//       return <FileText className="w-10 h-10 text-red-500" />;
//     }
//     return <FileText className="w-10 h-10 text-blue-500" />;
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
//             <BookOpen className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-3">Submit Your Essay</h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Upload your handwritten or digital essay for comprehensive academic assessment and personalized feedback
//           </p>
//         </div>

//         {/* Upload Area */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
//           {!file && !processing && (
//             <div
//               {...getRootProps()}
//               className={`
//                 border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
//                 transition-all duration-200
//                 ${isDragActive 
//                   ? 'border-blue-500 bg-blue-50' 
//                   : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
//                 }
//               `}
//             >
//               <input {...getInputProps()} />
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
//                 <Upload className={`w-8 h-8 ${isDragActive ? 'text-blue-600' : 'text-gray-400'}`} />
//               </div>
              
//               {isDragActive ? (
//                 <p className="text-lg font-semibold text-blue-600 mb-2">Drop your essay here...</p>
//               ) : (
//                 <>
//                   <p className="text-lg font-semibold text-gray-700 mb-2">
//                     Drag & drop your essay file here
//                   </p>
//                   <p className="text-sm text-gray-500 mb-4">
//                     or click to browse files from your computer
//                   </p>
//                 </>
//               )}
//               <p className="text-xs text-gray-400">Maximum file size: 10MB</p>
//             </div>
//           )}

//           {/* File Preview */}
//           {file && !processing && (
//             <div className="space-y-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-4 flex-1">
//                   <div className="bg-blue-100 p-3 rounded-xl">
//                     {getFileIcon(file.type)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-semibold text-gray-900 truncate">
//                       {file.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {formatFileSize(file.size)} • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleRemove}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                   title="Remove file"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>

//               {/* Image Preview */}
//               {preview && (
//                 <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
//                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                     <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <Eye className="w-4 h-4" />
//                       Document Preview
//                     </p>
//                   </div>
//                   <img 
//                     src={preview} 
//                     alt="Essay preview" 
//                     className="w-full h-auto max-h-96 object-contain bg-white p-4"
//                   />
//                   <div className="bg-amber-50 px-4 py-3 border-t border-amber-200">
//                     <p className="text-xs text-amber-800 flex items-center gap-2">
//                       <AlertCircle className="w-4 h-4" />
//                       Ensure your handwriting is clear and legible for accurate analysis
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={uploading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold
//                          hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
//                          transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
//               >
//                 {uploading ? (
//                   <>
//                     <Loader className="w-5 h-5 animate-spin" />
//                     Processing Submission...
//                   </>
//                 ) : (
//                   <>
//                     <GraduationCap className="w-5 h-5" />
//                     Begin Academic Assessment
//                     <ChevronRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Processing Progress */}
//           {processing && (
//             <div className="text-center space-y-6">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-4">
//                 <Scan className="w-10 h-10 text-blue-600" />
//               </div>
              
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {progress.stage}
//                 </h3>
//                 <p className="text-gray-600">
//                   Our AI is analyzing your essay for comprehensive assessment...
//                 </p>
//               </div>

//               {/* Progress Bar */}
//               <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                 <div
//                   className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500 ease-out rounded-full"
//                   style={{ width: `${progress.percent}%` }}
//                 />
//               </div>
//               <p className="text-sm text-gray-600 font-medium">
//                 {progress.percent}% Complete
//               </p>

//               {/* Academic Insights */}
//               <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
//                 <div className="flex items-start gap-3">
//                   <div className="bg-blue-100 p-2 rounded-lg">
//                     <BookOpen className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-blue-900 mb-2">Academic Assessment in Progress</p>
//                     <p className="text-sm text-blue-800">
//                       Our system evaluates 150+ writing features including grammar, content quality, 
//                       organization, argument structure, and academic style conventions.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-4">
//             <div className="bg-red-100 p-2 rounded-lg">
//               <AlertCircle className="w-6 h-6 text-red-600" />
//             </div>
//             <div className="flex-1">
//               <h4 className="text-lg font-semibold text-red-800 mb-2">Submission Error</h4>
//               <p className="text-red-700">{error}</p>
//             </div>
//             <button
//               onClick={() => setError(null)}
//               className="p-2 hover:bg-red-100 rounded-lg transition-colors"
//             >
//               <X className="w-5 h-5 text-red-600" />
//             </button>
//           </div>
//         )}

//         {/* Supported Formats Info */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Supported Document Types</h3>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: <Image className="w-8 h-8 text-blue-600" />, name: 'Handwritten Essays', formats: 'JPG, PNG', desc: 'Clear photos of handwritten work' },
//               { icon: <FileText className="w-8 h-8 text-red-600" />, name: 'PDF Documents', formats: 'PDF', desc: 'Digital documents and scans' },
//               { icon: <FileText className="w-8 h-8 text-green-600" />, name: 'Word Documents', formats: 'DOCX', desc: 'Microsoft Word files' },
//               { icon: <FileText className="w-8 h-8 text-purple-600" />, name: 'Text Files', formats: 'TXT', desc: 'Plain text documents' }
//             ].map((format, index) => (
//               <div key={index} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-3 border border-gray-200">
//                   {format.icon}
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-1">{format.name}</h4>
//                 <p className="text-sm text-blue-600 font-medium mb-2">{format.formats}</p>
//                 <p className="text-xs text-gray-600">{format.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EssayUpload;


import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Image, 
  AlertCircle, 
  CheckCircle, 
  Loader, 
  X, 
  Eye, 
  ChevronRight,
  BookOpen,
  GraduationCap,
  Scan,
  Zap,
  Sparkles
} from 'lucide-react';
import axios from 'axios';

const EssayUpload = ({ studentId, onSubmitSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ stage: '', percent: 0 });
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError(null);

      if (uploadedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(uploadedFile);
      } else {
        setPreview(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024
  });

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('essay', file);
    formData.append('studentId', studentId);

    try {
      setProgress({ stage: 'Uploading Document...', percent: 20 });

      const response = await axios.post('/api/essays/grade', formData, {
        headers: {
          'Content-Type': 'multipart-form/data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress({ stage: 'Uploading Document...', percent: percentCompleted * 0.3 });
        }
      });

      setProgress({ stage: 'Extracting Text Content...', percent: 40 });
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProgress({ stage: 'Analyzing Writing Quality...', percent: 60 });
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProgress({ stage: 'Generating Academic Feedback...', percent: 80 });
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProgress({ stage: 'Assessment Complete!', percent: 100 });

      setTimeout(() => {
        onSubmitSuccess(response.data);
      }, 500);

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to process essay. Please try again.');
      setProcessing(false);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <Image className="w-10 h-10 text-blue-400" />;
    } else if (fileType === 'application/pdf') {
      return <FileText className="w-10 h-10 text-red-400" />;
    }
    return <FileText className="w-10 h-10 text-blue-400" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
            variants={pulseVariants}
            animate="pulse"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            Submit Your Essay
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Upload your handwritten or digital essay for comprehensive academic assessment and personalized feedback
          </motion.p>
        </motion.div>

        {/* Upload Area */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 p-8 mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AnimatePresence mode="wait">
            {!file && !processing && (
              <motion.div
                key="upload-area"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer
                    transition-all duration-300 backdrop-blur-sm
                    ${isDragActive 
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg' 
                      : 'border-gray-600 hover:border-blue-400 hover:bg-gray-700/50'
                    }
                  `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <input {...getInputProps()} />
                  <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 bg-gray-700 rounded-2xl mb-6 relative"
                    animate={{ 
                      rotate: isHovered ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Upload className={`w-10 h-10 ${isDragActive ? 'text-blue-400' : 'text-gray-400'}`} />
                    {isDragActive && (
                      <motion.div
                        className="absolute -top-2 -right-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 180, 360] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {isDragActive ? (
                    <motion.p 
                      className="text-2xl font-semibold text-blue-400 mb-3"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      Drop your essay here...
                    </motion.p>
                  ) : (
                    <>
                      <motion.p 
                        className="text-2xl font-semibold text-white mb-3"
                        variants={itemVariants}
                      >
                        Drag & drop your essay file here
                      </motion.p>
                      <motion.p 
                        className="text-lg text-gray-400 mb-6"
                        variants={itemVariants}
                      >
                        or click to browse files from your computer
                      </motion.p>
                    </>
                  )}
                  <motion.p 
                    className="text-sm text-gray-500"
                    variants={itemVariants}
                  >
                    Maximum file size: 10MB
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* File Preview */}
            {file && !processing && (
              <motion.div
                key="file-preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div 
                      className="bg-gray-700 p-4 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {getFileIcon(file.type)}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white truncate">
                        {file.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {formatFileSize(file.size)} • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleRemove}
                    className="p-3 hover:bg-gray-700 rounded-xl transition-all duration-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    title="Remove file"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
                  </motion.button>
                </div>

                {/* Image Preview */}
                {preview && (
                  <motion.div 
                    className="border-2 border-gray-600 rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
                      <p className="text-sm font-medium text-white flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Document Preview
                      </p>
                    </div>
                    <img 
                      src={preview} 
                      alt="Essay preview" 
                      className="w-full h-auto max-h-96 object-contain bg-gray-900 p-6"
                    />
                    <div className="bg-amber-500/10 px-4 py-3 border-t border-amber-500/20">
                      <p className="text-xs text-amber-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Ensure your handwriting is clear and legible for accurate analysis
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold
                           hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
                           transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl hover:shadow-blue-500/25
                           relative overflow-hidden group"
                  whileHover={{ scale: uploading ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                  />
                  
                  {uploading ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      Processing Submission...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-6 h-6" />
                      Begin Academic Assessment
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* Processing Progress */}
            {processing && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-8"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Scan className="w-12 h-12 text-white" />
                </motion.div>
                
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-3"
                    key={progress.stage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {progress.stage}
                  </motion.h3>
                  <p className="text-gray-400 text-lg">
                    Our AI is analyzing your essay for comprehensive assessment...
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: [-100, 100] }}
                      transition={{ 
                        x: { 
                          repeat: Infinity, 
                          duration: 1.5,
                          ease: "easeInOut"
                        }
                      }}
                    />
                  </motion.div>
                </div>
                <motion.p 
                  className="text-lg text-gray-300 font-semibold"
                  key={progress.percent}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {progress.percent}% Complete
                </motion.p>

                {/* Academic Insights */}
                <motion.div 
                  className="bg-gray-700/50 border border-gray-600 rounded-2xl p-8 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="bg-blue-500/20 p-3 rounded-xl"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.4)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{ 
                        boxShadow: { 
                          repeat: Infinity, 
                          duration: 2,
                          repeatDelay: 3
                        }
                      }}
                    >
                      <Zap className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-semibold text-white mb-3">Academic Assessment in Progress</p>
                      <p className="text-gray-300 leading-relaxed">
                        Our advanced AI evaluates 150+ writing features including grammar, content quality, 
                        organization, argument structure, vocabulary sophistication, and academic style conventions.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="bg-red-500/10 border-2 border-red-500/20 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-sm"
            >
              <motion.div 
                className="bg-red-500/20 p-3 rounded-xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="w-6 h-6 text-red-400" />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-red-300 mb-2">Submission Error</h4>
                <p className="text-red-200">{error}</p>
              </div>
              <motion.button
                onClick={() => setError(null)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-red-400" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supported Formats Info */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-md rounded-3xl border border-gray-700/50 p-8 shadow-2xl"
          variants={itemVariants}
        >
          <motion.h3 
            className="text-2xl font-bold text-white mb-8 text-center"
            variants={itemVariants}
          >
            Supported Document Types
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Image className="w-10 h-10 text-blue-400" />, name: 'Handwritten Essays', formats: 'JPG, PNG', desc: 'Clear photos of handwritten work' },
              { icon: <FileText className="w-10 h-10 text-red-400" />, name: 'PDF Documents', formats: 'PDF', desc: 'Digital documents and scans' },
              { icon: <FileText className="w-10 h-10 text-green-400" />, name: 'Word Documents', formats: 'DOCX', desc: 'Microsoft Word files' },
              { icon: <FileText className="w-10 h-10 text-purple-400" />, name: 'Text Files', formats: 'TXT', desc: 'Plain text documents' }
            ].map((format, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-gray-700/30 rounded-2xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 group hover:bg-gray-700/50"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-14 h-14 bg-gray-800 rounded-2xl mb-4 border border-gray-600 group-hover:border-gray-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {format.icon}
                </motion.div>
                <h4 className="font-bold text-white mb-2 group-hover:text-gray-200">{format.name}</h4>
                <p className="text-blue-400 font-medium mb-3 text-sm">{format.formats}</p>
                <p className="text-xs text-gray-400 group-hover:text-gray-300">{format.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EssayUpload;