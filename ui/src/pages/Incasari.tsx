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
  const { register, handleSubmit, setValue, reset } = useForm<IIncasare>();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [sursaVenitPrincipala, setSursaVenitPrincipala] = useState(true);

  useEffect(() => {
    setValue("id", data.id);
    setValue("serie_factura", data.serie_factura);
    setValue("numar_factura", data.numar_factura);
    setValue(
      "sursa_venit",
      data.sursa_venit || "Venit din activitati independente"
    );
    setValue("suma_incasata", data.suma_incasata);
    setValue("adaugat_la", data.adaugat_la);
    setValue("tip_tranzactie", data.tip_tranzactie);
    setValue("data_emitere_factura", data.data_emitere_factura)
    setValue(
      "data_incasare",
      data.data_incasare !== undefined ? data.data_incasare.substring(0, 10) : ""
    );
  }, [data]);

  const onSubmit: SubmitHandler<IIncasare> = (data) => {
    const payload = { ...data };
    console.log("formdata:", payload, data);

    setLoading(true);

    req
      .post("/v1/incasari/salveaza", payload)
      .then(function (response) {
        setLoading(false);
        if (response.status == 200) {
          setSaveStatus("Datele au fost salvate!");
          reset();
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
              Daca ai incasari din alte surse decat din emitere facturi/bonuri
              selecteaza o alta sursa a venitului.
              Completeaza 'Data incasare' doar daca ai incasat banii, lasa gol daca nu ai incasat inca banii.
            </p>
          </hgroup>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label style={{ marginBottom: "2rem" }}>
              Sursa venitului
              <select
                {...register("sursa_venit", { required: true })}
                onChange={(e) => {
                  setSursaVenitPrincipala(
                    e.target.value == "Venit din activitati independente"
                  );
                }}
              >
                <option value="Venit din activitati independente">
                  Venit din activitati independente (activitatea ta de baza ca
                  PFA)
                </option>
                <option value="Venit din alte surse">
                  Venit din alte surse
                </option>
                <option value="Venit din cedarea folosintei bunurilor">
                  Venit din cedarea folosintei bunurilor (Chirii, Inchirieri,
                  etc.)
                </option>
                <option value="Venit si/sau castig din investitii">
                  Venit si/sau castig din investitii (Loto, Pariuri, Trading
                  etc.)
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

            <div className={sursaVenitPrincipala ? "grid" : "hidden"}>
              <label>
                Serie factura
                <input
                  style={{ textTransform: "uppercase" }}
                  type="text"
                  {...register("serie_factura", {
                    required: sursaVenitPrincipala,
                  })}
                />
              </label>

              <label>
                Numar factura
                <input
                  type="number"
                  {...register("numar_factura", {
                    required: sursaVenitPrincipala,
                  })}
                />
              </label>

              <label>
                Data emitere factura
                <input
                  type="date"
                  {...register("data_emitere_factura", { required: sursaVenitPrincipala })}
                />
              </label>

            </div>

            <div className="grid" style={{ alignItems: "center" }}>
              <label>
                Suma incasata (RON)
                <input
                  type="number"
                  step="any"
                  {...register("suma_incasata", { required: true })}
                />
              </label>

              <label>
                Tip Tranzactie
                <select {...register("tip_tranzactie", { required: true })}>
                  <option value="BANCAR">💳 BANCAR</option>
                  <option value="NUMERAR">💵 NUMERAR</option>
                </select>
              </label>

              <label> 
                Data incasare
                <input
                  type="date"
                  {...register("data_incasare", { required: false })}
                />
              </label>

            </div>

            <div style={{ marginTop: "2rem" }}>
              <button type="submit" disabled={loading}>
                <Save /> Salveaza
              </button>
              <p className="pico-color-zinc-450 text-center">
                {loading && saveStatus.length > 0 ? "Se salveaza..." : null}
                {saveStatus.length > 0 ? saveStatus : null}
              </p>
            </div>
          </form>
        </article>
      ) : null}

      <FileUploader
        uploadUrl={"/v1/fisiere/incarca?tipFisier=FISIER_INCASARE"}
      />
    </main>
  );
}
