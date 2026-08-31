"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Download, X } from "lucide-react";
import QRCode from "qrcode";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function QrClient({
  barberId,
  businessName,
}: {
  barberId: string;
  businessName: string;
}) {
  const router = useRouter();
  const [dataUrl, setDataUrl] = useState<string>("");
  const [publicUrl, setPublicUrl] = useState<string>("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Absolute link to the barber's public page — built from the live origin so
  // the QR works whatever domain the app is served from.
  useEffect(() => {
    const url = `${window.location.origin}/barber/${barberId}`;
    setPublicUrl(url);
    void QRCode.toDataURL(url, { width: 320, margin: 2 }).then(setDataUrl);
  }, [barberId]);

  function download() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `hajjem-${businessName.replace(/\s+/g, "-").toLowerCase()}-qr.png`;
    a.click();
  }

  // Camera scan via the native BarcodeDetector — no library. On a match that
  // points at a /barber/ page we navigate there.
  // ponytail: BarcodeDetector is Chromium/Android-only; Safari/Firefox show the
  // error message. Add a JS decoder fallback only if those browsers matter.
  useEffect(() => {
    if (!scanning) return;
    const Detector = (
      window as unknown as { BarcodeDetector?: new (o: object) => {
        detect: (s: CanvasImageSource) => Promise<{ rawValue: string }[]>;
      } }
    ).BarcodeDetector;
    if (!Detector) {
      setScanError("Scan non supporté sur ce navigateur.");
      return;
    }
    const detector = new Detector({ formats: ["qr_code"] });
    let stream: MediaStream | null = null;
    let raf = 0;
    let stopped = false;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        const tick = async () => {
          if (stopped || !videoRef.current) return;
          try {
            const codes = await detector.detect(videoRef.current);
            const hit = codes.find((c) => c.rawValue.includes("/barber/"));
            if (hit) {
              const path = new URL(hit.rawValue).pathname;
              stop();
              router.push(path);
              return;
            }
          } catch {
            /* transient decode errors — keep scanning */
          }
          raf = requestAnimationFrame(() => void tick());
        };
        void tick();
      } catch {
        setScanError("Accès caméra refusé.");
      }
    }

    function stop() {
      stopped = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
    }

    void start();
    return stop;
  }, [scanning, router]);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <header className="bg-surface px-container-margin sticky top-0 z-40 flex h-16 items-center gap-3 shadow-sm">
        <button type="button" aria-label="Retour" onClick={() => router.back()}>
          <ArrowLeft className="size-6" />
        </button>
        <span className="font-headline-md text-headline-md">
          Partager via QR Code
        </span>
      </header>

      <main className="px-container-margin pt-stack-lg mx-auto w-full max-w-md pb-20">
        <Card className="p-gutter gap-stack-lg flex flex-col items-center rounded-2xl">
          <p className="text-on-surface-variant font-body-md text-center">
            Scannez ce code pour ouvrir la page publique de{" "}
            <span className="text-on-surface font-bold">{businessName}</span>.
          </p>

          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt="QR Code du barbier"
              className="size-64 rounded-lg bg-white p-3"
            />
          ) : (
            <div className="bg-surface-container size-64 animate-pulse rounded-lg" />
          )}

          <p className="text-on-surface-variant font-label-sm break-all text-center">
            {publicUrl}
          </p>

          <div className="gap-gutter flex w-full">
            <Button
              onClick={() => {
                setScanError(null);
                setScanning(true);
              }}
              variant="outline"
              className="border-outline h-auto flex-1 gap-2 rounded-lg py-3 font-bold"
            >
              <Camera className="size-5" />
              Scanner
            </Button>
            <Button
              onClick={download}
              disabled={!dataUrl}
              className="bg-primary text-on-primary h-auto flex-1 gap-2 rounded-lg py-3 font-bold"
            >
              <Download className="size-5" />
              Télécharger
            </Button>
          </div>
        </Card>
      </main>

      {scanning && (
        <div className="bg-background/95 fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-6">
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setScanning(false)}
            className="absolute top-6 right-6"
          >
            <X className="size-7" />
          </button>
          {scanError ? (
            <p className="text-destructive font-body-md text-center">
              {scanError}
            </p>
          ) : (
            <>
              <video
                ref={videoRef}
                muted
                playsInline
                className="border-primary aspect-square w-full max-w-sm rounded-2xl border-2 object-cover"
              />
              <p className="text-on-surface-variant font-body-md text-center">
                Pointez la caméra vers un QR Code Hajjem.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
