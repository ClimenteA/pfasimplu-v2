import { PFADataForm } from "../components/PFADataForm";

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

// https://mfinante.gov.ro/apps/agenticod.html?pagina=domenii
export function Setari() {
  return (
    <main className="container">
      <hgroup style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Setari</h1>
        <p>
          Aici poti modifica variabilele care stau la baza calculelor pentru
          impozite, taxe, crearea de declaratii samd.
        </p>
      </hgroup>

      <PFADataForm />
    </main>
  );
}
