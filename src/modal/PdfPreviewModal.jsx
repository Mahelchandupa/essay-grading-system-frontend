import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  RefreshCw,
  FileText,
  CheckCircle,
  Eye,
  Settings,
  AlertCircle,
} from 'lucide-react';
import { previewEssayFeedbackPDF } from '../utils/pdfExport';
import { usePdfExport } from '../hooks/usePdfExport';

const PdfPreviewModal = ({ essayData, studentData, isOpen, onClose }) => {
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  
  const { isExporting, exportProgress, exportFeedbackPDF } = usePdfExport();

  const [exportOptions, setExportOptions] = useState({
    includeEssayText: true,
    includeDetailedFeedback: true,
    includeGrammar: true,
    includeSpelling: true,
    includeStyle: true,
    includeVocabulary: true,
    includeStructure: true,
    includeExamples: true,
    includeInsights: true,
  });

  const handlePreview = async (options = exportOptions) => {
    setIsLoadingPreview(true);
    setPreviewError(null);
    
    try {
      // Revoke old URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const result = await previewEssayFeedbackPDF(essayData, studentData, options);
      
      if (result.success) {
        setPreviewUrl(result.pdfUrl);
      } else {
        setPreviewError(result.error || 'Failed to generate preview');
      }
    } catch (error) {
      console.error('Preview failed:', error);
      setPreviewError(error.message || 'Failed to generate preview');
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleDownload = async () => {
    try {
      const result = await exportFeedbackPDF(essayData, studentData, exportOptions);
      
      if (result.success) {
        console.log('PDF exported successfully:', result.fileName);
      } else {
        console.error('Export failed:', result.error);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleOptionChange = (option) => {
    const newOptions = {
      ...exportOptions,
      [option]: !exportOptions[option],
    };
    setExportOptions(newOptions);
  };

  const handleApplyOptions = () => {
    handlePreview(exportOptions);
    setShowOptions(false);
  };

  const handleSelectAll = () => {
    setExportOptions({
      includeEssayText: true,
      includeDetailedFeedback: true,
      includeGrammar: true,
      includeSpelling: true,
      includeStyle: true,
      includeVocabulary: true,
      includeStructure: true,
      includeExamples: true,
      includeInsights: true,
    });
  };

  const handleDeselectAll = () => {
    setExportOptions({
      includeEssayText: false,
      includeDetailedFeedback: false,
      includeGrammar: false,
      includeSpelling: false,
      includeStyle: false,
      includeVocabulary: false,
      includeStructure: false,
      includeExamples: false,
      includeInsights: false,
    });
  };

  useEffect(() => {
    if (isOpen && !previewUrl) {
      handlePreview();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  const options = [
    { key: 'includeEssayText', label: 'Essay Text', icon: FileText, description: 'Your original essay content' },
    { key: 'includeDetailedFeedback', label: 'Summary Feedback', icon: FileText, description: 'Overall assessment and next steps' },
    { key: 'includeGrammar', label: 'Grammar Issues', icon: CheckCircle, description: 'Grammar corrections and explanations' },
    { key: 'includeSpelling', label: 'Spelling Issues', icon: CheckCircle, description: 'Spelling errors and suggestions' },
    { key: 'includeStyle', label: 'Style Feedback', icon: CheckCircle, description: 'Writing style improvements' },
    { key: 'includeVocabulary', label: 'Vocabulary', icon: CheckCircle, description: 'Word choice enhancements' },
    { key: 'includeStructure', label: 'Structure Analysis', icon: CheckCircle, description: 'Organization and structure feedback' },
    { key: 'includeExamples', label: 'Before/After Examples', icon: CheckCircle, description: 'Real examples from your essay' },
    { key: 'includeInsights', label: 'Personalized Insights', icon: CheckCircle, description: 'Progress tracking and trends' },
  ];

  const selectedCount = Object.values(exportOptions).filter(Boolean).length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-gray-900 rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col border border-gray-700/50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-800/50">
            <div className="flex items-center gap-4">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Eye className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">PDF Preview & Export</h2>
                <p className="text-gray-400 text-sm">
                  {essayData.title || 'Untitled Essay'} • {selectedCount} sections selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Options Toggle */}
              <motion.button
                onClick={() => setShowOptions(!showOptions)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showOptions
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-4 h-4" />
                Options
                {selectedCount < 9 && (
                  <span className="ml-1 px-2 py-0.5 bg-purple-500/30 rounded-full text-xs">
                    {selectedCount}
                  </span>
                )}
              </motion.button>

              {/* Refresh */}
              <motion.button
                onClick={() => handlePreview()}
                disabled={isLoadingPreview}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingPreview ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>

              {/* Download */}
              <motion.button
                onClick={handleDownload}
                disabled={isExporting || isLoadingPreview}
                className="relative flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Exporting... {exportProgress}%</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download PDF
                  </>
                )}
                
                {/* Progress bar */}
                {isExporting && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-blue-300"
                    initial={{ width: "0%" }}
                    animate={{ width: `${exportProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>

              {/* Close */}
              <motion.button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* PDF Preview */}
            <div className={`flex-1 ${showOptions ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
              <div className="h-full p-4 bg-gray-800/30">
                {isLoadingPreview ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                    />
                    <p className="text-gray-300 text-lg font-medium">Generating PDF preview...</p>
                    <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
                  </div>
                ) : previewError ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center max-w-md">
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <p className="text-red-300 font-medium mb-2">Failed to generate preview</p>
                      <p className="text-red-400 text-sm mb-4">{previewError}</p>
                      <motion.button
                        onClick={() => handlePreview()}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Try Again
                      </motion.button>
                    </div>
                  </div>
                ) : previewUrl ? (
                  <iframe
                    src={previewUrl}
                    className="w-full h-full border border-gray-700 rounded-xl bg-white shadow-xl"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="bg-gray-700/30 border border-gray-600/50 rounded-xl p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 font-medium">No preview available</p>
                      <p className="text-gray-400 text-sm">Click "Refresh" to generate preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Options Panel */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '33.333%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="border-l border-gray-700/50 bg-gray-800/50 overflow-hidden"
                >
                  <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-gray-700/50">
                      <h3 className="text-lg font-bold text-white mb-2">Export Options</h3>
                      <p className="text-gray-400 text-sm">
                        Customize what to include in your PDF
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-3">
                        {options.map((option) => (
                          <motion.label
                            key={option.key}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              exportOptions[option.key]
                                ? 'bg-blue-500/10 border-blue-500/30'
                                : 'bg-gray-700/30 border-gray-700/50 hover:border-gray-600'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="checkbox"
                              checked={exportOptions[option.key]}
                              onChange={() => handleOptionChange(option.key)}
                              className="w-5 h-5 mt-0.5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <option.icon
                                  className={`w-4 h-4 ${
                                    exportOptions[option.key] ? 'text-blue-400' : 'text-gray-400'
                                  }`}
                                />
                                <span
                                  className={`text-sm font-medium ${
                                    exportOptions[option.key] ? 'text-white' : 'text-gray-300'
                                  }`}
                                >
                                  {option.label}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400">{option.description}</p>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 border-t border-gray-700/50 space-y-3">
                      <motion.button
                        onClick={handleApplyOptions}
                        disabled={isLoadingPreview}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RefreshCw className={`w-4 h-4 ${isLoadingPreview ? 'animate-spin' : ''}`} />
                        Apply & Refresh Preview
                      </motion.button>

                      <div className="flex gap-2">
                        <motion.button
                          onClick={handleSelectAll}
                          className="flex-1 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Select All
                        </motion.button>

                        <motion.button
                          onClick={handleDeselectAll}
                          className="flex-1 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Clear All
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PdfPreviewModal;