// videoDownloader.ts

interface DownloadProgress {
  loaded: number;
  total: number;
  progress: number;
}

interface DownloadOptions {
  fileName?: string;
  onProgress?: (progress: DownloadProgress) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export const downloadVideo = async (videoUrl: string, options: DownloadOptions = {}) => {
  const { fileName = "downloaded-video", onProgress, onComplete, onError } = options;

  try {
    // Start the download
    const response = await fetch(videoUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the content length for progress calculation
    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;

    // Get the content type to determine file extension
    const contentType = response.headers.get("content-type") || "";
    const fileExtension = getFileExtension(contentType);

    // Create a ReadableStream from the response
    const reader = response.body!.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      loaded += value.length;

      // Calculate and report progress
      if (onProgress) {
        onProgress({
          loaded,
          total,
          progress: total ? (loaded / total) * 100 : 0,
        });
      }
    }

    // Combine chunks into a single Blob
    const blob = new Blob(chunks, { type: contentType });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}${fileExtension}`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    if (onComplete) {
      onComplete();
    }
  } catch (error) {
    if (onError) {
      onError(error as Error);
    }
    console.error("Download failed:", error);
  }
};

// Helper function to determine file extension
const getFileExtension = (contentType: string): string => {
  const extensions: { [key: string]: string } = {
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/ogg": ".ogv",
    "video/quicktime": ".mov",
  };

  return extensions[contentType] || ".mp4"; // Default to .mp4 if content type is unknown
};

// Usage example with progress tracking
export const useVideoDownload = () => {
  const downloadVideoWithProgress = async (videoUrl: string, fileName?: string) => {
    return new Promise((resolve, reject) => {
      downloadVideo(videoUrl, {
        fileName,
        onProgress: (progress) => {
          console.log(`Download progress: ${progress.progress.toFixed(2)}%`);
        },
        onComplete: () => {
          resolve("Download completed successfully");
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  return { downloadVideoWithProgress };
};
