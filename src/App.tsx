import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Nav } from "./components/Nav";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function App() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [videoCameras, SetVideoCameras] = useState<MediaDeviceInfo[]>([]);
    // const [currentVideoCameras, setCurrentVideoCameras] = useState<MediaDeviceInfo>();

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 } })
            .then(stream => { if (videoRef.current !== null) videoRef.current.srcObject = stream })
            .catch(err => console.log(err));
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        if (photoRef.current !== null && videoRef.current !== null) {
            photoRef.current.width = width;
            photoRef.current.height = height;
            const ctx = photoRef.current?.getContext('2d');
            ctx?.drawImage(videoRef.current, 0, 0, width, height);
        }

    }
    const getConnectedDevices = async (type: string) => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === type)
    }

    useEffect(getVideo, [videoRef]);

    useEffect(() => {
        getConnectedDevices('videoinput').then(videoCameras => SetVideoCameras(videoCameras));
    }, []);

    return (
        <>
            <Nav />
            <main className="h-screen w-full flex flex-col justify-center items-center">
                <div className="flex flex-col justify-items-center items-center">
                    <Select>
                        <SelectTrigger className="w-full m-4">
                            <SelectValue placeholder="Choose Camera" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {videoCameras.map(videoCamera => <SelectItem key={Math.random()} value={videoCamera.deviceId}> {videoCamera.label}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <video ref={videoRef} className="border-2 h-[400px] aspect-video" autoPlay playsInline controls={false}></video>
                    <div className="flex w-full justify-center px-1 py-3">
                        <Button onClick={takePhoto}>take photo</Button>
                        {/* <Button variant="secondary">secondary</Button> */}
                    </div>
                </div>
                <div className="flex flex-col justify-items-center items-center">
                    <canvas ref={photoRef}></canvas>
                    {/* <Button>close</Button> */}
                </div>
            </main>
        </>
    )
}

export default App
