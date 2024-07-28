import { ArrowRepeat } from 'react-bootstrap-icons';

export function Error() {
  return (
    <div className="container" style={{marginTop: "4rem"}}>
      <h1>Oops! </h1>
      <a href="/"><ArrowRepeat/> Reincarca pagina</a>
    </div>
  );
}
