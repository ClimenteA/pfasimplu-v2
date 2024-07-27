import { useState } from "react";
import { PlusLg, Save } from "react-bootstrap-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { req } from "../utils";

// type VariabileAnuale = {
//   an: string;
//   valoare: string;
// };

// type Setari = {
//   numePfa: string;
//   adresaPfa: string;
//   emailPfa: string;
//   telefonPfa: string;
//   cifVatPfa: string;
//   codCaenPrincipal: string;
//   coduriCaenSecundare: string[];
//   praguriMijloaceFixe: VariabileAnuale[];
//   salariiMinimBrute: VariabileAnuale[];
//   plafoaneTVA: VariabileAnuale[];
// };

interface IFormInput {
  nume: string;
  adresa: string;
  nrRegCom: string;
  cifVatCui: string;
  telefon: string;
  email: string;
  iban: string;
  caenPrincipal: string;
}

// https://mfinante.gov.ro/apps/agenticod.html?pagina=domenii
export function Setari() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [caenSecundarSelectat, setCaenSecundarSelectat] = useState("");
  const [caenSecundar, setCaenSecundar] = useState<string[]>([]);
  
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const payload = {...data, caenSecondar: caenSecundar}

    // req.post()

    console.log("formdata:", payload)
  };

  function handleAdaugaCAENSecondar() {
    if (!caenSecundarSelectat) return;
    if (caenSecundar.includes(caenSecundarSelectat)) return;
    setCaenSecundar([...caenSecundar, caenSecundarSelectat]);
  }

  function handleScoateCaenSecundar(caen: string) {
    setCaenSecundar(caenSecundar.filter((c) => c !== caen));
  }

  return (
    <main className="container">
      <hgroup style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Setari</h2>
        <p>
          Aici poti modifica variabilele care stau la baza calculelor pentru
          impozite, taxe, crearea de declaratii samd.
        </p>
      </hgroup>

      <form onSubmit={handleSubmit(onSubmit)}>
        <article
          style={{
            marginTop: "4rem",
            borderRadius: "0.375rem",
            padding: "4rem 2rem 4rem 2rem",
          }}
        >
          <p className="secondary text-bold">Datele PFA-ului tau:</p>
          <div className="grid">
            <input
              type="text"
              placeholder="Nume"
              aria-label="Text"
              {...register("nume")}
            />
            <input
              type="text"
              placeholder="Adresa"
              aria-label="Text"
              {...register("adresa")}
            />
          </div>
          <div className="grid">
            <input
              type="text"
              placeholder="Nr.Reg.Com."
              aria-label="Text"
              {...register("nrRegCom")}
            />
            <input
              type="text"
              placeholder="CIF/VAT"
              aria-label="Text"
              {...register("cifVatCui")}
            />
          </div>
          <div className="grid">
            <input
              type="text"
              placeholder="Telefon"
              aria-label="Text"
              {...register("telefon")}
            />
            <input
              type="email"
              placeholder="Email"
              aria-label="Text"
              {...register("email")}
            />
          </div>
          <div className="grid">
            <input
              type="text"
              placeholder="IBAN"
              aria-label="Text"
              {...register("iban")}
            />
            <input
              type="text"
              placeholder="Cod CAEN Principal"
              aria-label="Text"
              {...register("caenPrincipal")}
            />
          </div>

          <p style={{ marginTop: "2rem" }} className="secondary text-bold">
            Coduri CAEN secundare:
          </p>

          <div className="grid">
            <input
              type="text"
              name="text"
              value={caenSecundarSelectat}
              onChange={(e) => setCaenSecundarSelectat(e.target.value)}
              placeholder="Cod CAEN Secundar"
              aria-label="Cod CAEN Secundar"
            />
            <button
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
                <div key={caen} className="grid">
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

          <button style={{ marginTop: "2rem" }} type="submit">
            <Save /> Salveaza datele PFA
          </button>
        </article>
      </form>
    </main>
  );
}
