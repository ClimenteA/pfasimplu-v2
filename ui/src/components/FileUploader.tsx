import Dropzone from "react-dropzone";
import { Upload } from "react-bootstrap-icons";
import { req } from "../utils";
import { useEffect, useState } from "react";
import { useStoreIncasariFileUpload } from "../store/incasari";

export function FileUploader() {
  const {
    data,
    setData,
    resetData,
    fileDropped,
    urlFisierIncarcat,
    setUrlFisierIncarcat,
    resetUrlFisierIncarcat,
    resetFileDropped,
    setFileWasDropped,
  } = useStoreIncasariFileUpload();
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (data.url_fisier) {
      setUrlFisierIncarcat(data.url_fisier);
    }
  }, [data]);

  function handleFiles(files: any[]) {
    if (files.length != 1) {
      setUploadErr(
        "Doar un fisier trebuie incarcat. Se accepta doar fisiere tip imagini si pdf."
      );
      setTimeout(() => setUploadErr(""), 5000);
      return;
    }

    const file = files[0];
    setFileName(file.path);
    const formData = new FormData();
    // @ts-ignore
    formData.append("file", file);

    req
      .post("/v1/fisiere/incarca", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setUrlFisierIncarcat(response.data.url_fisier);
      })
      .catch((err) => {
        console.error(err);
        setUploadErr("Nu am putut incarca fisierul..");
        setTimeout(() => {
          setUploadErr("");
          resetFileDropped();
          resetData();
          resetUrlFisierIncarcat();
        }, 5000);
      });
  }

  if (fileDropped) {
    return (
      <div style={{ marginTop: "4rem", marginBottom: "1rem" }}>
        <p className="text-center">
          Fisierul <span className="pico-color-amber-250">{fileName}</span> a
          fost incarcat!
        </p>
        <div>
          <iframe
            style={{ borderRadius: "5px" }}
            src={urlFisierIncarcat}
            width="100%"
            height="800px"
          ></iframe>
        </div>
      </div>
    );
  } else {
    return (
      <article
        style={{
          marginTop: "4rem",
          cursor: "pointer",
          padding: "0px",
          border: isDragActive ? "2px solid green" : "none",
        }}
      >
        <Dropzone
          maxFiles={1}
          accept={{
            "image/*": [],
            "application/pdf": [],
          }}
          onDrop={handleFiles}
          onDragEnter={() => setIsDragActive(true)}
          onDragLeave={() => setIsDragActive(false)}
          onDropAccepted={() => {
            setIsDragActive(false);
            setFileWasDropped();
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                style={{ padding: "2rem 2rem 2rem 2rem" }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <p
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  className="text-center"
                >
                  {isDragActive
                    ? "Scapa'l din click 😄"
                    : "Drag 'n' drop fisiere aici, sau click pentru a selecta fisiere din PC sau Laptop"}
                  <Upload style={{ marginTop: "2rem" }} size={42} />
                </p>

                <p
                  style={{
                    marginTop: "2rem",
                  }}
                  className="text-center pico-color-red-500"
                >
                  {uploadErr.length > 0 ? uploadErr : null}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </article>
    );
  }
}
