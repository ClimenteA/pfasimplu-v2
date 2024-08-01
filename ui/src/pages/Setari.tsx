import { PFADataForm } from "../components/PFADataForm";
import { PageHeader } from "../components/PageHeader";


// https://mfinante.gov.ro/apps/agenticod.html?pagina=domenii
export function Setari() {
  return (
    <main className="container">
      <PageHeader title="⚙️ Setari" description="Aici poti modifica variabilele care stau la baza calculelor pentru
          impozite, taxe, crearea de declaratii samd."/>
      <PFADataForm />
    </main>
  );
}
