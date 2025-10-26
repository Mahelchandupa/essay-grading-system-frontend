import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, BookOpen, AlertCircle, CheckCircle, XCircle, ArrowRight } from "lucide-react";

function ExplanationRenderer({ explanation, className = "" }) {
    if (!explanation) return null;

    // Parse the explanation text that follows your actual format
    const parseExplanation = (text) => {
        const sections = {
            importance: "",
            rule: "",
            memoryTip: "",
            examples: []
        };

        // Split by ** markers to find sections
        const parts = text.split(/\*\*(.*?)\*\*/);
        
        let currentSection = '';
        let content = '';

        // Process each part
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            
            if (part === 'Why This Matters:') {
                if (currentSection && content) {
                    sections[currentSection] = content.trim();
                }
                currentSection = 'importance';
                content = '';
            } else if (part === 'The Rule:') {
                if (currentSection && content) {
                    sections[currentSection] = content.trim();
                }
                currentSection = 'rule';
                content = '';
            } else if (part === 'Memory Tip:') {
                if (currentSection && content) {
                    sections[currentSection] = content.trim();
                }
                currentSection = 'memoryTip';
                content = '';
            } else if (part === 'Examples:') {
                if (currentSection && content) {
                    sections[currentSection] = content.trim();
                }
                currentSection = 'examples';
                content = '';
            } else if (currentSection && part) {
                // Handle examples section specially
                if (currentSection === 'examples') {
                    // Parse example lines
                    const exampleLines = part.split(/\d+\.\s+/).filter(line => line.trim());
                    exampleLines.forEach(line => {
                        if (line.includes('❌') && line.includes('✅')) {
                            const [beforePart, afterPart] = line.split('→');
                            if (beforePart && afterPart) {
                                const before = beforePart.replace('❌', '').replace(/"/g, '').trim();
                                const after = afterPart.replace('✅', '').replace(/"/g, '').trim();
                                sections.examples.push({ before, after });
                            }
                        }
                    });
                } else {
                    content += part + ' ';
                }
            } else if (!currentSection && part && !part.includes(':')) {
                // This is likely the initial importance text before the first ** marker
                sections.importance = part;
            }
        }

        // Handle the last section
        if (currentSection && currentSection !== 'examples' && content) {
            sections[currentSection] = content.trim();
        }

        return sections;
    };

    const sections = parseExplanation(explanation);

    return (
        <motion.div 
            className={`bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-500/20 ${className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="space-y-4">
                {/* Importance Section */}
                {sections.importance && (
                    <motion.div 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide mb-1 block">
                                Why This Matters
                            </span>
                            <p className="text-amber-200 text-sm leading-relaxed">
                                {sections.importance}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Rule Section */}
                {sections.rule && (
                    <motion.div 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <BookOpen className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide mb-1 block">
                                The Rule
                            </span>
                            <p className="text-purple-200 text-sm leading-relaxed">
                                {sections.rule}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Memory Tip Section */}
                {sections.memoryTip && (
                    <motion.div 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-1 block">
                                Memory Tip
                            </span>
                            <p className="text-blue-200 text-sm leading-relaxed">
                                {sections.memoryTip}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Examples Section */}
                {sections.examples.length > 0 && (
                    <motion.div 
                        className="mt-4 pt-4 border-t border-blue-500/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h5 className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-3">
                            Examples
                        </h5>
                        
                        <div className="space-y-3">
                            {sections.examples.map((example, index) => (
                                <motion.div 
                                    key={index}
                                    className="grid md:grid-cols-2 gap-3"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    {/* Before Example */}
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <XCircle className="w-3 h-3 text-red-400" />
                                            <span className="text-xs font-semibold text-red-300">Incorrect</span>
                                        </div>
                                        <p className="text-red-200 text-xs italic leading-relaxed">
                                            "{example.before}"
                                        </p>
                                    </div>

                                    {/* After Example */}
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                                            <span className="text-xs font-semibold text-emerald-300">Correct</span>
                                        </div>
                                        <p className="text-emerald-200 text-xs font-medium leading-relaxed">
                                            "{example.after}"
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Quick Tips */}
            <motion.div 
                className="mt-4 pt-4 border-t border-blue-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex items-center gap-2 text-xs text-blue-400">
                    <Lightbulb className="w-3 h-3" />
                    <span className="font-semibold">Tip:</span>
                    <span>Read your sentences aloud to catch awkward phrasing</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ExplanationRenderer;