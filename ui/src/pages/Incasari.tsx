import { PageHeader } from "../components/PageHeader";
import { FileUploader } from "../components/FileUploader";
import { useStoreFileUpload } from "../store/incasari";
import { useForm, SubmitHandler } from "react-hook-form";
import { IIncasare } from "../store/incasari";
import { useEffect, useState } from "react";
import { req } from "../utils";
import { Save } from "react-bootstrap-icons";


export function Incasari() {
  const { data, fileDropped } = useStoreFileUpload();
  const { register, handleSubmit, setValue, getValues } = useForm<IIncasare>();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    setValue("id", data.id);
    setValue("serie", data.serie);
    setValue("numar", data.numar);
    setValue("sursa_venit", data.sursa_venit);
    setValue("suma_incasata", data.suma_incasata);
    setValue("adaugat_la", data.adaugat_la);
  }, [data]);


  const onSubmit: SubmitHandler<IIncasare> = (data) => {
    const payload = { ...data };
    console.log("formdata:", payload);

    setLoading(true);

    req
      .post("/v1/incasari/salveaza", payload)
      .then(function (response) {
        setLoading(false);
        if (response.status == 200) {
          setSaveStatus("Datele au fost salvate!");
        }
      })
      .catch(function (error) {
        setLoading(false);
        setSaveStatus(
          "Nu am putut salva datele... Asigura-te ca ai completat formularul corect."
        );
        setTimeout(() => setSaveStatus(""), 5000);
        console.log(error);
      });
  };

  return (
    <main className="container">
      <PageHeader
        title="Incasari"
        description="Aici poti aduga documentele justificative (facturi, chitante) prin care ai incasat bani oferind produse sau servicii cu PFA-ul tau."
      />
      {fileDropped ? (
        <article
          style={{
            marginTop: "4rem",
            borderRadius: "0.375rem",
            padding: "2rem 2rem 1rem 2rem",
          }}
        >
          <hgroup style={{ textAlign: "left", marginBottom: "2rem" }}>
            <h2>Incasare</h2>
            <p style={{ marginTop: "1rem" }}>
              Completeaza detaliile acestei incasari in formularul de mai jos.
              Daca ai incasari din alte surse decat emitere facturi/bonuri
              selecteaza o alta sursa a venitului. 
            </p>
          </hgroup>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="sursa_venit">
              Sursa venitului
              <select defaultValue="Venit din activitati independente" id="sursa_venit" {...register("sursa_venit")} onInput={() => console.log("helooo:", getValues("sursa_venit"))} required>
                <option value="Venit din activitati independente">
                  Venit din activitati independente (activitatea ta de baza ca PFA)
                </option>
                <option value="Venit din alte surse">
                  Venit din alte surse
                </option>
                <option value="Venit din cedarea folosintei bunurilor">
                  Venit din cedarea folosintei bunurilor
                </option>
                <option value="Venit si/sau castig din investitii">
                  Venit si/sau castig din investitii
                </option>
                <option value="Venit din drepturi de proprietate intelectuala">
                  Venit din drepturi de proprietate intelectuala
                </option>
                <option value="Venit din activitati agricole, silvicultura si piscicultura">
                  Venit din activitati agricole, silvicultura si piscicultura
                </option>
                <option value="Venit distribuit din asociere cu persoane juridice, contribuabili potrivit prevederilor titlului II, titlului III sau Legii nr.170/2016">
                  Venit distribuit din asociere cu persoane juridice,
                  contribuabili potrivit prevederilor titlului II, titlului III
                  sau Legii nr.170/2016
                </option>
              </select>
            </label>

            <div style={{ marginTop: "2rem" }}>
              <button type="submit" disabled={loading}>
                <Save /> Salveaza incasarea
              </button>
              <p className="pico-color-zinc-450 text-center">
                {loading && saveStatus.length > 0 ? "Se salveaza..." : null}
                {saveStatus.length > 0 ? saveStatus : null}
              </p>
            </div>

{/* 
            <div className="grid">
              <div className="grid">
                <label htmlFor="serie">
                  Serie factura
                  <input
                    style={{ textTransform: "uppercase" }}
                    type="text"
                    id="serie"
                    name="serie"
                    value="{{.UltimaSerie}}"
                    placeholder="INV"
                    required
                  />
                </label>

                <label htmlFor="numar">
                  Numar factura
                  <input type="number" id="numar" placeholder="123" required />
                </label>
              </div>

              <label htmlFor="tip_tranzactie">
                Tip Tranzactie
                <select id="tip_tranzactie" name="tip_tranzactie" required>
                  <option value="BANCAR" selected>
                    BANCAR
                  </option>
                  <option value="NUMERAR">NUMERAR</option>
                </select>
              </label>
            </div>

            <div className="grid">
              <label htmlFor="suma_incasata">
                Suma incasata (RON)
                <input
                  type="number"
                  id="suma_incasata"
                  step="any"
                  name="suma_incasata"
                  placeholder="5000"
                  required
                />
              </label>

              <label htmlFor="data">
                Data factura
                <input type="date" id="data" name="data" required />
              </label>
            </div>

            */}
          </form>
        </article>
      ) : null}

      <FileUploader
        uploadUrl={"/v1/fisiere/incarca?tipFisier=FISIER_INCASARE"}
      />
    </main>
  );
}
