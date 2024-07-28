import { PFADataForm } from "../components/PFADataForm";

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
