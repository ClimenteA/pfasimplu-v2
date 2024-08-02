import { test, expect } from "@playwright/test";

test("Fill date pfa", async ({ page }) => {
  await page.goto("http://localhost:5173/setari");

  await page.getByPlaceholder("Nume").fill("Alin Climente PFA");
  await page.getByPlaceholder("Adresa").fill("Iasi, Sos. Principala Nr.189, ap.5, et.1");
  await page.getByPlaceholder("Nr.Reg.Com.").fill("F22/1029/2020");
  await page.getByPlaceholder("CIF/VAT").fill("(RO)43000098");
  await page.getByPlaceholder("Telefon").fill("0745454545");
  await page.getByPlaceholder("Email").fill("alinpfa@gmail.com");
  await page.getByPlaceholder("IBAN").fill("RO05INGB00002222111199999");
  await page.getByPlaceholder("Cod CAEN Principal").fill("6201");
  await page.getByPlaceholder("Cod CAEN Secundar").fill("4732");
  await page.getByTestId("adauga-caen-secundar").click();
  await page.getByTestId("salveaza-datele-pfa").click();
  let saveMsg = await page.getByTestId("save-message");
  await expect(saveMsg).toContainText('Datele au fost salvate!');
  
});
