import  { useEffect, useState } from "react";
import { FileUploader } from "./components/FileUploader";
import { FileList } from "./components/FileList";
import "./App.css";
import { getFiles } from "./services/fileService";

const App = () => {

  const [files, setFiles] = useState<any[]>([]);

  // Fetch the file list from the backend
  const fetchFiles = async () => {
    try {
      const response = await getFiles();
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("Failed to load files. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFiles(); // Load files initially
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Typeface</h1>
      </header>
      <div className="app-content">
        <aside className="file-list-section">
          <h2>Your Files</h2>
            <FileList files={files} />
        </aside>
        <main className="upload-section">
          <h2>Upload Files</h2>
          <FileUploader fetchFiles={fetchFiles} />
        </main>
      </div>
    </div>
  );
};

export default App;