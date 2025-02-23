import p5 from 'p5';
import { Shape } from "./CanvasComponent";

interface ShapeDetails {
    type: string;
    details: any;
    isFinal?: boolean;
}

export function mainSketch(p: p5, canvasRef: React.RefObject<HTMLDivElement>, currentShapeRef: React.RefObject<Shape | null>, socket: WebSocket | null, roomId: string) {
    let startX: number;
    let startY: number;
    let mouseClicked = false;
    let drawnCircles: { x: number; y: number; radius: number }[] = [];
    let drawnRectangles: { x: number; y: number; width: number; height: number }[] = [];
    let drawnLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    let drawnText: { x: number; y: number; text: string }[] = [];
    let isTyping = false;
    let currentText = "";
    let textX = 0;
    let textY = 0;

    p.setup = function () {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0);
        p.stroke(255);
        p.noFill();
        p.textSize(20);

        window.addEventListener('keydown', handleKeyPress);
        
        canvasRef.current?.addEventListener("mousemove", handleMouseMove);
        canvasRef.current?.addEventListener("mousedown", handleMouseDown);
        canvasRef.current?.addEventListener("mouseup", handleMouseUp);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (!isTyping || currentShapeRef.current?.name !== "text") return;

        if (e.key === 'Enter') {
            if (currentText.trim()) {
                drawnText.push({ x: textX, y: textY, text: currentText });
                sendToSocketServer({
                    type: "text",
                    details: { x: textX, y: textY, text: currentText },
                    isFinal: true
                });
                currentText = "";
                isTyping = false;
            }
        } else if (e.key === 'Backspace') {
            currentText = currentText.slice(0, -1);
        } else if (e.key.length === 1) {
            currentText += e.key;
        }

        redrawCanvas();
    };

    const sendToSocketServer = (message: ShapeDetails) => {
        if (!socket || !roomId) {
            console.log('Socket or roomId not ready:', { socketReady: !!socket, roomId });
            return;
        }
        
        socket.send(JSON.stringify({
            type: "shape", 
            message: {
                roomId: roomId,
                shapeDetail: message
            }
        }));
    }

    if (!socket || !roomId) {
        console.log('Socket or roomId not ready:', { socketReady: !!socket, roomId });
        return;
    }

    socket.onmessage = (e: MessageEvent) => {
        const parsedData = JSON.parse(e.data);
        if (parsedData.type === "shape") {
            const shape = parsedData.message;
            if (shape.roomId === roomId) {
                const shapeDetail = shape.shapeDetail;
                // Only add to arrays if it's a final shape
                if (shapeDetail.isFinal) {
                    switch (shapeDetail.type) {
                        case "circle":
                            drawnCircles.push({ 
                                x: shapeDetail.details.startX, 
                                y: shapeDetail.details.startY, 
                                radius: shapeDetail.details.distance 
                            });
                            break;
                        case "rectangle":
                            drawnRectangles.push({ 
                                x: shapeDetail.details.startX, 
                                y: shapeDetail.details.startY, 
                                width: shapeDetail.details.width, 
                                height: shapeDetail.details.height 
                            });
                            break;
                        case "line":
                            drawnLines.push({ 
                                x1: shapeDetail.details.startX, 
                                y1: shapeDetail.details.startY, 
                                x2: shapeDetail.details.endX, 
                                y2: shapeDetail.details.endY 
                            });
                            break;
                        case "text":
                            drawnText.push({
                                x: shapeDetail.details.x,
                                y: shapeDetail.details.y,
                                text: shapeDetail.details.text
                            });
                            break;
                    }
                }
                redrawCanvas();
            }
        }
    };

    const redrawCanvas = () => {
        p.clear();
        p.background(0);
        
        // Draw all saved shapes
        drawnCircles.forEach((circle) => {
            p.circle(circle.x, circle.y, circle.radius);
        });
        drawnRectangles.forEach((rectangle) => {
            p.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });
        drawnLines.forEach((line) => {
            p.line(line.x1, line.y1, line.x2, line.y2);
        });
        drawnText.forEach((text) => {
            p.text(text.text, text.x, text.y);
        });

        // Draw the current shape being drawn
        if (mouseClicked && !isTyping && currentShapeRef.current) {
            const currentX = p.mouseX;
            const currentY = p.mouseY;
            
            if (currentShapeRef.current.name === "circle") {
                const radius = currentX - startX;
                p.circle(startX, startY, radius);
            }
            else if (currentShapeRef.current.name === "rectangle") {
                const width = currentX - startX;
                const height = currentY - startY;
                p.rect(startX, startY, width, height);
            }
            else if (currentShapeRef.current.name === "line") {
                p.line(startX, startY, currentX, currentY);
            }
        }

        if (isTyping && currentText) {
            p.text(currentText, textX, textY);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (mouseClicked && !isTyping) {
            // Send preview updates without isFinal flag
            if (currentShapeRef.current?.name === "circle") {
                sendToSocketServer({
                    type: "circle",
                    details: { startX, startY, distance: e.clientX - startX },
                    isFinal: false
                });
            }
            else if (currentShapeRef.current?.name === "rectangle") {
                sendToSocketServer({
                    type: "rectangle",
                    details: { startX, startY, width: e.clientX - startX, height: e.clientY - startY },
                    isFinal: false
                });
            }
            else if (currentShapeRef.current?.name === "line") {
                sendToSocketServer({
                    type: "line",
                    details: { startX, startY, endX: e.clientX, endY: e.clientY },
                    isFinal: false
                });
            }
            redrawCanvas();
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        mouseClicked = true;
        startX = e.clientX;
        startY = e.clientY;

        if (currentShapeRef.current?.name === "text") {
            textX = e.clientX;
            textY = e.clientY;
            isTyping = true;
            currentText = "";
            p.stroke(255);
            p.text('|', textX, textY);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (!isTyping && mouseClicked) {
            if (currentShapeRef.current?.name === "circle") {
                const radius = e.clientX - startX;
                drawnCircles.push({ x: startX, y: startY, radius });
                sendToSocketServer({
                    type: "circle",
                    details: { startX, startY, distance: radius },
                    isFinal: true
                });
            }
            else if (currentShapeRef.current?.name === "rectangle") {
                const width = e.clientX - startX;
                const height = e.clientY - startY;
                drawnRectangles.push({ x: startX, y: startY, width, height });
                sendToSocketServer({
                    type: "rectangle",
                    details: { startX, startY, width, height },
                    isFinal: true
                });
            }
            else if (currentShapeRef.current?.name === "line") {
                drawnLines.push({ x1: startX, y1: startY, x2: e.clientX, y2: e.clientY });
                sendToSocketServer({
                    type: "line",
                    details: { startX, startY, endX: e.clientX, endY: e.clientY },
                    isFinal: true
                });
            }
            redrawCanvas();
        }
        mouseClicked = false;
    };

    return () => {
        window.removeEventListener('keydown', handleKeyPress);
        canvasRef.current?.removeEventListener("mousemove", handleMouseMove);
        canvasRef.current?.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current?.removeEventListener("mouseup", handleMouseUp);
    };
}