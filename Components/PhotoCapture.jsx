import React, { useState, useRef } from 'react';
import { Camera, Upload, X, CheckCircle } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Card, CardContent } from '../src/components/ui/card';

export default function PhotoCapture({ onPhotoCapture, currentPhoto }) {
    const [photo, setPhoto] = useState(currentPhoto || null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCapturing(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            // Fallback to file upload
            fileInputRef.current?.click();
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCapturing(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            
            canvasRef.current.toBlob((blob) => {
                const file = new File([blob], 'incident-photo.jpg', { type: 'image/jpeg' });
                handlePhotoSelect(file);
            }, 'image/jpeg');
            
            stopCamera();
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handlePhotoSelect(file);
        }
    };

    const handlePhotoSelect = async (file) => {
        setIsUploading(true);
        try {
            await onPhotoCapture(file);
            setPhoto(URL.createObjectURL(file));
        } catch (error) {
            console.error('Error processing photo:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const removePhoto = () => {
        setPhoto(null);
        onPhotoCapture(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-teal-600" />
                <span className="font-medium">Photo Evidence</span>
            </div>

            {!photo && !isCapturing && (
                <Card className="border-2 border-dashed border-gray-300 hover:border-teal-400 transition-colors">
                    <CardContent className="p-8 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                                <Camera className="w-8 h-8 text-teal-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Capture Incident Photo
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Take a clear photo showing the environmental threat
                                </p>
                            </div>
                            <div className="flex gap-3 justify-center">
                                <Button
                                    onClick={startCamera}
                                    className="bg-teal-600 hover:bg-teal-700"
                                >
                                    <Camera className="w-4 h-4 mr-2" />
                                    Use Camera
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Photo
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {isCapturing && (
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="relative">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-64 object-cover"
                            />
                            <canvas ref={canvasRef} className="hidden" />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                                <Button
                                    onClick={capturePhoto}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    <Camera className="w-4 h-4 mr-2" />
                                    Capture
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={stopCamera}
                                    className="bg-white/90 hover:bg-white"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {photo && (
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="relative">
                            <img
                                src={photo}
                                alt="Incident photo"
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute top-2 right-2">
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={removePhoto}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                                <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Photo Captured
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {isUploading && (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Processing photo...</p>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
}