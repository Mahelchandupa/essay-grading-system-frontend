import jsPDF from "jspdf";
import "../fonts/NotoSans-Regular-normal";

// export const generateComprehensivePDF = async (
//   essayData,
//   studentData,
//   options = {}
// ) => {
//   const pdf = new jsPDF("p", "mm", "a4");

//   // Set NotoSans as the default font (it should be registered by the import)
//   pdf.setFont('NotoSans');


//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();
//   const margin = 20;
//   let yPosition = margin;

//   // Academic color palette
//   const colors = {
//     primary: [0, 51, 102], // Dark blue
//     secondary: [102, 102, 102], // Gray
//     success: [0, 128, 0], // Green
//     warning: [204, 102, 0], // Amber
//     error: [204, 0, 0], // Red
//     text: [0, 0, 0], // Black
//     textLight: [102, 102, 102], // Medium gray
//     background: [248, 249, 250], // Very light gray
//     white: [255, 255, 255],
//     border: [206, 212, 218], // Light border
//   };

//   // Default options
//   const config = {
//     includeEssayText: options.includeEssayText !== false,
//     includeDetailedFeedback: options.includeDetailedFeedback !== false,
//     includeGrammar: options.includeGrammar !== false,
//     includeSpelling: options.includeSpelling !== false,
//     includeStyle: options.includeStyle !== false,
//     includeVocabulary: options.includeVocabulary !== false,
//     includeStructure: options.includeStructure !== false,
//     includeExamples: options.includeExamples !== false,
//     includeInsights: options.includeInsights !== false,
//     ...options,
//   };

//   // ===== HELPER FUNCTIONS =====
//   const getLineHeight = (fontSize) => fontSize * 0.35 + 3;

//   const checkPageBreak = (requiredSpace = 20) => {
//     if (yPosition + requiredSpace > pageHeight - margin) {
//       pdf.addPage();
//       yPosition = margin;
//       return true;
//     }
//     return false;
//   };

//   const addWrappedText = (
//     text,
//     maxWidth,
//     fontSize = 10,
//     bold = false,
//     color = colors.text,
//     lineHeightMultiplier = 1
//   ) => {
//     pdf.setFont("NotoSans", bold ? "bold" : "normal");
//     pdf.setFontSize(fontSize);
//     pdf.setTextColor(...color);

//     // Clean text and preserve line breaks
//     const cleanText = (text || "").toString().replace(/[^\x00-\x7F]/g, "");
//     const lines = pdf.splitTextToSize(cleanText, maxWidth);

//     lines.forEach((line) => {
//       const lineHeight = getLineHeight(fontSize) * lineHeightMultiplier;
//       checkPageBreak(lineHeight);
//       pdf.text(line, margin, yPosition);
//       yPosition += lineHeight;
//     });

//     return yPosition;
//   };

//   const addSection = (title, color = colors.primary) => {
//     checkPageBreak(25);

//     // Add some space before new section
//     if (yPosition > margin + 10) {
//       yPosition += 5;
//     }

//     // Section header with underline
//     pdf.setFont("NotoSans", "bold");
//     pdf.setFontSize(14);
//     pdf.setTextColor(...color);
//     pdf.text(title, margin, yPosition);

//     // Underline
//     pdf.setDrawColor(...color);
//     pdf.setLineWidth(0.5);
//     pdf.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1);

//     yPosition += 12;
//     return yPosition;
//   };

//   const addInfoBox = (
//     content,
//     bgColor = colors.background,
//     borderColor = colors.border,
//     minHeight = 20
//   ) => {
//     checkPageBreak(minHeight + 10);

//     const boxHeight = content.height || minHeight;

//     pdf.setFillColor(...bgColor);
//     pdf.setDrawColor(...borderColor);
//     pdf.setLineWidth(0.3);
//     pdf.roundedRect(
//       margin,
//       yPosition,
//       pageWidth - 2 * margin,
//       boxHeight,
//       2,
//       2,
//       "FD"
//     );

//     return yPosition;
//   };

//   const addQualityBar = (label, score) => {
//     checkPageBreak(15);

//     pdf.setFont("NotoSans", "normal");
//     pdf.setFontSize(10);
//     pdf.setTextColor(...colors.text);
//     pdf.text(label, margin + 5, yPosition);

//     // Background bar
//     const barX = margin + 70;
//     const barWidth = 70;
//     const barHeight = 5;

//     pdf.setFillColor(230, 230, 230);
//     pdf.roundedRect(barX, yPosition - 4, barWidth, barHeight, 1, 1, "F");

//     // Filled bar
//     let barColor = colors.error;
//     if (score >= 0.8) barColor = colors.success;
//     else if (score >= 0.6) barColor = colors.primary;
//     else if (score >= 0.4) barColor = colors.warning;

//     pdf.setFillColor(...barColor);
//     pdf.roundedRect(
//       barX,
//       yPosition - 4,
//       barWidth * score,
//       barHeight,
//       1,
//       1,
//       "F"
//     );

//     // Score text
//     pdf.setFont("NotoSans", "bold");
//     pdf.setTextColor(...colors.text);
//     pdf.text(`${(score * 100).toFixed(0)}%`, barX + barWidth + 5, yPosition);

//     yPosition += 10;
//     return yPosition;
//   };

//   const addBulletPoint = (text, indent = 5, symbol = "•") => {
//     checkPageBreak(10);

//     pdf.setFont("NotoSans", "normal");
//     pdf.setFontSize(9);
//     pdf.setTextColor(...colors.text);

//     const cleanText = (text || "").toString().replace(/[^\x00-\x7F]/g, "");

//     pdf.text(symbol, margin + indent, yPosition);

//     const lines = pdf.splitTextToSize(
//       cleanText,
//       pageWidth - 2 * margin - indent - 8
//     );

//     lines.forEach((line, index) => {
//       if (index === 0) {
//         pdf.text(line, margin + indent + 6, yPosition);
//       } else {
//         checkPageBreak(getLineHeight(9));
//         yPosition += getLineHeight(9);
//         pdf.text(line, margin + indent + 6, yPosition);
//       }
//     });

//     yPosition += getLineHeight(9) + 2;
//     return yPosition;
//   };

//   // ===========================
//   // HEADER SECTION (First Page Only)
//   // ===========================
//   pdf.setFillColor(...colors.primary);
//   pdf.rect(0, 0, pageWidth, 45, "F");

//   pdf.setFont("NotoSans", "bold");
//   pdf.setFontSize(18);
//   pdf.setTextColor(...colors.white);
//   pdf.text("Academic Writing Assessment", pageWidth / 2, 18, {
//     align: "center",
//   });

//   pdf.setFont("NotoSans", "normal");
//   pdf.setFontSize(10);
//   pdf.setTextColor(230, 240, 255);
//   pdf.text(`Student: ${studentData?.name || "N/A"}`, margin, 30);
//   pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, 30, {
//     align: "right",
//   });
//   pdf.text(`Essay: "${essayData.title || "Untitled"}"`, margin, 37);
//   pdf.text(
//     `Word Count: ${essayData.feedback?.summary?.wordsAnalyzed || "N/A"}`,
//     pageWidth - margin,
//     37,
//     { align: "right" }
//   );

//   yPosition = 55;

//   // ===========================
//   // EXECUTIVE SUMMARY
//   // ===========================
//   addSection("Executive Summary");

//   // Overall score box
//   const scoreBoxY = yPosition;
//   addInfoBox({ height: 25 }, [240, 249, 255], colors.primary);

//   const finalScore = essayData.grading?.finalScore || 0;
//   const scoreColor =
//     finalScore >= 80
//       ? colors.success
//       : finalScore >= 70
//       ? colors.primary
//       : finalScore >= 60
//       ? colors.warning
//       : colors.error;

//   // Draw score text inside the box
//   pdf.setFont("NotoSans", "bold");
//   pdf.setFontSize(16);
//   pdf.setTextColor(...scoreColor);
//   pdf.text(`Overall Score: ${finalScore}/100`, margin + 5, scoreBoxY + 10);

//   pdf.setFont("NotoSans", "normal");
//   pdf.setFontSize(11);
//   pdf.setTextColor(...colors.textLight);
//   pdf.text(
//     `Grade: ${essayData.grading?.grade || "N/A"}`,
//     margin + 5,
//     scoreBoxY + 18
//   );
//   pdf.text(
//     `Level: ${essayData.feedback?.studentLevel || "N/A"}`,
//     margin + 80,
//     scoreBoxY + 18
//   );

//   // Move yPosition below the score box
//   yPosition = scoreBoxY + 30;

//   // Quality scores
//   if (essayData.grading?.qualityScores) {
//     yPosition = addWrappedText(
//       "Assessment Breakdown:",
//       pageWidth - 2 * margin,
//       11,
//       true,
//       colors.text
//     );

//     const scores = essayData.grading.qualityScores;
//     addQualityBar("Grammar & Mechanics", scores.grammar || 0);
//     addQualityBar("Content & Ideas", scores.content || 0);
//     addQualityBar("Organization", scores.organization || 0);
//     addQualityBar("Style & Voice", scores.style || 0);
//     addQualityBar("Writing Mechanics", scores.mechanics || 0);

//     yPosition += 5;
//   }

//   // ===========================
//   // SUMMARY FEEDBACK
//   // ===========================
//   if (config.includeDetailedFeedback && essayData.feedback?.summary) {
//     addSection("Assessment Summary");

//     const summary = essayData.feedback.summary;

//     if (summary.overallComment) {
//       yPosition = addWrappedText(
//         summary.overallComment,
//         pageWidth - 2 * margin,
//         11,
//         false,
//         colors.text,
//         1.2
//       );
//     }

//     if (summary.keyTakeaways?.length > 0) {
//       yPosition += 5;
//       yPosition = addWrappedText(
//         "Key Observations:",
//         pageWidth - 2 * margin,
//         11,
//         true,
//         colors.text
//       );

//       summary.keyTakeaways.forEach((takeaway) => {
//         addBulletPoint(takeaway);
//       });
//     }

//     if (summary.nextSteps?.length > 0) {
//       yPosition += 5;
//       yPosition = addWrappedText(
//         "Recommended Next Steps:",
//         pageWidth - 2 * margin,
//         11,
//         true,
//         colors.text
//       );

//       summary.nextSteps.forEach((step, index) => {
//         addBulletPoint(step, 5, `${index + 1}.`);
//       });
//     }

//     yPosition += 10;
//   }

//   // ===========================
//   // GRAMMAR ANALYSIS
//   // ===========================
//   if (config.includeGrammar && essayData.feedback?.grammarErrors?.length > 0) {
//     const grammarErrors = essayData.feedback.grammarErrors;
//     addSection(
//       `Grammar Analysis (${grammarErrors.length} Issues Found)`,
//       grammarErrors.length > 0 ? colors.error : colors.success
//     );

//     // Show first 3 grammar errors with detailed explanations
//     grammarErrors.slice(0, 6).forEach((error, index) => {
//       checkPageBreak(25);

//       // Error header
//       pdf.setFont("NotoSans", "bold");
//       pdf.setFontSize(10);
//       pdf.setTextColor(...colors.error);
//       pdf.text(
//         `Issue ${index + 1}: ${error.type || "Grammar"}`,
//         margin,
//         yPosition
//       );
//       yPosition += 6;

//       // Original sentence
//       pdf.setFont("NotoSans", "italic");
//       pdf.setFontSize(9);
//       pdf.setTextColor(...colors.textLight);
//       yPosition = addWrappedText(
//         `Original: ${error.original}`,
//         pageWidth - 2 * margin,
//         9,
//         false,
//         colors.textLight
//       );

//       // Corrected version
//       pdf.setFont("NotoSans", "bold");
//       pdf.setTextColor(...colors.success);
//       yPosition = addWrappedText(
//         `Corrected: ${error.correction}`,
//         pageWidth - 2 * margin,
//         9,
//         false,
//         colors.success
//       );

//       // Explanation (truncated for space)
//       if (error.explanation) {
//         pdf.setFont("NotoSans", "normal");
//         pdf.setFontSize(8);
//         pdf.setTextColor(...colors.textLight);
//         const shortExplanation = error.explanation.split("\n")[0]; // Take first line only
//         yPosition = addWrappedText(
//           `Note: ${shortExplanation.substring(0, 120)}...`,
//           pageWidth - 2 * margin,
//           8,
//           false,
//           colors.textLight
//         );
//       }

//       yPosition += 8;
//     });

//     if (grammarErrors.length > 3) {
//       yPosition = addWrappedText(
//         `...and ${
//           grammarErrors.length - 3
//         } additional grammar issues identified`,
//         pageWidth - 2 * margin,
//         9,
//         true,
//         colors.textLight
//       );
//     }

//     yPosition += 10;
//   }

//   // ===========================
//   // ORGANIZATION & STRUCTURE
//   // ===========================
//   if (config.includeStructure && essayData.feedback?.organizationFeedback) {
//     addSection("Organization & Structure");

//     const orgFeedback = essayData.feedback.organizationFeedback;

//     if (orgFeedback.structure) {
//       yPosition = addWrappedText(
//         "Structure Assessment:",
//         pageWidth - 2 * margin,
//         10,
//         true,
//         colors.text
//       );

//       yPosition = addWrappedText(
//         orgFeedback.structure.replace(/⚠️/g, "[!] "),
//         pageWidth - 2 * margin,
//         9,
//         false,
//         colors.text
//       );
//     }

//     if (orgFeedback.suggestions?.length > 0) {
//       yPosition += 5;
//       yPosition = addWrappedText(
//         "Structure Suggestions:",
//         pageWidth - 2 * margin,
//         10,
//         true,
//         colors.text
//       );

//       orgFeedback.suggestions.forEach((suggestion) => {
//         addBulletPoint(suggestion.replace(/⚠️/g, "[!] "));
//       });
//     }

//     // Essay structure overview
//     if (essayData.essayStructure) {
//       yPosition += 5;
//       yPosition = addWrappedText(
//         "Essay Sections:",
//         pageWidth - 2 * margin,
//         10,
//         true,
//         colors.text
//       );

//       essayData.essayStructure.sections?.forEach((section, index) => {
//         addBulletPoint(section, 5, `${index + 1}.`);
//       });
//     }

//     yPosition += 8;
//   }

//   // ===========================
//   // BEFORE/AFTER EXAMPLES
//   // ===========================
//   if (
//     config.includeExamples &&
//     essayData.feedback?.beforeAfterExamples?.length > 0
//   ) {
//     addSection("Writing Improvements", colors.primary);

//     essayData.feedback.beforeAfterExamples
//       .slice(0, 2)
//       .forEach((example, index) => {
//         checkPageBreak(20);

//         pdf.setFont("NotoSans", "bold");
//         pdf.setFontSize(10);
//         pdf.setTextColor(...colors.primary);
//         pdf.text(`Improvement Example ${index + 1}:`, margin, yPosition);
//         yPosition += 6;

//         // Before
//         pdf.setFont("NotoSans", "italic");
//         pdf.setFontSize(9);
//         pdf.setTextColor(...colors.error);
//         yPosition = addWrappedText(
//           `Before: ${example.before}`,
//           pageWidth - 2 * margin,
//           9,
//           false,
//           colors.error
//         );

//         // After
//         pdf.setFont("NotoSans", "bold");
//         pdf.setTextColor(...colors.success);
//         yPosition = addWrappedText(
//           `After: ${example.after}`,
//           pageWidth - 2 * margin,
//           9,
//           false,
//           colors.success
//         );

//         yPosition += 8;
//       });
//   }

//   // ===========================
//   // ORIGINAL ESSAY TEXT
//   // ===========================
//   if (config.includeEssayText && essayData.originalText) {
//     addSection("Original Essay");

//     // First, preserve paragraph breaks by replacing multiple newlines with a marker
//     const textWithParagraphMarkers = essayData.originalText
//       .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII
//       .replace(/\n\s*\n/g, "[[PARAGRAPH_BREAK]]") // Mark paragraph breaks
//       .replace(/\n/g, " ") // Replace single newlines with spaces
//       .trim();

//     // Split into paragraphs using the marker
//     const paragraphs = textWithParagraphMarkers.split("[[PARAGRAPH_BREAK]]");

//     paragraphs.forEach((paragraph, index) => {
//       if (paragraph.trim()) {
//         yPosition = addWrappedText(
//           paragraph.trim(),
//           pageWidth - 2 * margin,
//           9,
//           false,
//           colors.text,
//           1.1
//         );

//         // Add space between paragraphs (except after last one)
//         if (index < paragraphs.length - 1) {
//           yPosition += 4; // More space for paragraph breaks
//         }
//       }
//     });
//   }

//   // ===========================
//   // CORRECTED ESSAY TEXT
//   // ===========================
//   if (config.includeEssayText && essayData.fullyCorrectedText) {
//     addSection("Corrected Version", colors.success);

//     // First, preserve paragraph breaks by replacing multiple newlines with a marker
//     const textWithParagraphMarkers = essayData.fullyCorrectedText
//       .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII
//       .replace(/\n\s*\n/g, "[[PARAGRAPH_BREAK]]") // Mark paragraph breaks
//       .replace(/\n/g, " ") // Replace single newlines with spaces
//       .trim();

//     // Split into paragraphs using the marker
//     const paragraphs = textWithParagraphMarkers.split("[[PARAGRAPH_BREAK]]");

//     paragraphs.forEach((paragraph, index) => {
//       if (paragraph.trim()) {
//         yPosition = addWrappedText(
//           paragraph.trim(),
//           pageWidth - 2 * margin,
//           9,
//           false,
//           colors.text,
//           1.1
//         );

//         // Add space between paragraphs (except after last one)
//         if (index < paragraphs.length - 1) {
//           yPosition += 4; // More space for paragraph breaks
//         }
//       }
//     });
//   }

//   // ===========================
//   // FOOTER (Add to all pages)
//   // ===========================
//   const totalPages = pdf.internal.getNumberOfPages();

//   for (let i = 1; i <= totalPages; i++) {
//     pdf.setPage(i);

//     // Save current state
//     const currentY = yPosition;
//     const currentTextColor = pdf.getTextColor();
//     const currentFont = pdf.getFont();

//     // Draw footer
//     pdf.setFillColor(...colors.primary);
//     pdf.rect(0, pageHeight - 15, pageWidth, 15, "F");

//     pdf.setFont("NotoSans", "normal");
//     pdf.setFontSize(8);
//     pdf.setTextColor(...colors.white);
//     pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, {
//       align: "center",
//     });

//     pdf.setFontSize(7);
//     pdf.text(
//       `Generated by AcademicWrite • ${
//         studentData?.name || "Student"
//       } • ${new Date().toLocaleDateString()}`,
//       pageWidth / 2,
//       pageHeight - 3,
//       { align: "center" }
//     );

//     // Restore state (important!)
//     pdf.setTextColor(...currentTextColor);
//     pdf.setFont(currentFont[0], currentFont[1]);
//   }

//   return pdf;
// };

// Export functions

export const generateComprehensivePDF = async (
  essayData,
  studentData,
  options = {}
) => {
  const pdf = new jsPDF("p", "mm", "a4");

  // Set NotoSans as the default font (it should be registered by the import)
  pdf.setFont('NotoSans');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Academic color palette
  const colors = {
    primary: [0, 51, 102], // Dark blue
    secondary: [102, 102, 102], // Gray
    success: [0, 128, 0], // Green
    warning: [204, 102, 0], // Amber
    error: [204, 0, 0], // Red
    text: [0, 0, 0], // Black
    textLight: [102, 102, 102], // Medium gray
    background: [248, 249, 250], // Very light gray
    white: [255, 255, 255],
    border: [206, 212, 218], // Light border
  };

  // Default options
  const config = {
    includeEssayText: options.includeEssayText !== false,
    includeDetailedFeedback: options.includeDetailedFeedback !== false,
    includeGrammar: options.includeGrammar !== false,
    includeSpelling: options.includeSpelling !== false,
    includeStyle: options.includeStyle !== false,
    includeVocabulary: options.includeVocabulary !== false,
    includeStructure: options.includeStructure !== false,
    includeExamples: options.includeExamples !== false,
    includeInsights: options.includeInsights !== false,
    ...options,
  };

  // ===== HELPER FUNCTIONS =====
  const getLineHeight = (fontSize) => fontSize * 0.35 + 3;

  const checkPageBreak = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  const addWrappedText = (
    text,
    maxWidth,
    fontSize = 10,
    bold = false,
    color = colors.text,
    lineHeightMultiplier = 1
  ) => {
    pdf.setFont("NotoSans", bold ? "bold" : "normal");
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);

    // Clean text and preserve line breaks
    const cleanText = (text || "").toString().replace(/[^\x00-\x7F]/g, "");
    const lines = pdf.splitTextToSize(cleanText, maxWidth);

    lines.forEach((line) => {
      const lineHeight = getLineHeight(fontSize) * lineHeightMultiplier;
      checkPageBreak(lineHeight);
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    return yPosition;
  };

  const addSection = (title, color = colors.primary) => {
    checkPageBreak(25);

    // Add some space before new section
    if (yPosition > margin + 10) {
      yPosition += 5;
    }

    // Section header with underline
    pdf.setFont("NotoSans", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...color);
    pdf.text(title, margin, yPosition);

    // Underline
    pdf.setDrawColor(...color);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1);

    yPosition += 12;
    return yPosition;
  };

  const addInfoBox = (
    content,
    bgColor = colors.background,
    borderColor = colors.border,
    minHeight = 20
  ) => {
    checkPageBreak(minHeight + 10);

    const boxHeight = content.height || minHeight;

    pdf.setFillColor(...bgColor);
    pdf.setDrawColor(...borderColor);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(
      margin,
      yPosition,
      pageWidth - 2 * margin,
      boxHeight,
      2,
      2,
      "FD"
    );

    return yPosition;
  };

  const addQualityBar = (label, score) => {
    checkPageBreak(15);

    pdf.setFont("NotoSans", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.text);
    pdf.text(label, margin + 5, yPosition);

    // Background bar
    const barX = margin + 70;
    const barWidth = 70;
    const barHeight = 5;

    pdf.setFillColor(230, 230, 230);
    pdf.roundedRect(barX, yPosition - 4, barWidth, barHeight, 1, 1, "F");

    // Filled bar
    let barColor = colors.error;
    if (score >= 0.8) barColor = colors.success;
    else if (score >= 0.6) barColor = colors.primary;
    else if (score >= 0.4) barColor = colors.warning;

    pdf.setFillColor(...barColor);
    pdf.roundedRect(
      barX,
      yPosition - 4,
      barWidth * score,
      barHeight,
      1,
      1,
      "F"
    );

    // Score text
    pdf.setFont("NotoSans", "bold");
    pdf.setTextColor(...colors.text);
    pdf.text(`${(score * 100).toFixed(0)}%`, barX + barWidth + 5, yPosition);

    yPosition += 10;
    return yPosition;
  };

  const addBulletPoint = (text, indent = 5, symbol = "•") => {
    checkPageBreak(10);

    pdf.setFont("NotoSans", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...colors.text);

    const cleanText = (text || "").toString().replace(/[^\x00-\x7F]/g, "");

    pdf.text(symbol, margin + indent, yPosition);

    const lines = pdf.splitTextToSize(
      cleanText,
      pageWidth - 2 * margin - indent - 8
    );

    lines.forEach((line, index) => {
      if (index === 0) {
        pdf.text(line, margin + indent + 6, yPosition);
      } else {
        checkPageBreak(getLineHeight(9));
        yPosition += getLineHeight(9);
        pdf.text(line, margin + indent + 6, yPosition);
      }
    });

    yPosition += getLineHeight(9) + 2;
    return yPosition;
  };

  // ===========================
  // HEADER SECTION (First Page Only)
  // ===========================
  pdf.setFillColor(...colors.primary);
  pdf.rect(0, 0, pageWidth, 45, "F");

  pdf.setFont("NotoSans", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(...colors.white);
  pdf.text("Academic Writing Assessment", pageWidth / 2, 18, {
    align: "center",
  });

  pdf.setFont("NotoSans", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(230, 240, 255);
  pdf.text(`Student: ${studentData?.name || "N/A"}`, margin, 30);
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, 30, {
    align: "right",
  });
  pdf.text(`Essay: "${essayData.title || "Untitled"}"`, margin, 37);
  pdf.text(
    `Word Count: ${essayData.feedback?.summary?.wordsAnalyzed || "N/A"}`,
    pageWidth - margin,
    37,
    { align: "right" }
  );

  yPosition = 55;

  // ===========================
  // EXECUTIVE SUMMARY
  // ===========================
  addSection("Executive Summary");

  // Overall score box
  const scoreBoxY = yPosition;
  addInfoBox({ height: 25 }, [240, 249, 255], colors.primary);

  const finalScore = essayData.grading?.finalScore || 0;
  const scoreColor =
    finalScore >= 80
      ? colors.success
      : finalScore >= 70
      ? colors.primary
      : finalScore >= 60
      ? colors.warning
      : colors.error;

  // Draw score text inside the box
  pdf.setFont("NotoSans", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(...scoreColor);
  pdf.text(`Overall Score: ${finalScore}/100`, margin + 5, scoreBoxY + 10);

  pdf.setFont("NotoSans", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(...colors.textLight);
  pdf.text(
    `Grade: ${essayData.grading?.grade || "N/A"}`,
    margin + 5,
    scoreBoxY + 18
  );
  pdf.text(
    `Level: ${essayData.feedback?.studentLevel || "N/A"}`,
    margin + 80,
    scoreBoxY + 18
  );

  // Move yPosition below the score box
  yPosition = scoreBoxY + 30;

  // Quality scores
  if (essayData.grading?.qualityScores) {
    yPosition = addWrappedText(
      "Assessment Breakdown:",
      pageWidth - 2 * margin,
      11,
      true,
      colors.text
    );

    const scores = essayData.grading.qualityScores;
    addQualityBar("Grammar & Mechanics", scores.grammar || 0);
    addQualityBar("Content & Ideas", scores.content || 0);
    addQualityBar("Organization", scores.organization || 0);
    addQualityBar("Style & Voice", scores.style || 0);
    addQualityBar("Writing Mechanics", scores.mechanics || 0);

    yPosition += 5;
  }

  // ===========================
  // SUMMARY FEEDBACK
  // ===========================
  if (config.includeDetailedFeedback && essayData.feedback?.summary) {
    addSection("Assessment Summary");

    const summary = essayData.feedback.summary;

    if (summary.overallComment) {
      yPosition = addWrappedText(
        summary.overallComment,
        pageWidth - 2 * margin,
        11,
        false,
        colors.text,
        1.2
      );
    }

    if (summary.keyTakeaways?.length > 0) {
      yPosition += 5;
      yPosition = addWrappedText(
        "Key Observations:",
        pageWidth - 2 * margin,
        11,
        true,
        colors.text
      );

      summary.keyTakeaways.forEach((takeaway) => {
        addBulletPoint(takeaway);
      });
    }

    if (summary.nextSteps?.length > 0) {
      yPosition += 5;
      yPosition = addWrappedText(
        "Recommended Next Steps:",
        pageWidth - 2 * margin,
        11,
        true,
        colors.text
      );

      summary.nextSteps.forEach((step, index) => {
        addBulletPoint(step, 5, `${index + 1}.`);
      });
    }

    yPosition += 10;
  }

  // ===========================
  // GRAMMAR ANALYSIS
  // ===========================
  if (config.includeGrammar && essayData.feedback?.grammarErrors?.length > 0) {
    const grammarErrors = essayData.feedback.grammarErrors;
    addSection(
      `Grammar Analysis (${grammarErrors.length} Issues Found)`,
      grammarErrors.length > 0 ? colors.error : colors.success
    );

    // Show first 3 grammar errors with detailed explanations
    grammarErrors.slice(0, 6).forEach((error, index) => {
      checkPageBreak(25);

      // Error header
      pdf.setFont("NotoSans", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...colors.error);
      pdf.text(
        `Issue ${index + 1}: ${error.type || "Grammar"}`,
        margin,
        yPosition
      );
      yPosition += 6;

      // Original sentence
      pdf.setFont("NotoSans", "italic");
      pdf.setFontSize(9);
      pdf.setTextColor(...colors.textLight);
      yPosition = addWrappedText(
        `Original: ${error.original}`,
        pageWidth - 2 * margin,
        9,
        false,
        colors.textLight
      );

      // Corrected version
      pdf.setFont("NotoSans", "bold");
      pdf.setTextColor(...colors.success);
      yPosition = addWrappedText(
        `Corrected: ${error.correction}`,
        pageWidth - 2 * margin,
        9,
        false,
        colors.success
      );

      // Explanation (truncated for space)
      if (error.explanation) {
        pdf.setFont("NotoSans", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(...colors.textLight);
        const shortExplanation = error.explanation.split("\n")[0]; // Take first line only
        yPosition = addWrappedText(
          `Note: ${shortExplanation.substring(0, 120)}...`,
          pageWidth - 2 * margin,
          8,
          false,
          colors.textLight
        );
      }

      yPosition += 8;
    });

    if (grammarErrors.length > 3) {
      yPosition = addWrappedText(
        `...and ${
          grammarErrors.length - 3
        } additional grammar issues identified`,
        pageWidth - 2 * margin,
        9,
        true,
        colors.textLight
      );
    }

    yPosition += 10;
  }

  // ===========================
  // SPELLING ANALYSIS
  // ===========================
  if (config.includeSpelling && essayData.feedback?.spellingErrors?.length > 0) {
    const spellingErrors = essayData.feedback.spellingErrors;
    addSection(
      `Spelling Analysis (${spellingErrors.length} Errors Found)`,
      spellingErrors.length > 0 ? colors.warning : colors.success
    );

    // Show spelling errors in a table-like format
    spellingErrors.slice(0, 8).forEach((error, index) => {
      checkPageBreak(20);

      // Spelling error row
      pdf.setFont("NotoSans", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...colors.warning);
      
      // Incorrect word
      pdf.text(`"${error.word}"`, margin, yPosition);
      
      // Arrow
      pdf.setFont("NotoSans", "normal");
      pdf.setTextColor(...colors.textLight);
      pdf.text("→", margin + 25, yPosition);
      
      // Correct word
      pdf.setFont("NotoSans", "bold");
      pdf.setTextColor(...colors.success);
      pdf.text(`"${error.correction}"`, margin + 35, yPosition);

      // Severity indicator
      const severityColor = error.severity === 'moderate' ? colors.warning : colors.textLight;
      pdf.setFont("NotoSans", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(...severityColor);
      pdf.text(`(${error.severity})`, margin + 70, yPosition);

      // Context preview
      if (error.context) {
        pdf.setFont("NotoSans", "italic");
        pdf.setFontSize(8);
        pdf.setTextColor(...colors.textLight);
        
        const contextPreview = error.context.substring(0, 80) + (error.context.length > 80 ? '...' : '');
        yPosition += 4;
        yPosition = addWrappedText(
          `Context: ${contextPreview}`,
          pageWidth - 2 * margin,
          8,
          false,
          colors.textLight
        );
      }

      yPosition += 8;
    });

    if (spellingErrors.length > 8) {
      yPosition = addWrappedText(
        `...and ${spellingErrors.length - 8} additional spelling errors identified`,
        pageWidth - 2 * margin,
        9,
        true,
        colors.textLight
      );
    }

    yPosition += 10;
  }

  // ===========================
  // ORGANIZATION & STRUCTURE
  // ===========================
  if (config.includeStructure && essayData.feedback?.organizationFeedback) {
    addSection("Organization & Structure");

    const orgFeedback = essayData.feedback.organizationFeedback;

    if (orgFeedback.structure) {
      yPosition = addWrappedText(
        "Structure Assessment:",
        pageWidth - 2 * margin,
        10,
        true,
        colors.text
      );

      yPosition = addWrappedText(
        orgFeedback.structure.replace(/⚠️/g, "[!] "),
        pageWidth - 2 * margin,
        9,
        false,
        colors.text
      );
    }

    if (orgFeedback.suggestions?.length > 0) {
      yPosition += 5;
      yPosition = addWrappedText(
        "Structure Suggestions:",
        pageWidth - 2 * margin,
        10,
        true,
        colors.text
      );

      orgFeedback.suggestions.forEach((suggestion) => {
        addBulletPoint(suggestion.replace(/⚠️/g, "[!] "));
      });
    }

    // Essay structure overview
    if (essayData.essayStructure) {
      yPosition += 5;
      yPosition = addWrappedText(
        "Essay Sections:",
        pageWidth - 2 * margin,
        10,
        true,
        colors.text
      );

      essayData.essayStructure.sections?.forEach((section, index) => {
        addBulletPoint(section, 5, `${index + 1}.`);
      });
    }

    yPosition += 8;
  }

  // ===========================
  // BEFORE/AFTER EXAMPLES
  // ===========================
  if (
    config.includeExamples &&
    essayData.feedback?.beforeAfterExamples?.length > 0
  ) {
    addSection("Writing Improvements", colors.primary);

    essayData.feedback.beforeAfterExamples
      .slice(0, 2)
      .forEach((example, index) => {
        checkPageBreak(20);

        pdf.setFont("NotoSans", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(...colors.primary);
        pdf.text(`Improvement Example ${index + 1}:`, margin, yPosition);
        yPosition += 6;

        // Before
        pdf.setFont("NotoSans", "italic");
        pdf.setFontSize(9);
        pdf.setTextColor(...colors.error);
        yPosition = addWrappedText(
          `Before: ${example.before}`,
          pageWidth - 2 * margin,
          9,
          false,
          colors.error
        );

        // After
        pdf.setFont("NotoSans", "bold");
        pdf.setTextColor(...colors.success);
        yPosition = addWrappedText(
          `After: ${example.after}`,
          pageWidth - 2 * margin,
          9,
          false,
          colors.success
        );

        yPosition += 8;
      });
  }

  // ===========================
  // ORIGINAL ESSAY TEXT
  // ===========================
  if (config.includeEssayText && essayData.originalText) {
    addSection("Original Essay");

    // First, preserve paragraph breaks by replacing multiple newlines with a marker
    const textWithParagraphMarkers = essayData.originalText
      .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII
      .replace(/\n\s*\n/g, "[[PARAGRAPH_BREAK]]") // Mark paragraph breaks
      .replace(/\n/g, " ") // Replace single newlines with spaces
      .trim();

    // Split into paragraphs using the marker
    const paragraphs = textWithParagraphMarkers.split("[[PARAGRAPH_BREAK]]");

    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        yPosition = addWrappedText(
          paragraph.trim(),
          pageWidth - 2 * margin,
          9,
          false,
          colors.text,
          1.1
        );

        // Add space between paragraphs (except after last one)
        if (index < paragraphs.length - 1) {
          yPosition += 4; // More space for paragraph breaks
        }
      }
    });
  }

  // ===========================
  // CORRECTED ESSAY TEXT
  // ===========================
  if (config.includeEssayText && essayData.fullyCorrectedText) {
    addSection("Corrected Version", colors.success);

    // First, preserve paragraph breaks by replacing multiple newlines with a marker
    const textWithParagraphMarkers = essayData.fullyCorrectedText
      .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII
      .replace(/\n\s*\n/g, "[[PARAGRAPH_BREAK]]") // Mark paragraph breaks
      .replace(/\n/g, " ") // Replace single newlines with spaces
      .trim();

    // Split into paragraphs using the marker
    const paragraphs = textWithParagraphMarkers.split("[[PARAGRAPH_BREAK]]");

    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        yPosition = addWrappedText(
          paragraph.trim(),
          pageWidth - 2 * margin,
          9,
          false,
          colors.text,
          1.1
        );

        // Add space between paragraphs (except after last one)
        if (index < paragraphs.length - 1) {
          yPosition += 4; // More space for paragraph breaks
        }
      }
    });
  }

  // ===========================
  // FOOTER (Add to all pages)
  // ===========================
  const totalPages = pdf.internal.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);

    // Save current state
    const currentY = yPosition;
    const currentTextColor = pdf.getTextColor();
    const currentFont = pdf.getFont();

    // Draw footer
    pdf.setFillColor(...colors.primary);
    pdf.rect(0, pageHeight - 15, pageWidth, 15, "F");

    pdf.setFont("NotoSans", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...colors.white);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, {
      align: "center",
    });

    pdf.setFontSize(7);
    pdf.text(
      `Generated by AcademicWrite • ${
        studentData?.name || "Student"
      } • ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 3,
      { align: "center" }
    );

    // Restore state (important!)
    pdf.setTextColor(...currentTextColor);
    pdf.setFont(currentFont[0], currentFont[1]);
  }

  return pdf;
};

export const exportEssayFeedbackPDF = async (
  essayData,
  studentData,
  options = {}
) => {
  try {
    const pdf = await generateComprehensivePDF(essayData, studentData, options);
    const fileName =
      options.fileName || `essay-feedback-${essayData._id || Date.now()}.pdf`;
    pdf.save(fileName);
    return { success: true, fileName };
  } catch (error) {
    console.error("PDF export error:", error);
    return { success: false, error: error.message };
  }
};

export const previewEssayFeedbackPDF = async (
  essayData,
  studentData,
  options = {}
) => {
  try {
    const pdf = await generateComprehensivePDF(essayData, studentData, options);
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    return { success: true, pdfUrl, blob: pdfBlob };
  } catch (error) {
    console.error("PDF preview error:", error);
    return { success: false, error: error.message };
  }
};
