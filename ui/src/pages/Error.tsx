import { ArrowLeft } from 'react-bootstrap-icons';

export function Error() {
  return (
    <div className="container" style={{marginTop: "4rem"}}>
      <h1>🛑 Aceasta pagina nu a putut fi gasita!</h1>
      <a href="/"><ArrowLeft/> Revino la pagina principala</a>
    </div>
  );
}
