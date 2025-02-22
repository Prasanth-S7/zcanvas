import { useEffect, useRef, useState } from "react";

interface Position {
    x: number;
    y: number;
}
export default function CanvasComponent() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [shape, setShape] = useState<"pen" | "rectangle">("pen");
    const [startPos, setStartPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const setCanvasSize = () => {

            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCtx?.drawImage(canvas, 0, 0);

            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            const ctx = canvas.getContext('2d');
            if (ctx && tempCtx) {
                ctx.drawImage(tempCanvas, 0, 0);

                ctx.lineWidth = 2;
                ctx.strokeStyle = "#FFFFFF";
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
            }
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const getMousePos = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (shape === "pen") {
                const pos: Position = getMousePos(e);
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                setIsDrawing(true);
            }
            else if (shape === "rectangle") {
                const pos: Position = getMousePos(e);
                setStartPos({ x: pos?.x, y: pos?.y })
                ctx.beginPath();
                ctx.rect(pos.x, pos.y, 0, 0);
                setIsDrawing(true);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (shape === "pen") {
                if (!isDrawing) return;
                const pos: Position = getMousePos(e);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }
            else if (shape === "rectangle") {
                if (!isDrawing) return;
                const pos: Position = getMousePos(e);
        
                const width = Math.abs(pos.x - startPos.x);
                const height = Math.abs(pos.y - startPos.y);
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.rect(startPos.x, startPos.y, width, height);
                ctx.stroke();
            }
        };
        

        const handleMouseUp = () => {
            setIsDrawing(false);
            ctx.closePath();
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseUp);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseUp);
            window.removeEventListener('resize', setCanvasSize);
        };
    }, [isDrawing, shape]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                className="h-screen w-screen text-white bg-[#0a0a0a] overflow-hidden"
                style={{ touchAction: 'none' }}
            />
            {/* place the below div at the top center */}
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 m-4 flex flex-col items-center justify-center">
                <div className="flex space-x-2 items-center justify-center border border-white/20 px-2 rounded-xl py-1 text-white">
                    <span className="cursor-pointer px-2 py-1 rounded-xl bg-black border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                        </svg>
                    </span>
                    <span className="cursor-pointer px-2 py-1 rounded-xl bg-black border border-white/20" onClick={() => setShape("pen")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </span>
                    <span className="cursor-pointer px-2 py-1 rounded-xl bg-black border border-white/20" onClick={() => setShape("rectangle")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                        </svg>
                    </span>
                    <span className="cursor-pointer px-2 py-1 rounded-xl bg-black border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" x2="15" y1="20" y2="20" /><line x1="12" x2="12" y1="4" y2="20" /></svg>
                    </span>
                </div>
            </div>
        </div>
    );
}