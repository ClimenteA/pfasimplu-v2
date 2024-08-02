import { PageHeader } from "../components/PageHeader";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { PlusLg, Save } from "react-bootstrap-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { req } from "../utils";

interface IFormInput {
  id?: number;
  nume: string;
  adresa: string;
  nrRegCom: string;
  cifVatCui: string;
  telefon: string;
  email: string;
  iban: string;
  caenPrincipal: string;
  caenSecondar?: string;
  actualizat_la?: string;
}


// https://mfinante.gov.ro/apps/agenticod.html?pagina=domenii
export function Setari() {
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [saveStatus, setSaveStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [caenSecundarSelectat, setCaenSecundarSelectat] = useState("");
  const [caenSecundar, setCaenSecundar] = useState<string[]>([]);
  const [actualizatLa, setActualizatLa] = useState("");

  function humanDate(date?: string) {
    if (date) {
      const formattedDate = dayjs(date).format("DD-MM-YYYY");
      setActualizatLa(formattedDate);
    }
  }

  useEffect(() => {
    req
      .get("/v1/setari/date-pfa")
      .then(function (response) {
        const pfaData: IFormInput = response.data;
        console.log(pfaData);

        if (pfaData.caenSecondar != undefined) {
          if (pfaData.caenSecondar.length != 0) {
            console.log(pfaData.caenSecondar.split(", "));
            setCaenSecundar(pfaData.caenSecondar.split(", "));
          }
        }

        if (pfaData.id !== null) {
          setValue("nume", pfaData.nume);
          setValue("adresa", pfaData.adresa);
          setValue("nrRegCom", pfaData.nrRegCom);
          setValue("cifVatCui", pfaData.cifVatCui);
          setValue("telefon", pfaData.telefon);
          setValue("email", pfaData.email);
          setValue("iban", pfaData.iban);
          setValue("caenPrincipal", pfaData.caenPrincipal);
          humanDate(pfaData.actualizat_la);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const payload = { ...data, caenSecondar: caenSecundar.join(", ") };
    console.log("formdata:", payload);

    setLoading(true);

    req
      .post("/v1/setari/date-pfa", payload)
      .then(function (response) {
        setLoading(false);
        if (response.status == 200) {
          humanDate(response.data.actualizat_la);
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

  function handleAdaugaCAENSecondar() {
    if (!caenSecundarSelectat) return;
    if (caenSecundar.includes(caenSecundarSelectat)) return;
    setCaenSecundar([...caenSecundar, caenSecundarSelectat]);
    setCaenSecundarSelectat("");
  }

  function handleScoateCaenSecundar(caen: string) {
    setCaenSecundar(caenSecundar.filter((c) => c !== caen));
  }

  return (
    <main className="container">
      <PageHeader
        title="⚙️ Setari"
        description="Aici poti modifica variabilele care stau la baza calculelor pentru
          impozite, taxe, crearea de declaratii samd."
      />
      <article
        style={{
          marginTop: "4rem",
          borderRadius: "0.375rem",
          padding: "2rem 2rem 1rem 2rem",
        }}
      >
        <hgroup style={{ textAlign: "left", marginBottom: "2rem" }}>
          <p style={{ marginTop: "0.5rem", fontSize: "12px" }}>
            Aici poti modifica datele PFA-ului tau (nume, cif, vat etc.). Datele
            sunt utile pentru completarea declaratiilor si a facturilor.
            {actualizatLa
              ? `Ultima actualizare a fost la: ${actualizatLa}.`
              : null}
          </p>
        </hgroup>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-bold">Datele PFA-ului tau:</p>
          <div className="grid">
            <input
              type="text"
              placeholder="Nume"
              aria-label="Nume"
              {...register("nume")}
            />
            <input
              type="text"
              placeholder="Adresa"
              aria-label="Adresa"
              {...register("adresa")}
            />
          </div>
          <div className="grid">
            <input
              type="text"
              placeholder="Nr.Reg.Com."
              aria-label="Nr.Reg.Com."
              {...register("nrRegCom")}
            />
            <input
              type="text"
              placeholder="CIF/VAT"
              aria-label="CIF/VAT"
              {...register("cifVatCui")}
            />
          </div>
          <div className="grid">
            <input
              type="text"
              placeholder="Telefon"
              aria-label="Telefon"
              {...register("telefon")}
            />
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              {...register("email")}
            />
          </div>
          <div className="grid">
            <input
              type="text"
              placeholder="IBAN"
              aria-label="IBAN"
              {...register("iban")}
            />
            <input
              type="text"
              placeholder="Cod CAEN Principal"
              aria-label="Cod CAEN Principal"
              {...register("caenPrincipal")}
            />
          </div>

          <p style={{ marginTop: "2rem" }} className="text-bold">
            Coduri CAEN secundare:
          </p>

          <div className="grid">
            <input
              type="text"
              value={caenSecundarSelectat}
              onChange={(e) => setCaenSecundarSelectat(e.target.value)}
              placeholder="Cod CAEN Secundar"
              aria-label="Cod CAEN Secundar"
            />
            <button
              data-testid="adauga-caen-secundar"
              onClick={handleAdaugaCAENSecondar}
              className="secondary"
              type="button"
            >
              <PlusLg /> Adauga CAEN secundar
            </button>
          </div>

          {caenSecundar.length > 0 ? (
            <p className="pico-color-zinc-450">
              Click pe CAEN pentru a-l sterge
            </p>
          ) : null}

          <div className="grid">
            {caenSecundar.map((caen) => {
              return (
                <div data-testid={caen} key={caen} className="grid">
                  <button
                    onClick={() => handleScoateCaenSecundar(caen)}
                    className="pico-background-red-650"
                    type="button"
                  >
                    {caen}
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button
              data-testid="salveaza-datele-pfa"
              type="submit"
              disabled={loading}
            >
              <Save /> Salveaza datele PFA
            </button>
            <p
              data-testid="save-message"
              className="pico-color-zinc-450 text-center"
            >
              {loading && saveStatus.length > 0 ? "Se salveaza..." : null}
              {saveStatus.length > 0 ? saveStatus : null}
            </p>
          </div>
        </form>
      </article>
    </main>
  );
}
