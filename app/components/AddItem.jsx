// "use client"; 
// import { useState } from "react";

// const UploadComponent = () => {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const uploadStagedFile = async (stagedFile) => {
//     const form = new FormData();
//     form.append("file", stagedFile);

//     const res = await fetch("/api/additems", {
//       method: "POST",
//       body: form,
//     });

//     const data = await res.json();
//     if (data.message === "success") {
//       setUploadStatus(`Image uploaded successfully: ${data.imgUrl}`);
//     } else {
//       setUploadStatus(`Upload failed: ${data.error}`);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (file) {
//       uploadStagedFile(file);
//     } else {
//       setUploadStatus("Please select a file to upload.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default UploadComponent;



// ============ upload multiple files ============ 

"use client"; 
import { useState } from "react";

const UploadComponent = () => {
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState(""); 
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleFolderChange = (event) => {
    setFolderName(event.target.value); 
  };

  const uploadStagedFiles = async (stagedFiles) => {
    const form = new FormData();
    stagedFiles.forEach((file) => {
      form.append("file", file);
    });
    form.append("folderName", folderName); 

    const res = await fetch("/api/additems", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.message === "Upload complete") {
      const successfulUrls = data.successfulUploads.map(res => res.result.secure_url);
      setUploadStatus(`Images uploaded successfully: ${successfulUrls.join(", ")}`);


      console.log("Images uploaded successfull")
      console.log("successfulUrls : ",successfulUrls)

    } else {
      setUploadStatus(`Upload failed: ${data.failedUploads.map(res => res.error).join(", ")}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (files.length > 0 && folderName) {
      uploadStagedFiles(files);
    } else {
      setUploadStatus("Please select files and provide a folder name.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Folder Name" value={folderName} onChange={handleFolderChange} required />
        <input type="file" onChange={handleFileChange} multiple />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p> }
    </div>
  );
};

export default UploadComponent;
