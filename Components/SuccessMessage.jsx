import React from 'react';
import { CheckCircle, MapPin, Trophy, Share2 } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Card, CardContent } from '../src/components/ui/card';
import { motion } from 'framer-motion';

export default function SuccessMessage({ onContinue }) {
    const shareReport = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Environmental Threat Reported',
                text: 'I just reported an environmental threat through MangroveWatch. Help protect our mangroves!',
                url: window.location.origin
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(
                'I just reported an environmental threat through MangroveWatch. Help protect our mangroves!'
            );
            alert('Message copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-2xl border-0 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500" />
                    <CardContent className="p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center"
                        >
                            <CheckCircle className="w-10 h-10 text-white" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-gray-900 mb-3"
                        >
                            Report Submitted Successfully!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 mb-6"
                        >
                            Thank you for helping protect our mangrove ecosystems. Your report has been recorded and will be reviewed by authorities.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4 mb-6"
                        >
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <Trophy className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-green-800 font-medium">+50 Conservation Points</p>
                                        <p className="text-green-600 text-sm">Earned for your contribution</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-blue-800 font-medium">Location Recorded</p>
                                        <p className="text-blue-600 text-sm">Authorities have been notified</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-3"
                        >
                            <Button
                                onClick={onContinue}
                                className="w-full h-12 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                            >
                                Submit Another Report
                            </Button>

                            <Button
                                onClick={shareReport}
                                variant="outline"
                                className="w-full h-12 border-teal-300 text-teal-700 hover:bg-teal-50 rounded-xl transition-all duration-300"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share with Community
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-6 pt-6 border-t border-gray-200"
                        >
                            <p className="text-xs text-gray-500">
                                Your report will be reviewed within 24-48 hours. 
                                You'll receive updates on the investigation progress.
                            </p>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}