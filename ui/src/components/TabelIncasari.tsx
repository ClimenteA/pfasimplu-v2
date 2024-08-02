import { req } from "../utils";
import { useEffect, useState } from "react";
import { Trash, ArrowDownUp, PencilSquare } from "react-bootstrap-icons";
import { useStoreIncasariFileUpload } from "../store/incasari";
import { IIncasare } from "../store/incasari";

async function getIncasari(page: number) {
  try {
    const response = await req.get(`/v1/incasari/salvate?page=${page}`);
    const insasariData: IIncasare[] = response.data;
    console.log(insasariData);
    return insasariData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function TabelIncasari() {
  const {
    setData,
    setFileWasDropped,
    modificaIncasare,
    resetModificaIncasare,
  } = useStoreIncasariFileUpload();
  const [page, setPage] = useState(1);
  const [incasari, setIncasari] = useState<IIncasare[]>([]);

  useEffect(() => {
    getIncasari(page).then((response) => {
      if (response != null) {
        setIncasari(response);
      }
    });
  }, [page, modificaIncasare]);

  function handleRowModify(incasare: IIncasare) {
    console.log(incasare);
    setData(incasare);
    setFileWasDropped();
    resetModificaIncasare();
    window.scrollTo({ top: 0 });
  }

  return (
    <div style={{ marginTop: "4rem", marginBottom: "6rem" }}>
      <table>
        <thead>
          <tr>
            <th>Sterge</th>
            <th style={{ cursor: "pointer" }}>
              Data <ArrowDownUp />
            </th>
            <th style={{ cursor: "pointer" }}>
              Suma incasata <ArrowDownUp />
            </th>
            <th style={{ cursor: "pointer" }}>
              Tip tranzactie <ArrowDownUp />
            </th>
            <th style={{ cursor: "pointer" }}>
              Data incasare <ArrowDownUp />
            </th>
            <th>Modifica</th>
          </tr>
        </thead>
        <tbody>
          {incasari.map((i) => {
            return (
              <tr id={String(i.id)} key={i.id}>
                <td>
                  <button
                    className="pico-background-fuchsia-750"
                    style={{ marginTop: "1rem" }}
                    type="button"
                  >
                    <Trash />
                  </button>
                </td>
                <th>{i.modificat_la ? i.modificat_la.substring(0, 10) : ""}</th>
                <td>
                  {i.suma_incasata} {i.moneda}
                </td>
                <td>{i.tip_tranzactie}</td>
                <td>
                  {i.data_incasare ? (
                    i.data_incasare
                  ) : (
                    <input style={{ marginTop: "1rem" }} type="date" />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleRowModify(i)}
                    className="secondary"
                    style={{ marginTop: "1rem" }}
                    type="button"
                  >
                    <PencilSquare />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
