"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    ArrowLeftIcon,
    Download,
    Maximize,
    RotateCcw,
    RotateCw,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { motion, useMotionValue, type PanInfo } from "motion/react";
import Image from "next/image";
import { memo, useEffect, useRef, useState, type FC } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Typography } from "../typography";

interface ImageItem {
    src: string;
    alt: string;
    key?: string | number;
}

interface PreviewImagesProps {
    images: ImageItem[];
    initialSlide?: number;
    open?: boolean;
    title?: string;
    onClose?: () => void;
}

const PreviewImages: FC<PreviewImagesProps> = memo(
    ({ images, initialSlide = 0, open = false, onClose }) => {
        const [currentIndex, setCurrentIndex] = useState(initialSlide);
        const swiperRef = useRef<SwiperType | null>(null);

        // Transform states for each image
        const [transformStates, setTransformStates] = useState(
            images.map(() => ({ scale: 1, rotate: 0, x: 0, y: 0 }))
        );

        // Track if currently zoomed to disable swiper
        const isZoomed = transformStates[currentIndex]?.scale > 1;

        // Motion values for drag
        const x = useMotionValue(transformStates[currentIndex]?.x || 0);
        const y = useMotionValue(transformStates[currentIndex]?.y || 0);

        // Update motion values when index changes
        useEffect(() => {
            x.set(transformStates[currentIndex]?.x || 0);
            y.set(transformStates[currentIndex]?.y || 0);
        }, [currentIndex, transformStates, x, y]);

        // Disable/enable swiper based on zoom
        useEffect(() => {
            if (swiperRef.current) {
                if (isZoomed) {
                    swiperRef.current.allowTouchMove = false;
                    swiperRef.current.allowSlideNext = false;
                    swiperRef.current.allowSlidePrev = false;
                } else {
                    swiperRef.current.allowTouchMove = true;
                    swiperRef.current.allowSlideNext = true;
                    swiperRef.current.allowSlidePrev = true;
                }
            }
        }, [isZoomed]);

        const updateTransform = (
            index: number,
            type: "zoomIn" | "zoomOut" | "rotateLeft" | "rotateRight" | "reset"
        ) => {
            setTransformStates((prev) =>
                prev.map((item, i) => {
                    if (i !== index) return item;
                    switch (type) {
                        case "zoomIn":
                            return { ...item, scale: Math.min(3, item.scale + 0.3) };
                        case "zoomOut":
                            const newScale = Math.max(1, item.scale - 0.3);
                            // Reset position when zooming out to 1
                            return newScale === 1
                                ? { ...item, scale: newScale, x: 0, y: 0 }
                                : { ...item, scale: newScale };
                        case "rotateLeft":
                            return { ...item, rotate: item.rotate - 90 };
                        case "rotateRight":
                            return { ...item, rotate: item.rotate + 90 };
                        case "reset":
                            return { scale: 1, rotate: 0, x: 0, y: 0 };
                        default:
                            return item;
                    }
                })
            );
        };

        const handleDragEnd = (
            event: MouseEvent | TouchEvent | PointerEvent,
            info: PanInfo
        ) => {
            // Update the stored position
            setTransformStates((prev) =>
                prev.map((item, i) => {
                    if (i !== currentIndex) return item;
                    return {
                        ...item,
                        x: item.x + info.offset.x,
                        y: item.y + info.offset.y,
                    };
                })
            );
        };

        const handleDownload = () => {
            const currentImage = images[currentIndex];
            const link = document.createElement("a");
            link.href = currentImage.src;
            link.download = currentImage.alt || `image-${currentIndex + 1}`;
            link.click();
        };

        // Handle pinch-to-zoom
        const handleWheel = (e: React.WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY;
                if (delta < 0) {
                    updateTransform(currentIndex, "zoomIn");
                } else {
                    updateTransform(currentIndex, "zoomOut");
                }
            }
        };

        const getDragConstraints = (scale: number) => {
            if (scale <= 1) {
                return { top: 0, left: 0, right: 0, bottom: 0 };
            }

            const excess = (scale - 1) * 500; // tùy theo container size
            return {
                top: -excess,
                left: -excess,
                right: excess,
                bottom: excess,
            };
        };

        return (
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent
                    showCloseButton={false}
                    showOverlay={false}
                    className="flex flex-col w-full max-w-full sm:max-w-full h-dvh p-0 border-0 bg-transparent shadow-none touch-none"
                    style={{
                        touchAction: "none",
                    }}
                >
                    <DialogHeader className="sr-only">
                        <DialogTitle />
                    </DialogHeader>
                    <DialogOverlay className="bg-black/90 size-full z-0" />

                    <div className="flex-1 z-10" onWheel={handleWheel}>
                        <Swiper
                            style={{ width: "100%", height: "100%" }}
                            slidesPerView={1}
                            initialSlide={initialSlide}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            onRealIndexChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                        >
                            {images.map((image, index) => (
                                <SwiperSlide
                                    key={image.key ?? index}
                                    className="flex items-center justify-center"
                                >
                                    <motion.div
                                        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <motion.div
                                            drag={transformStates[index].scale > 1}
                                            dragConstraints={getDragConstraints(
                                                transformStates[index].scale
                                            )}
                                            dragElastic={0.1}
                                            dragMomentum={false}
                                            onDragEnd={handleDragEnd}
                                            style={{
                                                x:
                                                    index === currentIndex ? x : transformStates[index].x,
                                                y:
                                                    index === currentIndex ? y : transformStates[index].y,
                                            }}
                                            className="relative w-full h-full"
                                        >
                                            <Image
                                                src={image.src || "/placeholder.svg"}
                                                alt={image.alt}
                                                fill
                                                className="object-contain select-none pointer-events-none"
                                                style={{
                                                    transform: `scale(${transformStates[index].scale}) rotate(${transformStates[index].rotate}deg)`,
                                                    transition: "transform 0.2s ease-out",
                                                }}
                                                priority={index === 0}
                                                draggable={false}
                                            />
                                        </motion.div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <motion.div className="flex items-center justify-between absolute top-4 left-4 w-full z-10 text-white px-4 py-2">
                        <DialogClose asChild>
                            <Button
                                size={"icon"}
                                variant={"ghost"}
                                className=" bg-black/60 p-2 backdrop-blur-sm z-10"
                            >
                                <ArrowLeftIcon className="size-6" />
                            </Button>
                        </DialogClose>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-lg bg-black/60 p-2 backdrop-blur-sm z-10"
                        initial={{ y: 40, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 40, opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20 hover:text-white transition-colors"
                            onClick={() => updateTransform(currentIndex, "zoomOut")}
                            disabled={transformStates[currentIndex].scale <= 1}
                        >
                            <ZoomOut className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20 hover:text-white transition-colors"
                            onClick={() => updateTransform(currentIndex, "zoomIn")}
                            disabled={transformStates[currentIndex].scale >= 3}
                        >
                            <ZoomIn className="h-5 w-5" />
                        </Button>
                        <div className="mx-1 h-6 w-px bg-white/30" />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20 hover:text-white transition-colors"
                            onClick={() => updateTransform(currentIndex, "rotateLeft")}
                        >
                            <RotateCcw className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20 hover:text-white transition-colors"
                            onClick={() => updateTransform(currentIndex, "rotateRight")}
                        >
                            <RotateCw className="h-5 w-5" />
                        </Button>
                        <div className="mx-1 h-6 w-px bg-white/30" />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20 hover:text-white transition-colors"
                            onClick={() => updateTransform(currentIndex, "reset")}
                        >
                            <Maximize className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20 hover:text-white transition-colors"
                            onClick={handleDownload}
                        >
                            <Download className="h-5 w-5" />
                        </Button>
                    </motion.div>

                    {/* Image counter */}
                    <motion.div
                        className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm z-10"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <Typography className="text-white text-sm font-medium">
                            {currentIndex + 1} / {images.length}
                        </Typography>
                    </motion.div>
                </DialogContent>
            </Dialog>
        );
    }
);

PreviewImages.displayName = "PreviewImages";

export default PreviewImages;
