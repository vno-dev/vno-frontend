import { useEffect, useRef, useState } from "react";

export function useIntersectionVideo(
    options: IntersectionObserverInit = { threshold: 0.4 }
) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, options);

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [options]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isVisible) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    }, [isVisible]);

    return { containerRef, videoRef, isVisible };
}
