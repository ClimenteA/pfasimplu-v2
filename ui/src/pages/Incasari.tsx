import { PageHeader } from "../components/PageHeader";
import { FileUploader } from "../components/FileUploader";
import { useStoreFileUpload } from "../store/incasari";
import { useForm, SubmitHandler } from "react-hook-form";
import { IIncasare } from "../store/incasari";
import { useEffect, useState } from "react";
import { req } from "../utils";
import { Save } from "react-bootstrap-icons";

export function Incasari() {
  const { data, fileDropped, resetFileDropped } = useStoreFileUpload();
  const { register, handleSubmit, setValue, reset } = useForm<IIncasare>();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    setValue("sursa_venit", "Venit din activitati independente");
    setValue("id", data.id);
    setValue("nume_fisier", data.nume_fisier)
    setValue("moneda", "RON");
    setValue("tip_tranzactie", "BANCAR");
  }, [data]);

  const onSubmit: SubmitHandler<IIncasare> = (payload) => {
    console.log("save data:", payload);

    setLoading(true);

    req
      .post("/v1/incasari/salveaza", payload)
      .then(function (response) {
        setLoading(false);
        if (response.status == 200) {
          setSaveStatus("Datele au fost salvate!");
          reset();
          setTimeout(() => {
            setSaveStatus("");
            resetFileDropped();
          }, 1000);
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
        title="💰 Incasari"
        description="
        Aici poti aduga documentele justificative (facturi, chitante) prin care ai incasat bani oferind produse sau servicii cu PFA-ul tau.
        In cazul incasarilor in alta moneda decat RON conversia va fi facuta automat la cursul zilei anterioare setata in campul 'Data incasarii'.
        Daca ai incasari din alte surse decat din emitere facturi/bonuri selecteaza o alta sursa a venitului. Completeaza 'Data incasare' doar daca ai incasat banii, lasa campul gol daca nu ai incasat inca (vei putea modifica mai tarziu).
        "
      />
      {fileDropped ? (
        <article
          style={{
            marginTop: "4rem",
            borderRadius: "0.375rem",
            padding: "2rem 2rem 1rem 2rem",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <label style={{ marginBottom: "2rem" }}>
              Sursa venitului
              <select {...register("sursa_venit", { required: true })}>
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

            <div className="grid" style={{ alignItems: "center" }}>
              <div className="grid">
                <label>
                  Suma incasata
                  <input
                    type="number"
                    step="any"
                    {...register("suma_incasata", { required: true })}
                  />
                </label>

                <label>
                  Moneda
                  <select {...register("moneda", { required: true })}>
                    <option value="RON">RON</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="CHF">CHF</option>
                    <option value="CAD">CAD</option>
                    <option value="AED">AED</option>
                    <option value="AUD">AUD</option>
                    <option value="BGN">BGN</option>
                    <option value="BRL">BRL</option>
                    <option value="CNY">CNY</option>
                    <option value="CZK">CZK</option>
                    <option value="DKK">DKK</option>
                    <option value="EGP">EGP</option>
                    <option value="HUF">HUF</option>
                    <option value="INR">INR</option>
                    <option value="JPY">JPY</option>
                    <option value="KRW">KRW</option>
                    <option value="MDL">MDL</option>
                    <option value="MXN">MXN</option>
                    <option value="NOK">NOK</option>
                    <option value="NZD">NZD</option>
                    <option value="PLN">PLN</option>
                    <option value="RSD">RSD</option>
                    <option value="RUB">RUB</option>
                    <option value="SEK">SEK</option>
                    <option value="THB">THB</option>
                    <option value="TRY">TRY</option>
                    <option value="UAH">UAH</option>
                    <option value="XAU">XAU</option>
                    <option value="XDR">XDR</option>
                    <option value="ZAR">ZAR</option>
                  </select>
                </label>
              </div>

              <div className="grid">
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
            </div>

            <div style={{ marginTop: "2rem" }}>
              <button type="submit" disabled={loading || saveStatus.length > 0}>
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

      <FileUploader />
    </main>
  );
}
