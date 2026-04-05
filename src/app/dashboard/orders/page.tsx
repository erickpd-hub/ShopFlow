"use client";

import { useState, useMemo, useEffect } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type Row
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";

interface Order {
    id: string;
    customer: string;
    email: string;
    date: string;
    total: number;
    status: string;
    tracking: string | null;
    carrier: string | null;
}

export default function OrdersPage() {
    const { t, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const ordersData: Order[] = useMemo(() => [
        {
            id: "#ORD-001",
            customer: "John Doe",
            email: "john@example.com",
            date: "Oct 24, 2023",
            total: 79.99,
            status: t.dashboard.home.orders.shipped,
            tracking: "AS123456789",
            carrier: "UPS"
        },
        {
            id: "#ORD-002",
            customer: "Sarah Smith",
            email: "sarah@example.com",
            date: "Oct 23, 2023",
            total: 120.50,
            status: t.dashboard.home.orders.pending,
            tracking: null,
            carrier: null
        },
        {
            id: "#ORD-003",
            customer: "Mike K.",
            email: "mike@info.com",
            date: "Oct 22, 2023",
            total: 249.00,
            status: language === 'es' ? 'Procesando' : 'Processing',
            tracking: null,
            carrier: null
        },
    ], [t, language]);

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: t.dashboard.ordersPage.table.id,
            cell: ({ row }: { row: Row<Order> }) => <span className="font-bold text-primary">{row.getValue("id")}</span>,
        },
        {
            accessorKey: "customer",
            header: t.dashboard.ordersPage.table.customer,
            cell: ({ row }: { row: Row<Order> }) => (
                <div className="flex flex-col">
                    <div className="font-bold text-foreground">{row.getValue("customer")}</div>
                    <div className="text-[10px] font-black text-color-400 uppercase tracking-widest mt-0.5">{row.original.email}</div>
                </div>
            ),
        },
        {
            accessorKey: "date",
            header: t.dashboard.ordersPage.table.date,
            cell: ({ row }: { row: Row<Order> }) => <span className="font-medium text-color-500">{row.getValue("date")}</span>,
        },
        {
            accessorKey: "total",
            header: t.dashboard.ordersPage.table.total,
            cell: ({ row }: { row: Row<Order> }) => <div className="font-black text-foreground">${row.getValue("total")}</div>,
        },
        {
            accessorKey: "status",
            header: t.dashboard.ordersPage.table.status,
            cell: ({ row }: { row: Row<Order> }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant="secondary" className={`text-[10px] font-black border-none px-3 py-1 rounded-full ${status === t.dashboard.home.orders.shipped ? "bg-primary text-white shadow-lg shadow-primary/10" :
                        status === t.dashboard.home.orders.pending ? "bg-amber-500 text-white shadow-lg shadow-amber-500/10" :
                            status === (language === 'es' ? 'Procesando' : 'Processing') ? "bg-purple-500 text-white shadow-lg shadow-purple-500/10" :
                                "bg-green-500 text-white shadow-lg shadow-green-500/10"
                        }`}>
                        {status}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-color-100 dark:hover:bg-color-800/50 transition-all">
                            <span className="material-symbols-outlined text-lg">more_horiz</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 glass-card border-none shadow-2xl p-2 animate-in fade-in zoom-in-95">
                        <DropdownMenuItem className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-800/50 font-bold px-3 py-2.5">
                            <span className="material-symbols-outlined text-lg">visibility</span> {language === 'es' ? 'Ver detalles' : 'View details'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-2.5">
                            <span className="material-symbols-outlined text-lg">update</span> {language === 'es' ? 'Actualizar estado' : 'Update status'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ], [t, language]);

    const table = useReactTable({
        data: ordersData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">{t.dashboard.ordersPage.title}</h1>
                    <p className="text-color-500 font-medium mt-1">{t.dashboard.ordersPage.subtitle}</p>
                </div>
                <Button variant="ghost" className="h-14 px-6 rounded-2xl gap-3 bg-white dark:bg-color-900/50 font-black shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">download</span>
                    {t.dashboard.ordersPage.export}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="glass-card p-6 shadow-2xl shadow-black/5 relative overflow-hidden group">
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-color-50 dark:bg-color-900/50 flex items-center justify-center animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-color-50 dark:bg-color-900/50 rounded w-16 animate-pulse"></div>
                                    <div className="h-6 bg-color-100 dark:bg-color-800 rounded w-10 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    [
                        { title: t.dashboard.home.orders.pending, value: "12", color: "text-amber-500", icon: "schedule" },
                        { title: language === 'es' ? 'En Tránsito' : 'In Transit', value: "24", color: "text-primary", icon: "local_shipping" },
                        { title: t.dashboard.home.orders.completed, value: "156", color: "text-green-500", icon: "check_circle" },
                    ].map((stat) => (
                        <div key={stat.title} className="glass-card p-6 shadow-2xl shadow-black/5 relative overflow-hidden group">
                            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-color-900/50 flex items-center justify-center shadow-sm ${stat.color}`}>
                                    <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-color-400 uppercase tracking-widest">{stat.title}</p>
                                    <p className="text-2xl font-black text-foreground">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="glass-card shadow-2xl shadow-black/5 overflow-hidden">
                <div className="p-8 bg-white/40 dark:bg-color-900/20 border-b border-color-50 dark:border-color-900/50">
                    <div className="flex items-center gap-6">
                        <div className="relative flex-1 group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-color-400 group-focus-within:text-primary transition-colors">search</span>
                            <Input
                                placeholder={t.dashboard.ordersPage.search}
                                className="w-full bg-white dark:bg-color-900/50 border-none rounded-2xl py-6 pl-12 pr-4 text-sm font-medium focus:outline-none shadow-sm shadow-black/5 focus:shadow-lg focus:shadow-primary/5 transition-all"
                            />
                        </div>
                        <Button variant="ghost" className="h-14 px-6 rounded-2xl gap-3 bg-white dark:bg-color-900/50 font-black shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">filter_list</span>
                            {language === 'es' ? 'Filtros' : 'Filters'}
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-color-50/30 dark:bg-color-950/30 border-b border-color-50 dark:border-color-900/50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className="px-8 py-5 text-left font-black text-color-400 uppercase tracking-widest text-[10px] whitespace-nowrap">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-color-50 dark:divide-color-900/50">
                            {isLoading ? (
                                [1, 2, 3].map((i) => (
                                    <tr key={i}>
                                        <td className="px-8 py-5"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded w-16 animate-pulse"></div></td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-2">
                                                <div className="h-4 bg-color-50 dark:bg-color-900/50 rounded w-24 animate-pulse"></div>
                                                <div className="h-3 bg-color-50 dark:bg-color-900/50 rounded w-32 animate-pulse"></div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded w-20 animate-pulse"></div></td>
                                        <td className="px-8 py-5"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded w-16 animate-pulse"></div></td>
                                        <td className="px-8 py-5"><div className="h-6 mx-auto bg-color-50 dark:bg-color-900/50 rounded-full w-24 animate-pulse"></div></td>
                                        <td className="px-8 py-5"><div className="h-10 w-10 mx-auto bg-color-50 dark:bg-color-900/50 rounded-xl animate-pulse"></div></td>
                                    </tr>
                                ))
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="group hover:bg-primary/5 transition-all cursor-pointer animate-in fade-in">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-8 py-5">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-8 py-6 flex items-center justify-between border-t border-color-50 dark:border-color-900/50 bg-color-50/10 text-[10px] font-black text-color-400 uppercase tracking-widest">
                    <div>{t.dashboard.products.pagination.showing} {ordersData.length} {language === 'es' ? 'pedidos' : 'orders'}</div>
                    <div className="flex gap-3">
                        <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-[10px] font-black bg-white dark:bg-color-900/50 shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer disabled:opacity-30 uppercase tracking-widest">{t.dashboard.products.pagination.previous}</Button>
                        <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-[10px] font-black bg-white dark:bg-color-900/50 shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer disabled:opacity-30 uppercase tracking-widest">{t.dashboard.products.pagination.next}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
