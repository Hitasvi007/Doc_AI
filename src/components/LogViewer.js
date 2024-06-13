import React, { useState, useEffect } from 'react';

function LogViewer() {
    const [logs, setLogs] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:8000/ws");
        setWs(websocket);

        websocket.onmessage = (event) => {
            setLogs(prevLogs => [...prevLogs, event.data]);
        };

        websocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            websocket.close();
        };
    }, []);

    return (
        <div>
            <h2>Real-time Logs</h2>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid black' }}>
                {logs.map((log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </div>
        </div>
    );
}

export default LogViewer;
