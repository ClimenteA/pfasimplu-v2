import { PageHeader } from "../components/PageHeader";
import Dropzone from "react-dropzone";
import { Upload } from "react-bootstrap-icons";
import { useRef, useState } from "react";
import { req } from "../utils";

export function Incasari() {
  const [fileDropped, setFileDropped] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const [fileName, setFileName] = useState("");
  const [urlFisierIncarcat, setUrlFisierIncarcat] = useState("");

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
      .post("/v1/incasari/incarca", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUrlFisierIncarcat(response.data.url_fisier);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(file);
  }

  return (
    <main className="container">
      <PageHeader
        title="Incasari"
        description="Aici poti aduga documentele justificative (facturi, chitante) prin care ai incasat bani oferind produse sau servicii cu PFA-ul tau."
      />

      {fileDropped ? <p>Formular</p> : null}

      {fileDropped ? (
        <div>
          <p>
            Fisierul: <span className="pico-color-amber-250">{fileName}</span> a
            fost incarcat!
          </p>
          <div>
            <iframe
              src={urlFisierIncarcat}
              width="100%"
              height="800px"
            ></iframe>
          </div>
        </div>
      ) : (
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
              setFileDropped(true);
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
      )}
    </main>
  );
}
