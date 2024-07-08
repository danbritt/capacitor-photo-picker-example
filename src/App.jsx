import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Camera } from "@capacitor/camera";

function App() {
    const [count, setCount] = useState(0);
    const [exifJson, setExifJson] = useState("");

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
                <p>
                    <button
                        onClick={async () => {
                            let result = await Camera.pickImages({
                                quality: 100,
                                width: 1080,
                                height: 720,
                                limit: 1,
                            });

                            let exifStr = "No Exif Data";
                            if (result.photos[0].exif) {
                                exifStr = JSON.stringify(
                                    result.photos[0].exif,
                                    null,
                                    2
                                );
                            }
                            setExifJson(exifStr);
                        }}
                    >
                        Pick single image with location
                    </button>
                </p>
                <div>
                    <div>Exif Data:</div>
                    <textarea
                        style={{ width: "100%", height: "600px" }}
                        value={exifJson}
                    />
                </div>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
