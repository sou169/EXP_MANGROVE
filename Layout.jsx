import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./src/utils";
import { 
    MapPin, 
    Camera, 
    Trophy, 
    User, 
    Shield,
    Waves,
    TreePine,
    Menu,
    X
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarProvider,
    SidebarTrigger,
} from "./src/components/ui/sidebar";
import { User as UserEntity } from "./src/entities/User";

const navigationItems = [
    {
        title: "Report Incident",
        url: createPageUrl("ReportIncident"),
        icon: Camera,
        color: "text-emerald-600"
    },
    {
        title: "Map View", 
        url: createPageUrl("MapView"),
        icon: MapPin,
        color: "text-blue-600"
    },
    {
        title: "Leaderboard",
        url: createPageUrl("Leaderboard"), 
        icon: Trophy,
        color: "text-amber-600"
    },
    {
        title: "My Profile",
        url: createPageUrl("Profile"),
        icon: User,
        color: "text-purple-600"
    },
    {
        title: "Authority Dashboard",
        url: createPageUrl("AuthorityDashboard"),
        icon: Shield,
        color: "text-red-600"
    }
];

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const currentUser = await UserEntity.me();
            setUser(currentUser);
        } catch (error) {
            // User not authenticated
        }
        setIsLoading(false);
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <style>
                    {`
                        :root {
                            --primary-teal: #0d9488;
                            --primary-blue: #0891b2;
                            --emerald: #059669;
                            --ocean-deep: #164e63;
                            --sea-glass: #f0fdfa;
                            --coral: #f97316;
                        }
                        
                        .ocean-gradient {
                            background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-blue) 100%);
                        }
                        
                        .glass-effect {
                            background: rgba(255, 255, 255, 0.9);
                            backdrop-filter: blur(12px);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }
                        
                        .wave-pattern {
                            background-image: radial-gradient(circle at 20% 80%, rgba(13, 148, 136, 0.1) 0%, transparent 50%),
                                            radial-gradient(circle at 80% 20%, rgba(8, 145, 178, 0.1) 0%, transparent 50%),
                                            radial-gradient(circle at 40% 40%, rgba(5, 150, 105, 0.05) 0%, transparent 50%);
                        }
                    `}
                </style>

                <Sidebar className="border-r-0 shadow-xl ocean-gradient">
                    <SidebarHeader className="border-b border-white/20 p-6">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 glass-effect rounded-2xl flex items-center justify-center">
                                    <TreePine className="w-7 h-7 text-teal-700" />
                                </div>
                                <Waves className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">MangroveWatch</h2>
                                <p className="text-xs text-white/80">Protecting Our Coasts</p>
                            </div>
                        </div>
                    </SidebarHeader>
                    
                    <SidebarContent className="p-4">
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-2">
                                    {navigationItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton 
                                                asChild 
                                                className={`glass-effect hover:bg-white/20 transition-all duration-300 rounded-xl h-12 ${
                                                    location.pathname === item.url ? 'bg-white/20 shadow-lg' : ''
                                                }`}
                                            >
                                                <Link to={item.url} className="flex items-center gap-4 px-4">
                                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                                    <span className="font-medium text-white">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {user && (
                            <SidebarGroup className="mt-8">
                                <div className="glass-effect rounded-2xl p-4">
                                    <div className="text-center text-white">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                            <Trophy className="w-8 h-8 text-amber-300" />
                                        </div>
                                        <h3 className="font-bold text-lg">{user.full_name}</h3>
                                        <p className="text-white/80 text-sm mb-2">{user.badge_level} Guardian</p>
                                        <div className="space-y-1">
                                            <p className="text-2xl font-bold text-amber-300">{user.points || 0}</p>
                                            <p className="text-xs text-white/80">Conservation Points</p>
                                        </div>
                                    </div>
                                </div>
                            </SidebarGroup>
                        )}
                    </SidebarContent>

                    <SidebarFooter className="border-t border-white/20 p-4">
                        <div className="glass-effect rounded-xl p-3 text-center">
                            <p className="text-white/80 text-xs">
                                Together for healthier mangroves
                            </p>
                            <div className="flex justify-center mt-2">
                                <Waves className="w-4 h-4 text-blue-300" />
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 flex flex-col wave-pattern">
                    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 md:hidden sticky top-0 z-40">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-teal-50 p-2 rounded-lg transition-colors duration-200" />
                            <h1 className="text-xl font-bold text-gray-900">MangroveWatch</h1>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}