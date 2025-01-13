import { downloadFile } from "../../services/fileService";
import "./FileList.css";

export const FileList = ({ files }: { files: any[] }) => {

  const handleDownload = async (id: number) => {
    try {
      // Fetch the file from the server
      const response = await downloadFile(id);
  
      // Extract the file name from the Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      console.log(response.headers["content-disposition"])
      let fileName = "file"; // Default file name in case header is missing
  
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }
  
      // Get the MIME type from the server response
      const mimeType = response.headers["content-type"] || "application/octet-stream";
      console.log(response.headers["content-type"])
  
      // Create a URL for the file blob and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again later.");
    }
  };

  return (
    <div className="file-list-container">
      <ul className="file-list">
        {files.map((file) => (
          <li key={file.id} className="file-list-item">
            <span className="file-name">{file.fileName}</span>
            <button
              className="download-btn"
              onClick={() => handleDownload(file.id)}
            >
              <i className="fas fa-download"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};