import { req } from "../utils";
import { useEffect, useState } from "react";
import {
  Trash,
  PencilSquare,
  FiletypeCsv,
  FiletypeXlsx,
} from "react-bootstrap-icons";
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

async function download(table: string, tipDescarcare: string) {
  try {
    const response = await req.get(
      `/v1/fisiere/descarca/${table}?tip_descarcare=${tipDescarcare}`,
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${table}.${tipDescarcare}`;
    link.click();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function downloadIncasariCSV() {
  return await download("incasaritabel", "CSV");
}

async function downloadIncasariXLSX() {
  return await download("incasaritabel", "XLSX");
}

async function deleteIncasare(incasareId: number) {
  try {
    const response = await req.delete(
      `/v1/incasari/sterge?incasare_id=${incasareId}`
    );
    const rowsDeleted: number = response.data;
    console.log(rowsDeleted);
    return rowsDeleted == 1;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function TabelIncasari() {
  const {
    fileDropped,
    setData,
    setFileWasDropped,
    modificaIncasare,
    resetModificaIncasare,
    setModificaIncasare,
  } = useStoreIncasariFileUpload();
  const [page, setPage] = useState(1);
  const [incasari, setIncasari] = useState<IIncasare[]>([]);

  useEffect(() => {
    resetModificaIncasare();
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

  function handleRowDelete(incasareId: number) {
    console.log("delete incasari row", incasareId);
    deleteIncasare(incasareId).then((response) => {
      if (response) {
        setModificaIncasare();
      }
    });
  }

  return (
    <div style={{ marginTop: "4rem", marginBottom: "6rem" }}>
      {incasari.length == 0 ? (
        <p className="text-center pico-color-zinc-450">
          Nici o incasare adaugata.
        </p>
      ) : (
        <div>

          <div style={{ marginBottom: "4rem" }} role="group">
            <button
              onClick={downloadIncasariCSV}
              className="outline secondary"
              type="button"
            >
              <FiletypeCsv /> Descarca incasari CSV{" "}
            </button>
            <button
              onClick={downloadIncasariXLSX}
              className="outline secondary"
              type="button"
            >
              <FiletypeXlsx /> Descarca incasari XLSX
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Sterge</th>
                <th style={{ cursor: "pointer", userSelect: "none" }}>
                  Data Modificare
                </th>
                <th style={{ cursor: "pointer", userSelect: "none" }}>
                  Suma incasata
                </th>
                <th style={{ cursor: "pointer", userSelect: "none" }}>
                  Tip tranzactie
                </th>
                <th style={{ cursor: "pointer", userSelect: "none" }}>
                  Data incasare
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
                        disabled={fileDropped}
                        onClick={() => (i.id ? handleRowDelete(i.id) : null)}
                        className="pico-background-fuchsia-750"
                        style={{ marginTop: "1rem" }}
                        type="button"
                      >
                        <Trash />
                      </button>
                    </td>
                    <th>
                      ID{i.id}.{" "}
                      {i.modificat_la ? i.modificat_la.substring(0, 10) : ""}
                    </th>
                    <td>
                      {i.suma_incasata} {i.moneda}
                    </td>
                    <td>{i.tip_tranzactie}</td>
                    <td>{i.data_incasare}</td>
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
      )}
    </div>
  );
}
