import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Card, CardContent } from '../src/components/ui/card';
import { getLocationFromCoordinates } from '../src/integrations/Core';

export default function LocationCapture({ onLocationCapture, currentLocation }) {
    const [location, setLocation] = useState(currentLocation);
    const [isCapturing, setIsCapturing] = useState(false);
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (currentLocation) {
            setLocation(currentLocation);
            setAddress(currentLocation.address || '');
        }
    }, [currentLocation]);

    const getCurrentLocation = () => {
        setIsCapturing(true);
        setError('');

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsCapturing(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const newLocation = { latitude, longitude };
                
                try {
                    // Get address from coordinates
                    const locationData = await getLocationFromCoordinates(latitude, longitude);
                    newLocation.address = locationData.address;
                    setAddress(locationData.address);
                } catch (error) {
                    newLocation.address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    setAddress(newLocation.address);
                }

                setLocation(newLocation);
                onLocationCapture(newLocation);
                setIsCapturing(false);
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied. Please enable location services.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }
                setError(errorMessage);
                setIsCapturing(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    };

    const clearLocation = () => {
        setLocation(null);
        setAddress('');
        onLocationCapture(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Location Capture</span>
            </div>

            {!location && (
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                    <CardContent className="p-8 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Capture GPS Location
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Get your current location to pinpoint the incident
                                </p>
                            </div>
                            <Button
                                onClick={getCurrentLocation}
                                disabled={isCapturing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isCapturing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Getting Location...
                                    </>
                                ) : (
                                    <>
                                        <Navigation className="w-4 h-4 mr-2" />
                                        Get My Location
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {location && (
                <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-green-800">Location Captured</span>
                                </div>
                                
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Coordinates:</span>
                                        <p className="text-sm text-gray-600">
                                            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                                        </p>
                                    </div>
                                    
                                    {address && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">Address:</span>
                                            <p className="text-sm text-gray-600">{address}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearLocation}
                                className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                            >
                                Clear
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                    <p className="text-red-600 text-xs mt-1">
                        You can manually enter coordinates or try again later.
                    </p>
                </div>
            )}

            {location && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin className="w-3 h-3 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-blue-800 text-sm font-medium">Location Verified</p>
                            <p className="text-blue-600 text-xs mt-1">
                                This location will be used to map the incident and alert nearby authorities.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}