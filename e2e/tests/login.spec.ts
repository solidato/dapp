import { expect, test } from "@playwright/test";
import { MetaMask, testWithSynpress, unlockForFixture } from "@synthetixio/synpress";

import BasicSetup from "../wallet-setup/basic.setup";

const walletTest = testWithSynpress(BasicSetup, unlockForFixture);
const { expect: walletExpect } = test;

// see https://github.com/Synthetixio/synpress/issues/1103
walletTest.fixme("login just with the wallet (account in DAO)", async ({ context, page, extensionId }) => {
  const metamask = new MetaMask(context, page, BasicSetup.walletPassword, extensionId);

  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Connect wallet" }).click();
  await page.getByRole("button", { name: "MetaMask MetaMask" }).first().click();
  await metamask.connectToDapp();

  await walletExpect(page.getByRole("button", { name: "Log in to odoo with wallet" })).toBeVisible();
  await walletExpect(page.getByRole("button", { name: "Log in with username and" })).toBeVisible();
});
