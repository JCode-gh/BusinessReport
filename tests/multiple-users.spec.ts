import {expect, test, type Browser, type Page} from "@playwright/test";

type UserScenario = {
  businessName: string;
  market: string;
  businessType: string;
  offer: string;
  audience: string;
  problem: string;
  goal: string;
  channels: string;
  pricePoint: string;
};

const users: UserScenario[] = [
  {
    businessName: "Atlas Groei Studio",
    market: "Antwerpen en Gent",
    businessType: "B2B groeistudio voor accountantskantoren die meer adviesklanten willen aantrekken",
    offer: "Een 14-daagse positionering- en landingspagina-sprint met LinkedIn opvolging",
    audience: "Accountantskantoren met 8 tot 35 medewerkers die willen doorgroeien naar advieswerk",
    problem: "Ze krijgen veel prijsgevoelige leads en hebben weinig bewijs rond hun advieswaarde",
    goal: "Binnen 30 dagen tien gekwalificeerde adviesgesprekken boeken",
    channels: "LinkedIn, e-mail, referrals, website",
    pricePoint: "Huidige projecten 2500 EUR, doelpakket 6500 EUR",
  },
  {
    businessName: "Helder Zorg Marketing",
    market: "Nederland",
    businessType: "Marketingpartner voor zelfstandige zorgpraktijken",
    offer: "Een website- en intakeflow die nieuwe patientaanvragen filtert en opvolgt",
    audience: "Fysiotherapie- en osteopathiepraktijken met wachtlijsten maar zwakke online opvolging",
    problem: "Nieuwe aanvragen komen versnipperd binnen en worden te laat opgevolgd",
    goal: "Meer passende intakes boeken zonder extra administratieve druk",
    channels: "Google, website, e-mail, lokale partners",
    pricePoint: "Retainer van 1200 tot 2200 EUR per maand",
  },
];

test("multiple users can generate isolated reports through the live API at the same time", async ({browser}) => {
  const results = await Promise.all(users.map((user) => generateReportAsUser(browser, user)));

  expect(results).toEqual(
    users.map((user) => ({
      businessName: user.businessName,
      fileName: `${slugify(`${user.businessName} groeikit`)}.html`,
      reportTitle: `${user.businessName} groeikit`,
    })),
  );
});

async function generateReportAsUser(browser: Browser, user: UserScenario) {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("/");
    await expect(page.getByRole("heading", {name: "Ondernemers Groeikit"})).toBeVisible();

    await fillBrief(page, user);

    const apiRequestPromise = page.waitForRequest(
      (request) => request.url().includes("generativelanguage.googleapis.com"),
      {timeout: 10_000},
    );
    const reportPopupPromise = page.waitForEvent("popup", {timeout: 90_000}).catch(() => null);
    await page.getByRole("button", {name: "Groeikit genereren"}).click();

    const apiRequest = await apiRequestPromise;
    expect(apiRequest.method()).toBe("POST");

    await expect(page.getByRole("heading", {name: "Je Growth Kit is klaar."})).toBeVisible({timeout: 240_000});

    const expectedFileName = `${slugify(`${user.businessName} groeikit`)}.html`;
    await expect(page.getByRole("heading", {name: expectedFileName, exact: true})).toBeVisible();

    const reportPage = await reportPopupPromise;
    if (reportPage) {
      await reportPage.waitForLoadState("domcontentloaded");
      await expect(reportPage.locator("h1")).toHaveText(`${user.businessName} groeikit`);
    }

    return {
      businessName: user.businessName,
      fileName: expectedFileName,
      reportTitle: `${user.businessName} groeikit`,
    };
  } finally {
    await context.close();
  }
}

async function fillBrief(page: Page, user: UserScenario) {
  await page.getByLabel("Bedrijfsnaam", {exact: true}).fill(user.businessName);
  await page.getByLabel("Markt", {exact: true}).fill(user.market);
  await page.getByLabel("Type bedrijf", {exact: true}).fill(user.businessType);
  await page.getByLabel("Huidig aanbod", {exact: true}).fill(user.offer);
  await page.getByLabel("Doelklant", {exact: true}).fill(user.audience);
  await page.getByLabel("Belangrijkste probleem", {exact: true}).fill(user.problem);
  await page.getByLabel("Doel", {exact: true}).fill(user.goal);
  await page.getByLabel("Kanalen", {exact: true}).fill(user.channels);
  await page.getByLabel("Prijsniveau", {exact: true}).fill(user.pricePoint);
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "business-growth-kit";
}
