import { useEffect, useRef, useState } from "react";
import p5 from 'p5';
import { mainSketch } from "./draw";
import useSocket from "../hooks/useSocket";

export interface Shape {
    name: "rectangle" | "circle" | "line" | "pen" | "cursor" | "text";
}

export default function CanvasComponent({slug, roomId} : {
    slug: string,
    roomId: string 
}) {
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const currentShapeRef = useRef<Shape | null>(null);
    const [currentShape, setCurrentShape] = useState<Shape | null>(null);

    function setCurrentShapeRef(shape: Shape) {
        currentShapeRef.current = shape;
        setCurrentShape(shape);
    }

    console.log(roomId);

    const { socket, loading } = useSocket();

    useEffect(() => {
        if (socket && !loading && roomId) {
            socket.send(JSON.stringify({type: "join-room", roomId: roomId}));
            
            function sketch(p: p5) {
                mainSketch(p, canvasRef, currentShapeRef, socket, roomId);
            }
            //@ts-ignore
            const p5Instance = new p5(sketch, canvasRef.current);
            
            return () => {
                socket.close();
                p5Instance.remove();
            };
        }
    }, [socket, loading, roomId]);

    return (
        <div>
            <div
                ref={canvasRef}
                className="overflow-hidden"
                style={{ touchAction: 'none' }}
            />
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 m-4 flex flex-col items-center justify-center">
                <div className="flex space-x-2 items-center justify-center border border-white/20 px-2 rounded-xl py-1 text-white">
                <span onClick={() => setCurrentShapeRef({ name: "cursor" })} className={`cursor-pointer px-2 py-1 rounded-xl bg-black border ${currentShapeRef.current?.name === "cursor" ? "border-white" : " border-white/20"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                        </svg>
                    </span>
                    <span onClick={() => setCurrentShapeRef({ name: "pen" })} className={`cursor-pointer px-2 py-1 rounded-xl bg-black border ${currentShapeRef.current?.name === "pen" ? "border-white" : " border-white/20"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </span>
                    <span onClick={() => setCurrentShapeRef({ name: "rectangle" })} className={`cursor-pointer px-2 py-1 rounded-xl bg-black border ${currentShapeRef.current?.name === "rectangle" ? "border-white" : " border-white/20"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                        </svg>
                    </span>
                    <span onClick={() => setCurrentShapeRef({ name: "text" })} className={`cursor-pointer px-2 py-1 rounded-xl bg-black border ${currentShapeRef.current?.name === "text" ? "border-white" : " border-white/20"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-type">
                            <polyline points="4 7 4 4 20 4 20 7" />
                            <line x1="9" x2="15" y1="20" y2="20" />
                            <line x1="12" x2="12" y1="4" y2="20" />
                        </svg>
                    </span>
                    <span onClick={() => setCurrentShapeRef({ name: "circle" })} className={`cursor-pointer px-2 py-1 rounded-xl bg-black border ${currentShapeRef.current?.name === "circle" ? "border-white" : " border-white/20"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle"><circle cx="12" cy="12" r="10" /></svg>
                    </span>
                    <span onClick={() => setCurrentShapeRef({ name: "line" })} className={`cursor-pointer px-2 py-1 rounded-xl bg-black border ${currentShapeRef.current?.name === "line" ? "border-white" : " border-white/20"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14" /></svg>
                    </span>
                </div>
            </div>
        </div>
    );
}