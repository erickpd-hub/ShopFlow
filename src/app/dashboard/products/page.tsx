"use client";

import { useState, useMemo, useEffect } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
    type Row,
    type SortingState,
    type ColumnFiltersState
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ColorVariant {
    color: string;      // hex
    colorName: string;  // label
    sizes: Record<string, number>; // size → stock
}

interface Collection {
    id: string;
    name: string;
    description: string;
    productCount: number;
    color: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    status: string;
    category: string;
    collection: string;
    isMultiColor: boolean;
    colors: ColorVariant[];
    sizes: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLLECTION_COLORS = [
    "bg-violet-500", "bg-blue-500", "bg-emerald-500",
    "bg-amber-500", "bg-rose-500", "bg-cyan-500", "bg-orange-500",
];

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PRESET_COLORS = [
    { hex: "#111827", name: "Negro" },
    { hex: "#ffffff", name: "Blanco" },
    { hex: "#ef4444", name: "Rojo" },
    { hex: "#3b82f6", name: "Azul" },
    { hex: "#22c55e", name: "Verde" },
    { hex: "#f59e0b", name: "Amarillo" },
    { hex: "#8b5cf6", name: "Morado" },
    { hex: "#ec4899", name: "Rosa" },
    { hex: "#6b7280", name: "Gris" },
    { hex: "#92400e", name: "Café" },
];

const inputCls = "flex h-10 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
const selectCls = "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

// ─── Color Variant Editor ─────────────────────────────────────────────────────

function ColorVariantEditor({
    colors,
    sizes,
    onChange,
}: {
    colors: ColorVariant[];
    sizes: string[];
    onChange: (colors: ColorVariant[]) => void;
}) {
    const [activeColorIdx, setActiveColorIdx] = useState(0);

    function addColor(hex: string, name: string) {
        if (colors.find(c => c.color === hex)) return;
        const newColor: ColorVariant = {
            color: hex,
            colorName: name,
            sizes: Object.fromEntries(sizes.map(s => [s, 0])),
        };
        onChange([...colors, newColor]);
        setActiveColorIdx(colors.length);
    }

    function removeColor(idx: number) {
        const next = colors.filter((_, i) => i !== idx);
        onChange(next);
        setActiveColorIdx(Math.max(0, idx - 1));
    }

    function updateStock(colorIdx: number, size: string, value: number) {
        const updated = colors.map((c, i) =>
            i === colorIdx ? { ...c, sizes: { ...c.sizes, [size]: value } } : c
        );
        onChange(updated);
    }

    const active = colors[activeColorIdx];

    return (
        <div className="space-y-4">
            {/* Palette selector */}
            <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Agregar colores</p>
                <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map(pc => {
                        const already = !!colors.find(c => c.color === pc.hex);
                        return (
                            <button
                                key={pc.hex}
                                type="button"
                                title={pc.name}
                                onClick={() => !already && addColor(pc.hex, pc.name)}
                                className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${already ? "opacity-30 cursor-not-allowed border-transparent" : "border-transparent hover:scale-110 hover:border-primary"}`}
                                style={{ backgroundColor: pc.hex }}
                            />
                        );
                    })}
                </div>
            </div>

            {colors.length === 0 && (
                <p className="text-xs text-muted-foreground italic text-center py-2">
                    Selecciona colores de la paleta para empezar.
                </p>
            )}

            {colors.length > 0 && (
                <>
                    {/* Color tabs */}
                    <div className="flex flex-wrap gap-1.5">
                        {colors.map((c, i) => (
                            <button
                                key={c.color}
                                type="button"
                                onClick={() => setActiveColorIdx(i)}
                                className={`flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full border transition-all cursor-pointer ${activeColorIdx === i ? "border-primary bg-primary/10 text-primary" : "border-input bg-background hover:border-primary/50"}`}
                            >
                                <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: c.color }} />
                                {c.colorName}
                                <span
                                    onClick={e => { e.stopPropagation(); removeColor(i); }}
                                    className="ml-0.5 hover:text-red-500 cursor-pointer"
                                >×</span>
                            </button>
                        ))}
                    </div>

                    {/* Stock per size for active color */}
                    {active && (
                        <div className="border border-input rounded-xl overflow-hidden">
                            <div className="flex items-center gap-2 bg-muted/40 px-4 py-2.5 border-b border-input">
                                <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: active.color }} />
                                <span className="text-xs font-black">{active.colorName}</span>
                                <span className="text-xs text-muted-foreground">— stock por talla</span>
                            </div>
                            <div className="grid p-4 gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(sizes.length, 3)}, 1fr)` }}>
                                {sizes.map(size => (
                                    <div key={size} className="flex flex-col gap-1">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{size}</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={active.sizes[size] ?? 0}
                                            onChange={e => updateStock(activeColorIdx, size, parseInt(e.target.value) || 0)}
                                            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1.5 text-sm text-center font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-t border-input">
                                <span className="text-[10px] text-muted-foreground font-medium">Total {active.colorName}</span>
                                <span className="text-xs font-black text-primary">
                                    {Object.values(active.sizes).reduce((a, b) => a + b, 0)} u.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Summary table */}
                    <div className="rounded-xl border border-input overflow-hidden">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="bg-muted/40 border-b border-input">
                                    <th className="text-left px-3 py-2 font-black text-muted-foreground uppercase tracking-widest text-[9px]">Color</th>
                                    {sizes.map(s => (
                                        <th key={s} className="text-center px-2 py-2 font-black text-muted-foreground uppercase tracking-widest text-[9px]">{s}</th>
                                    ))}
                                    <th className="text-center px-3 py-2 font-black text-muted-foreground uppercase tracking-widest text-[9px]">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-input">
                                {colors.map(c => (
                                    <tr key={c.color} className="hover:bg-muted/20">
                                        <td className="px-3 py-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.color }} />
                                                <span className="font-semibold truncate max-w-[60px]">{c.colorName}</span>
                                            </div>
                                        </td>
                                        {sizes.map(s => (
                                            <td key={s} className="text-center px-2 py-2 font-medium">{c.sizes[s] ?? 0}</td>
                                        ))}
                                        <td className="text-center px-3 py-2 font-black text-primary">
                                            {Object.values(c.sizes).reduce((a, b) => a + b, 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Image Uploader ─────────────────────────────────────────────────────────

function ImageUploader({
    mainImage,
    secondaryImages,
    onMainChange,
    onSecondaryChange,
}: {
    mainImage: string | null;
    secondaryImages: string[];
    onMainChange: (src: string | null) => void;
    onSecondaryChange: (imgs: string[]) => void;
}) {
    function readFile(file: File): Promise<string> {
        return new Promise(res => {
            const reader = new FileReader();
            reader.onload = e => res(e.target?.result as string);
            reader.readAsDataURL(file);
        });
    }

    async function handleMainDrop(e: React.DragEvent) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) onMainChange(await readFile(file));
    }

    async function handleMainInput(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) onMainChange(await readFile(file));
    }

    async function handleSecondaryInput(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? []);
        const results = await Promise.all(files.map(readFile));
        onSecondaryChange([...secondaryImages, ...results]);
    }

    function removeSecondary(idx: number) {
        onSecondaryChange(secondaryImages.filter((_, i) => i !== idx));
    }

    return (
        <div className="space-y-4">
            {/* Main image */}
            <div>
                <label className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-base text-primary">photo_camera</span>
                    Imagen principal
                    <span className="text-muted-foreground font-normal text-xs">(portada de la tarjeta)</span>
                </label>
                <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleMainDrop}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all cursor-pointer group overflow-hidden ${mainImage ? "border-primary/30 bg-primary/5" : "border-input hover:border-primary/50 hover:bg-muted/30"
                        }`}
                    style={{ minHeight: mainImage ? "auto" : "160px" }}
                >
                    {mainImage ? (
                        <div className="relative w-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={mainImage} alt="Principal" className="w-full max-h-[280px] object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-xl">
                                <label className="flex items-center gap-1.5 text-[11px] font-black text-white bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-colors">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    Cambiar
                                    <input type="file" accept="image/*" className="hidden" onChange={handleMainInput} />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => onMainChange(null)}
                                    className="flex items-center gap-1.5 text-[11px] font-black text-white bg-red-500/80 px-3 py-2 rounded-xl cursor-pointer hover:bg-red-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Eliminar
                                </button>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-black px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-[11px] filled">star</span>
                                Principal
                            </div>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center gap-3 cursor-pointer py-10 px-6 w-full">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-2xl text-primary">add_photo_alternate</span>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold">Arrastra una imagen o haz clic</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP · Máx. 10MB</p>
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handleMainInput} />
                        </label>
                    )}
                </div>
            </div>

            {/* Secondary images */}
            <div>
                <label className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-base text-muted-foreground">photo_library</span>
                    Imágenes secundarias
                    <span className="text-muted-foreground font-normal text-xs">(galería del producto)</span>
                </label>
                <div className="flex flex-wrap gap-3">
                    {secondaryImages.map((src, i) => (
                        <div key={i} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-input">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt={`Secundaria ${i + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => removeSecondary(i)}
                                    className="text-white hover:text-red-400 cursor-pointer transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                                #{i + 1}
                            </span>
                        </div>
                    ))}

                    {/* Add more button */}
                    <label className="w-24 h-24 rounded-xl border-2 border-dashed border-input hover:border-primary/50 hover:bg-muted/30 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all group">
                        <span className="material-symbols-outlined text-xl text-muted-foreground group-hover:text-primary transition-colors">add_photo_alternate</span>
                        <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors">Agregar</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleSecondaryInput} />
                    </label>
                </div>
                {secondaryImages.length > 0 && (
                    <p className="text-[10px] text-muted-foreground mt-2">{secondaryImages.length} imagen{secondaryImages.length !== 1 ? "es" : ""} secundaria{secondaryImages.length !== 1 ? "s" : ""}</p>
                )}
            </div>
        </div>
    );
}

// ─── Add / Edit Product Modal Content ─────────────────────────────────────────

function ProductForm({
    initial,
    collections,
    onClose,
}: {
    initial?: Partial<Product>;
    collections: Collection[];
    onClose: () => void;
}) {
    const [isMultiColor, setIsMultiColor] = useState(initial?.isMultiColor ?? false);
    const [colors, setColors] = useState<ColorVariant[]>(initial?.colors ?? []);
    const [sizesInput, setSizesInput] = useState((initial?.sizes ?? DEFAULT_SIZES).join(", "));
    const [collection, setCollection] = useState(initial?.collection ?? "");
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [secondaryImages, setSecondaryImages] = useState<string[]>([]);

    const sizes = sizesInput.split(",").map(s => s.trim()).filter(Boolean);

    // Sync sizes into existing color variants when sizes change
    const syncedColors = colors.map(c => ({
        ...c,
        sizes: Object.fromEntries(sizes.map(s => [s, c.sizes[s] ?? 0])),
    }));

    const totalStock = isMultiColor
        ? syncedColors.reduce((total, c) => total + Object.values(c.sizes).reduce((a, b) => a + b, 0), 0)
        : 0;

    return (
        <div className="grid gap-5 py-4">
            {/* ─ Images ─ */}
            <ImageUploader
                mainImage={mainImage}
                secondaryImages={secondaryImages}
                onMainChange={setMainImage}
                onSecondaryChange={setSecondaryImages}
            />

            <div className="h-px bg-border" />
            {/* Basic info */}
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2 col-span-2 sm:col-span-1">
                    <label className="text-sm font-semibold">Nombre del producto</label>
                    <input defaultValue={initial?.name} className={inputCls} placeholder="Ej. Camiseta Vintage" />
                </div>
                <div className="grid gap-2 col-span-2 sm:col-span-1">
                    <label className="text-sm font-semibold">Categoría</label>
                    <input defaultValue={initial?.category} className={inputCls} placeholder="Ej. Ropa, Electrónica" />
                </div>
            </div>

            {/* Collection */}
            <div className="grid gap-2">
                <label className="text-sm font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">layers</span>
                    Colección <span className="text-muted-foreground font-normal">(Opcional)</span>
                </label>
                <select className={selectCls} value={collection} onChange={e => setCollection(e.target.value)}>
                    <option value="">— Sin colección —</option>
                    {collections.map(col => (
                        <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div className="grid gap-2">
                <label className="text-sm font-semibold">Descripción</label>
                <textarea className={`${inputCls} min-h-[70px] resize-none`} placeholder="Describe los detalles principales de tu producto..." />
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <label className="text-sm font-semibold">Precio</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <input defaultValue={initial?.price} type="number" className={`${inputCls} pl-7`} placeholder="0.00" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-semibold">Precio anterior <span className="text-muted-foreground font-normal">(Comparativa)</span></label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <input type="number" className={`${inputCls} pl-7`} placeholder="0.00" />
                    </div>
                </div>
            </div>

            {/* ─ Color mode toggle ─ */}
            <div className="rounded-2xl border border-input p-4 space-y-4 bg-muted/10">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold">Colores del producto</p>
                        <p className="text-xs text-muted-foreground mt-0.5">¿Este producto está disponible en diferentes colores?</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMultiColor(v => !v)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer border-2 border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isMultiColor ? "bg-primary" : "bg-input"}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${isMultiColor ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                </div>

                {!isMultiColor ? (
                    /* Single color: just a stock field */
                    <div className="grid gap-2">
                        <label className="text-sm font-semibold">Stock disponible (un solo color)</label>
                        <input defaultValue={initial?.stock} type="number" className={inputCls} placeholder="0" min="0" />
                    </div>
                ) : (
                    /* Multi-color variant editor */
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-semibold flex items-center gap-1.5">
                                Tallas disponibles
                                <span className="text-muted-foreground font-normal text-xs">(separadas por coma)</span>
                            </label>
                            <input
                                className={inputCls}
                                value={sizesInput}
                                onChange={e => setSizesInput(e.target.value)}
                                placeholder="Ej. XS, S, M, L, XL"
                            />
                        </div>

                        <ColorVariantEditor
                            colors={syncedColors}
                            sizes={sizes}
                            onChange={setColors}
                        />

                        {syncedColors.length > 0 && (
                            <div className="flex items-center justify-between px-4 py-3 bg-primary/5 rounded-xl border border-primary/20">
                                <span className="text-xs font-bold text-primary">Stock total (todos los colores y tallas)</span>
                                <span className="text-sm font-black text-primary">{totalStock} u.</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
    const { t } = useLanguage();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
    const [activeCollectionFilter, setActiveCollectionFilter] = useState<string>("all");
    const [newCollectionName, setNewCollectionName] = useState("");
    const [newCollectionDesc, setNewCollectionDesc] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const [collections, setCollections] = useState<Collection[]>([
        { id: "c1", name: "Temporada Verano", description: "Productos de verano 2024", productCount: 2, color: "bg-amber-500" },
        { id: "c2", name: "Gaming", description: "Todo para gamers", productCount: 1, color: "bg-violet-500" },
        { id: "c3", name: "Premium Audio", description: "Audio de alta calidad", productCount: 1, color: "bg-blue-500" },
        { id: "c4", name: "Street Style", description: "Ropa urbana y casual", productCount: 1, color: "bg-emerald-500" },
    ]);

    const [data] = useState<Product[]>([
        {
            id: "1", name: "DualSense Wireless Controller", price: 79.99, stock: 24,
            status: "Activo", category: "Gaming", collection: "c2",
            isMultiColor: false,
            colors: [],
            sizes: [],
        },
        {
            id: "2", name: "Coming Home Vinyl", price: 49.99, stock: 12,
            status: "Sin Stock", category: "Music", collection: "",
            isMultiColor: false, colors: [], sizes: [],
        },
        {
            id: "3", name: "Snow Jacket", price: 139.99, stock: 0,
            status: "Activo", category: "Fashion", collection: "c4",
            isMultiColor: true,
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: [
                { color: "#111827", colorName: "Negro", sizes: { XS: 3, S: 5, M: 8, L: 4, XL: 2 } },
                { color: "#ffffff", colorName: "Blanco", sizes: { XS: 2, S: 4, M: 6, L: 3, XL: 1 } },
                { color: "#ef4444", colorName: "Rojo", sizes: { XS: 1, S: 2, M: 4, L: 2, XL: 0 } },
            ],
        },
        {
            id: "4", name: "Noise Cancel H-P", price: 249.00, stock: 15,
            status: "Activo", category: "Audio", collection: "c3",
            isMultiColor: true,
            sizes: ["Única"],
            colors: [
                { color: "#111827", colorName: "Negro", sizes: { Única: 10 } },
                { color: "#ffffff", colorName: "Blanco", sizes: { Única: 5 } },
            ],
        },
        {
            id: "5", name: "Ultra Soft Sneakers", price: 120.50, stock: 30,
            status: "Borrador", category: "Footwear", collection: "c1",
            isMultiColor: false, colors: [], sizes: [],
        },
    ]);

    const filteredData = useMemo(() => {
        if (activeCollectionFilter === "all") return data;
        if (activeCollectionFilter === "none") return data.filter(p => !p.collection);
        return data.filter(p => p.collection === activeCollectionFilter);
    }, [data, activeCollectionFilter]);

    const getCollectionById = (id: string) => collections.find(c => c.id === id);

    function handleCreateCollection() {
        if (!newCollectionName.trim()) return;
        const colorIndex = collections.length % COLLECTION_COLORS.length;
        setCollections(prev => [...prev, {
            id: `c${Date.now()}`,
            name: newCollectionName.trim(),
            description: newCollectionDesc.trim(),
            productCount: 0,
            color: COLLECTION_COLORS[colorIndex],
        }]);
        setNewCollectionName("");
        setNewCollectionDesc("");
        setIsCollectionDialogOpen(false);
    }

    function getStockDisplay(p: Product) {
        if (!p.isMultiColor) return p.stock;
        return p.colors.reduce((t, c) => t + Object.values(c.sizes).reduce((a, b) => a + b, 0), 0);
    }

    const columns = useMemo(() => [
        {
            accessorKey: "name",
            header: t.dashboard.products.table.product,
            cell: ({ row }: { row: Row<Product> }) => {
                const col = getCollectionById(row.original.collection);
                const p = row.original;
                return (
                    <div className="flex items-center gap-4">
                        <div className="bg-color-50 dark:bg-color-900/50 h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                            <span className="material-symbols-outlined text-color-400 text-xl font-light">image</span>
                        </div>
                        <div>
                            <div className="font-bold text-foreground">{row.getValue("name")}</div>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                <span className="text-[10px] font-black text-color-400 uppercase tracking-widest">{p.category}</span>
                                {p.isMultiColor && p.colors.length > 0 && (
                                    <div className="flex items-center gap-0.5">
                                        {p.colors.slice(0, 5).map(c => (
                                            <span key={c.color} title={c.colorName} className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: c.color }} />
                                        ))}
                                        {p.colors.length > 5 && <span className="text-[9px] text-color-400 font-black">+{p.colors.length - 5}</span>}
                                    </div>
                                )}
                                {col && (
                                    <span className={`inline-flex items-center gap-1 text-[9px] font-black text-white px-2 py-0.5 rounded-full ${col.color}`}>
                                        <span className="material-symbols-outlined text-[10px]">layers</span>
                                        {col.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "status",
            header: t.dashboard.products.table.status,
            cell: ({ row }: { row: Row<Product> }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant="secondary" className={`text-[10px] font-black border-none px-3 py-1 rounded-full ${status === "Activo" ? "bg-green-500 text-white shadow-lg shadow-green-500/10"
                        : status === "Sin Stock" ? "bg-red-500 text-white shadow-lg shadow-red-500/10"
                            : "bg-color-500 text-white shadow-lg shadow-color-500/10"
                        }`}>
                        {status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "price",
            header: t.dashboard.products.table.price,
            cell: ({ row }: { row: Row<Product> }) => (
                <div className="font-black text-foreground">${row.getValue("price")}</div>
            ),
        },
        {
            accessorKey: "stock",
            header: t.dashboard.products.table.stock,
            cell: ({ row }: { row: Row<Product> }) => {
                const p = row.original;
                const total = getStockDisplay(p);
                return (
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">{total}</span>
                            <span className="text-[10px] font-black text-color-400 uppercase">u.</span>
                        </div>
                        {p.isMultiColor && p.colors.length > 0 && (
                            <span className="text-[9px] text-color-400">{p.colors.length} colores</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }: { row: Row<Product> }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-color-100 dark:hover:bg-color-800/50 transition-all">
                            <span className="material-symbols-outlined text-lg">more_horiz</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 glass-card border-none shadow-2xl p-2 animate-in fade-in zoom-in-95">
                        <DropdownMenuLabel className="text-[10px] font-black text-color-400 uppercase tracking-widest px-3 py-2">
                            {t.dashboard.products.actions.title}
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-2.5 cursor-pointer"
                            onClick={() => { setSelectedProduct(row.original); setIsEditDialogOpen(true); }}
                        >
                            <span className="material-symbols-outlined text-lg">edit</span>
                            {t.dashboard.products.actions.edit}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 rounded-lg focus:bg-primary/10 text-primary font-bold px-3 py-2.5">
                            <span className="material-symbols-outlined text-lg filled">sparkles</span>
                            {t.dashboard.products.actions.improveIA}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-color-50 dark:bg-color-900/50 my-1" />
                        <DropdownMenuItem className="gap-3 rounded-lg focus:bg-red-50 dark:focus:bg-red-950/30 text-red-500 font-bold px-3 py-2.5">
                            <span className="material-symbols-outlined text-lg">delete</span>
                            {t.dashboard.products.actions.delete}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ], [t, collections]);

    const table = useReactTable({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">{t.dashboard.products.title}</h1>
                    <p className="text-color-500 font-medium mt-1">{t.dashboard.products.subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Create Collection */}
                    <Dialog open={isCollectionDialogOpen} onOpenChange={setIsCollectionDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-auto px-5 py-3 rounded-2xl font-black flex items-center gap-2 border border-color-200 dark:border-color-800 hover:bg-color-50 dark:hover:bg-color-900 transition-colors cursor-pointer shadow-sm text-sm">
                                <span className="material-symbols-outlined text-lg">layers</span>
                                Nueva Colección
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[480px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">layers</span>
                                    Crear Colección
                                </DialogTitle>
                                <DialogDescription>Agrupa tus productos en colecciones para facilitar la navegación.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-5 py-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold">Nombre de la colección</label>
                                    <input className={inputCls} placeholder="Ej. Temporada Verano, Ofertas..." value={newCollectionName} onChange={e => setNewCollectionName(e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold">Descripción <span className="text-muted-foreground font-normal">(Opcional)</span></label>
                                    <textarea className={`${inputCls} min-h-[80px] resize-none`} placeholder="Describe brevemente esta colección..." value={newCollectionDesc} onChange={e => setNewCollectionDesc(e.target.value)} />
                                </div>
                                {collections.length > 0 && (
                                    <div className="grid gap-2">
                                        <label className="text-sm font-semibold text-muted-foreground">Colecciones existentes</label>
                                        <div className="flex flex-wrap gap-2">
                                            {collections.map(col => (
                                                <span key={col.id} className={`inline-flex items-center gap-1.5 text-[11px] font-black text-white px-3 py-1.5 rounded-full ${col.color}`}>
                                                    <span className="material-symbols-outlined text-[12px]">layers</span>
                                                    {col.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => setIsCollectionDialogOpen(false)}>Cancelar</Button>
                                <Button type="button" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6" onClick={handleCreateCollection} disabled={!newCollectionName.trim()}>Crear Colección</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Add Product */}
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer shadow-xl shadow-black/5 h-auto text-sm border-none">
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                {t.dashboard.products.add}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{t.dashboard.products.add}</DialogTitle>
                                <DialogDescription>Completa los detalles para añadir un nuevo producto.</DialogDescription>
                            </DialogHeader>
                            <ProductForm collections={collections} onClose={() => setIsAddDialogOpen(false)} />
                            <DialogFooter>
                                <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                                <Button type="button" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6" onClick={() => setIsAddDialogOpen(false)}>Guardar Producto</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>


            {/* Table */}
            <div className="glass-card shadow-2xl shadow-black/5 overflow-hidden">
                <div className="p-8 bg-white/40 dark:bg-color-900/20 border-b border-color-50 dark:border-color-900/50">
                    <div className="flex items-center gap-6">
                        <div className="relative flex-1 group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-color-400 group-focus-within:text-primary transition-colors">search</span>
                            <Input
                                placeholder={t.dashboard.products.filter}
                                className="w-full bg-white dark:bg-color-900/50 border-none rounded-2xl py-6 pl-12 pr-4 text-sm font-medium focus:outline-none shadow-sm shadow-black/5 focus:shadow-lg focus:shadow-primary/5 transition-all"
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={e => table.getColumn("name")?.setFilterValue(e.target.value)}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-14 px-6 rounded-2xl gap-3 bg-white dark:bg-color-900/50 font-black shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer shrink-0">
                                    <span className="material-symbols-outlined">layers</span>
                                    {activeCollectionFilter === "all" ? "Colecciones" : activeCollectionFilter === "none" ? "Sin colección" : collections.find(c => c.id === activeCollectionFilter)?.name ?? "Colecciones"}
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 glass-card border-none shadow-2xl p-2 animate-in fade-in zoom-in-95">
                                <DropdownMenuLabel className="text-[10px] font-black text-color-400 uppercase tracking-widest px-3 py-2">Filtrar por colección</DropdownMenuLabel>
                                <DropdownMenuItem className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-2.5 cursor-pointer" onClick={() => setActiveCollectionFilter("all")}>
                                    <span className="material-symbols-outlined text-lg">grid_view</span>
                                    Todos los productos
                                    {activeCollectionFilter === "all" && <span className="material-symbols-outlined text-primary ml-auto text-sm">check</span>}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-color-50 dark:bg-color-900/50 my-1" />
                                {collections.map(col => (
                                    <DropdownMenuItem key={col.id} className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-2.5 cursor-pointer" onClick={() => setActiveCollectionFilter(col.id)}>
                                        <span className={`w-3 h-3 rounded-full ${col.color} shrink-0`} />
                                        {col.name}
                                        <span className="ml-auto text-[10px] text-color-400 font-black">{data.filter(p => p.collection === col.id).length}</span>
                                        {activeCollectionFilter === col.id && <span className="material-symbols-outlined text-primary text-sm">check</span>}
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator className="bg-color-50 dark:bg-color-900/50 my-1" />
                                <DropdownMenuItem className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-2.5 cursor-pointer" onClick={() => setActiveCollectionFilter("none")}>
                                    <span className="material-symbols-outlined text-lg text-color-400">label_off</span>
                                    Sin colección
                                    {activeCollectionFilter === "none" && <span className="material-symbols-outlined text-primary ml-auto text-sm">check</span>}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-color-50/30 dark:bg-color-950/30 border-b border-color-50 dark:border-color-900/50">
                            {table.getHeaderGroups().map(hg => (
                                <tr key={hg.id}>
                                    {hg.headers.map(header => (
                                        <th key={header.id} className="px-8 py-5 text-left font-black text-color-400 uppercase tracking-widest text-[10px] whitespace-nowrap">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-color-50 dark:divide-color-900/50">
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map(i => (
                                    <tr key={i}>
                                        <td className="px-8 py-5"><div className="flex items-center gap-4"><div className="bg-color-50 dark:bg-color-900/50 h-12 w-12 rounded-2xl animate-pulse" /><div><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded w-32 animate-pulse" /><div className="h-3 bg-color-50 dark:bg-color-900/50 rounded w-16 mt-2 animate-pulse" /></div></div></td>
                                        <td className="px-8 py-5"><div className="h-6 bg-color-50 dark:bg-color-900/50 rounded-full w-20 animate-pulse" /></td>
                                        <td className="px-8 py-5"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded w-12 animate-pulse" /></td>
                                        <td className="px-8 py-5"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded w-8 animate-pulse" /></td>
                                        <td className="px-8 py-5"><div className="h-10 w-10 bg-color-50 dark:bg-color-900/50 rounded-xl animate-pulse" /></td>
                                    </tr>
                                ))
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row: Row<Product>) => (
                                    <tr key={row.id} className="group hover:bg-primary/5 transition-all cursor-pointer animate-in fade-in">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-8 py-5 align-middle">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="h-32 text-center text-color-400 font-medium">
                                        No hay productos en esta colección.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-8 py-6 border-t border-color-50 dark:border-color-900/50 bg-color-50/10">
                    <div className="text-[10px] font-black text-color-400 uppercase tracking-widest">
                        {t.dashboard.products.pagination.showing} {table.getRowModel().rows.length} {t.dashboard.products.pagination.of} {filteredData.length} {t.dashboard.products.pagination.products}
                    </div>
                    <div className="flex gap-3">
                        <Button variant="ghost" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="h-10 px-4 rounded-xl text-[10px] font-black bg-white dark:bg-color-900/50 shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer disabled:opacity-30 uppercase tracking-widest">
                            {t.dashboard.products.pagination.previous}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="h-10 px-4 rounded-xl text-[10px] font-black bg-white dark:bg-color-900/50 shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer disabled:opacity-30 uppercase tracking-widest">
                            {t.dashboard.products.pagination.next}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Editar Producto</DialogTitle>
                        <DialogDescription>Modifica los detalles de este producto.</DialogDescription>
                    </DialogHeader>
                    {selectedProduct && (
                        <ProductForm initial={selectedProduct} collections={collections} onClose={() => setIsEditDialogOpen(false)} />
                    )}
                    <DialogFooter>
                        <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
                        <Button type="button" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6" onClick={() => setIsEditDialogOpen(false)}>Guardar Cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
