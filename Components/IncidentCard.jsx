import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Calendar, MapPin, AlertCircle, Eye } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    verified: "bg-green-100 text-green-800 border-green-300", 
    investigating: "bg-blue-100 text-blue-800 border-blue-300",
    resolved: "bg-gray-100 text-gray-800 border-gray-300"
};

const severityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800"
};

const incidentIcons = {
    illegal_cutting: "🪓",
    waste_dumping: "🗑️", 
    water_pollution: "🛢️",
    coastal_erosion: "🌊",
    illegal_construction: "🏗️",
    other: "⚠️"
};

export default function IncidentCard({ report, onClose }) {
    if (!report) return null;

    const formatIncidentType = (type) => {
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white relative">
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <span className="text-xl">{incidentIcons[report.incident_type]}</span>
                        Incident Details
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-white hover:bg-white/20"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                        src={report.photo_url} 
                        alt="Incident evidence" 
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Badge className={statusColors[report.status]} variant="outline">
                            {report.status.toUpperCase()}
                        </Badge>
                        <Badge className={severityColors[report.severity]}>
                            {report.severity.toUpperCase()}
                        </Badge>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {formatIncidentType(report.incident_type)}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {report.description}
                        </p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{report.location_name || `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(report.created_date), "MMM d, yyyy 'at' h:mm a")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>Reported by: {report.created_by}</span>
                        </div>
                    </div>

                    {report.verified_by && (
                        <div className="pt-2 border-t">
                            <p className="text-xs text-green-600">
                                ✓ Verified by: {report.verified_by}
                            </p>
                        </div>
                    )}
                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(report.photo_url, '_blank')}
                >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Image
                </Button>
            </CardContent>
        </Card>
    );
}