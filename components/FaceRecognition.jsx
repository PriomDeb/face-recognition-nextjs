"use client";

// FaceRecognition.jsx

import React from "react";
import { useEffect, useRef, useState } from "react";

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const loopRef = useRef(null); // interval id
  const startedRef = useRef(false);

  const [status, setStatus] = useState("Loading models...");
  const [detected, setDetected] = useState("System is loading...");
  const [faceapi, setFaceapi] = useState(null);

  // 1) Load face-api and models client-side only
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const faceAPI = await import("face-api.js");

        if (!mounted) return;
        setFaceapi(faceAPI);
        setStatus("Loading face models…");

        await Promise.all([
          faceAPI.nets.tinyFaceDetector.loadFromUri("/models"),
          faceAPI.nets.faceLandmark68Net.loadFromUri("/models"),
          faceAPI.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);

        setStatus("Starting camera…");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (!mounted) return;

        videoRef.current.srcObject = stream;
        await new Promise((res) => (videoRef.current.onloadedmetadata = res));
        videoRef.current.play();
        setStatus("Camera ready. Loading students…");
      } catch (err) {
        console.error(err);
        setStatus("Error: " + String(err));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 2) After models+camera, load students and start loop
  useEffect(() => {
    if (!faceapi || !videoRef.current || startedRef.current) return;

    const start = async () => {
      try {
        // Fetch student names
        const res = await fetch("/api/students");
        const data = await res.json();
        const labels = (data?.names || []).filter(Boolean);
        if (!labels.length) {
          setStatus("No students found in /public/labeled_images");
          return;
        }

        setStatus(`Found ${labels.length} students. Preparing descriptors…`);

        // Build labeled descriptors (supports up to 5 images per person)
        const labeled = await Promise.all(
          labels.map(async (label) => {
            const desc = [];
            for (let i = 1; i <= 2; i++) {
              try {
                const img = await faceapi.fetchImage(
                  `/labeled_images/${label}/${i}.jpg`
                );
                const det = await faceapi
                  .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                  .withFaceLandmarks()
                  .withFaceDescriptor();
                if (det?.descriptor) desc.push(det.descriptor);

                // console.log("Find", label, desc);
                console.log(Array.from(det.desc)); // converts to regular array
              } catch (_) {
                // image missing; skip silently
              }
            }
            if (!desc.length) return null; // skip empty
            return new faceapi.LabeledFaceDescriptors(label, desc);
          })
        );
        // Labeled contains _label and _descriptor[]
        // console.log("Find: ", labeled);

        const labeledDescriptors = labeled.filter(Boolean);
        // console.log("Find:", labeledDescriptors);

        if (!labeledDescriptors.length) {
          setStatus(
            "No valid reference images found (make sure 1.jpg etc. exist)"
          );
          return;
        }

        const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

        // Prepare canvas overlay sized to actual video
        const video = videoRef.current;
        const canvas = faceapi.createCanvasFromMedia(video);
        canvasWrapRef.current.innerHTML = "";
        canvasWrapRef.current.appendChild(canvas);
        const size = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, size);

        setStatus("Running detection… Look at the camera.");

        // Clear any previous loop
        if (loopRef.current) clearInterval(loopRef.current);

        startedRef.current = true;

        // Run every 200ms
        loopRef.current = setInterval(async () => {
          try {
            const dets = await faceapi
              .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceDescriptors();

            const resized = faceapi.resizeResults(dets, size);
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!resized.length) {
              setDetected("Unable to detect");
              return;
            }

            let anyName = "Unable to detect";
            resized.forEach((d) => {
              const best = matcher.findBestMatch(d.descriptor);
              const name =
                best.label === "unknown" ? "Unable to detect" : best.label;
              if (name !== "Unable to detect") anyName = name;
              new faceapi.draw.DrawBox(d.detection.box, { label: name }).draw(
                canvas
              );
            });

            setDetected(anyName);
          } catch (e) {
            console.error(e);
          }
        }, 200);
      } catch (err) {
        console.error(err);
        setStatus("Error: " + String(err));
      }
    };

    start();

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [faceapi]);

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", textAlign: "center" }}>
      <h1>Face Recognition Attendance</h1>
      <p style={{ marginTop: 8, fontSize: 14, opacity: 0.8 }}>{status}</p>
      <div
        style={{ position: "relative", display: "inline-block", marginTop: 12 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: 720,
            height: "auto",
            border: "1px solid #ddd",
            borderRadius: 12,
          }}
        />
        <div
          ref={canvasWrapRef}
          style={{ position: "absolute", left: 0, top: 0 }}
        />
      </div>
      <h2 style={{ marginTop: 16 }}>
        Detected: <span style={{ fontFamily: "monospace" }}>{detected}</span>
      </h2>
    </div>
  );
};

export default FaceRecognition;
