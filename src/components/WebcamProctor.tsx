import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WebcamProctorProps {
  enabled?: boolean;
}

export default function WebcamProctor({ enabled = true }: WebcamProctorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [warning, setWarning] = useState('');
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const startMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        setCameraOn(true);
        setMicOn(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch {
        setWarning('Camera/microphone access denied. Proctoring requires both.');
      }
    };

    startMedia();

    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, [enabled]);

  // Monitor track status
  useEffect(() => {
    if (!stream) return;

    const checkTracks = () => {
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];
      setCameraOn(videoTrack?.enabled && videoTrack?.readyState === 'live');
      setMicOn(audioTrack?.enabled && audioTrack?.readyState === 'live');
      if (!videoTrack?.enabled || videoTrack?.readyState !== 'live') {
        setWarning('Camera disconnected! Please reconnect.');
      } else if (!audioTrack?.enabled || audioTrack?.readyState !== 'live') {
        setWarning('Microphone disconnected! Please reconnect.');
      } else {
        setWarning('');
      }
    };

    const interval = setInterval(checkTracks, 2000);
    return () => clearInterval(interval);
  }, [stream]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {warning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 p-2 rounded-lg bg-destructive/20 border border-destructive/50 text-destructive text-xs flex items-center gap-2 max-w-[200px]"
          >
            <AlertTriangle className="w-3 h-3 shrink-0" />
            {warning}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-lg"
        style={{ width: minimized ? 48 : 200 }}
      >
        {!minimized && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-[200px] h-[150px] object-cover bg-secondary"
            />
            <div className="absolute bottom-2 left-2 flex gap-1">
              {cameraOn ? (
                <Camera className="w-3 h-3 text-success" />
              ) : (
                <CameraOff className="w-3 h-3 text-destructive" />
              )}
              {micOn ? (
                <Mic className="w-3 h-3 text-success" />
              ) : (
                <MicOff className="w-3 h-3 text-destructive" />
              )}
            </div>
          </div>
        )}
        <button
          onClick={() => setMinimized(!minimized)}
          className="w-full px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors bg-card"
        >
          {minimized ? '📹' : 'Minimize'}
        </button>
      </motion.div>
    </div>
  );
}
