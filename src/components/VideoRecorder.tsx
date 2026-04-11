import { useState, useRef, useCallback } from 'react';
import { Video, Square, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  maxDuration?: number; // seconds
}

export default function VideoRecorder({ onRecordingComplete, maxDuration = 120 }: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const timerRef = useRef<number | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setRecordedUrl(null);
    } catch {
      alert('Camera/microphone access denied');
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
      onRecordingComplete(blob);
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
    setTimeLeft(maxDuration);

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stream, maxDuration, onRecordingComplete]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    setRecordedUrl(null);
    setTimeLeft(maxDuration);
    startCamera();
  }, [maxDuration, startCamera]);

  return (
    <div className="rounded-xl border border-border/50 gradient-card p-4">
      <div className="relative mb-3">
        {recordedUrl ? (
          <video src={recordedUrl} controls className="w-full rounded-lg bg-secondary aspect-video" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-lg bg-secondary aspect-video"
          />
        )}
        {recording && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-destructive/90 text-destructive-foreground text-xs font-display">
            <div className="w-2 h-2 rounded-full bg-destructive-foreground animate-pulse" />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {!stream && !recordedUrl && (
          <Button onClick={startCamera} size="sm" className="gap-2">
            <Video className="w-4 h-4" /> Open Camera
          </Button>
        )}
        {stream && !recording && (
          <Button onClick={startRecording} size="sm" className="gap-2 bg-destructive hover:bg-destructive/90">
            <Play className="w-4 h-4" /> Start Recording
          </Button>
        )}
        {recording && (
          <Button onClick={stopRecording} size="sm" variant="outline" className="gap-2">
            <Square className="w-4 h-4" /> Stop
          </Button>
        )}
        {recordedUrl && (
          <Button onClick={reset} size="sm" variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Re-record
          </Button>
        )}
      </div>
    </div>
  );
}
