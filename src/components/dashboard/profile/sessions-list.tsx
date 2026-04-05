"use client";

import { Monitor, Smartphone, MapPin, CheckCircle2, History } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sessions = [
  {
    device: "Google Chrome on Windows",
    location: "CDMX, Mexico",
    status: "active",
    ip: "189.152.xx.xx",
    lastSeen: "Activa ahora"
  },
  {
    device: "Safari on iPhone 15",
    location: "Monterrey, Mexico",
    status: "inactive",
    ip: "187.210.xx.xx",
    lastSeen: "Hace 2 horas"
  },
  {
    device: "Brave Browser on MacOS",
    location: "Guadalajara, Mexico",
    status: "inactive",
    ip: "192.168.xx.xx",
    lastSeen: "Ayer, 10:45 PM"
  }
];

export function SessionsList() {
  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-50 bg-slate-50/50">
        <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Sesiones Activas
        </CardTitle>
        <CardDescription>Sesiones abiertas actualmente con tu cuenta.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 px-0">
        <div className="divide-y divide-slate-50">
          {sessions.map((session, index) => (
            <div key={index} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${session.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                  {session.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900">{session.device}</p>
                    {session.status === 'active' && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[9px] font-black h-4 px-1.5 uppercase tracking-tighter">
                        Activa ahora
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-300" />
                      {session.location}
                    </span>
                    <span className="text-slate-300 pr-1">•</span>
                    <span className="text-xs text-slate-400 font-mono">{session.ip}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400">{session.lastSeen}</p>
                {session.status !== 'active' && (
                  <button className="text-[10px] font-black text-red-500 uppercase tracking-wider mt-1 hover:underline">
                    Cerrar Sesión
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
