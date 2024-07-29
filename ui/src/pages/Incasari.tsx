import { PageHeader } from "../components/PageHeader";
import { FileUploader } from "../components/FileUploader";
import { useStoreFileUpload } from "../store/incasari";

export function Incasari() {
  const { data, fileDropped } = useStoreFileUpload();

  return (
    <main className="container">
      <PageHeader
        title="Incasari"
        description="Aici poti aduga documentele justificative (facturi, chitante) prin care ai incasat bani oferind produse sau servicii cu PFA-ul tau."
      />
      {fileDropped ? <p>Formular {data.numar}</p> : null}
      <FileUploader uploadUrl={"/v1/fisiere/incarca?tipFisier=FISIER_INCASARE"} />
    </main>
  );
}
