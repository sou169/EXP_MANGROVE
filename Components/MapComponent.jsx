import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Loader2, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const severityColors = {
    low: "#3b82f6",      // blue
    medium: "#f59e0b",   // amber  
    high: "#f97316",     // orange
    critical: "#ef4444"  // red
};

const statusColors = {
    pending: "#eab308",     // yellow
    verified: "#10b981",    // emerald
    investigating: "#3b82f6", // blue
    resolved: "#6b7280"     // gray
};

// Custom marker component
const CustomMarker = ({ report, onMarkerClick }) => {
    const getMarkerIcon = (severity, status) => {
        const color = severityColors[severity] || severityColors.medium;
        const borderColor = statusColors[status] || statusColors.pending;
        
        return L.divIcon({
            html: `<div style="
                width: ${severity === 'critical' ? '24px' : severity === 'high' ? '20px' : severity === 'medium' ? '16px' : '12px'};
                height: ${severity === 'critical' ? '24px' : severity === 'high' ? '20px' : severity === 'medium' ? '16px' : '12px'};
                background-color: ${color};
                border: 3px solid ${borderColor};
                border-radius: 50%;
                opacity: 0.8;
            "></div>`,
            className: 'custom-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

    if (!report.latitude || !report.longitude) return null;

    return (
        <Marker
            position={[report.latitude, report.longitude]}
            icon={getMarkerIcon(report.severity, report.status)}
            eventHandlers={{
                click: () => onMarkerClick(report)
            }}
        >
            <Popup>
                <div className="p-2">
                    <h3 className="font-semibold text-sm mb-1">
                        {report.incident_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                    <div className="flex gap-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                            report.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            report.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                            {report.severity}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                            report.status === 'verified' ? 'bg-green-100 text-green-800' :
                            report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                            report.status === 'resolved' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                            {report.status}
                        </span>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default function MapComponent({ reports, onMarkerClick, selectedReport, isLoading }) {
    const [mapCenter, setMapCenter] = useState([10.0, 105.0]); // Default to SE Asia
    const [mapZoom, setMapZoom] = useState(8);

    useEffect(() => {
        if (reports.length > 0) {
            // Calculate center of all reports
            const validReports = reports.filter(r => r.latitude && r.longitude);
            if (validReports.length > 0) {
                const avgLat = validReports.reduce((sum, r) => sum + r.latitude, 0) / validReports.length;
                const avgLng = validReports.reduce((sum, r) => sum + r.longitude, 0) / validReports.length;
                setMapCenter([avgLat, avgLng]);
                setMapZoom(validReports.length === 1 ? 15 : 10);
            }
        }
    }, [reports]);

    useEffect(() => {
        if (selectedReport && selectedReport.latitude && selectedReport.longitude) {
            setMapCenter([selectedReport.latitude, selectedReport.longitude]);
            setMapZoom(16);
        }
    }, [selectedReport]);

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading incident reports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {reports.map((report) => (
                    <CustomMarker
                        key={report.id}
                        report={report}
                        onMarkerClick={onMarkerClick}
                    />
                ))}
            </MapContainer>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-[1000]">
                <h4 className="font-semibold text-sm mb-3">Legend</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Critical Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span>High Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Medium Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Low Severity</span>
                    </div>
                </div>
                <div className="mt-3 pt-2 border-t text-xs text-gray-500">
                    Border colors indicate status
                </div>
            </div>

            {reports.length === 0 && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-[1000]">
                    <div className="text-center">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No incidents to display</p>
                    </div>
                </div>
            )}
        </div>
    );
}