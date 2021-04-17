# NationStates Card Script Collection

- [NationStates Card Script Collection](#nationstates-card-script-collection)
  - [DISCLAIMER](#disclaimer)
  - [About](#about)
  - [Bugs](#bugs)
  - [Contributing](#contributing)
  - [How to install and run a script](#how-to-install-and-run-a-script)
  - [What scripts to install](#what-scripts-to-install)
  - [Description of all utilities](#description-of-all-utilities)
    - [Issues answering](#issues-answering)
    - [Auction utilities](#auction-utilities)
    - [Puppet management](#puppet-management)
    - [Card information](#card-information)
    - [UI/UX](#uiux)
    - [Custom](#custom)

---

## DISCLAIMER

All of these scripts are supposed to be legal. However, you should read the NationStates [scripting rules](https://forum.nationstates.net/viewtopic.php?p=16394966#p16394966) before using them. Please do not automate any action that should be manual.

---

## About

This is a collection of repositories by [RCES](https://github.com/dithpri/RCES), [9003](https://github.com/jmikk) and others that contain tools to help with [NationStates](https://www.nationstates.net) card farming and some general information and advice about script usage.

The maintainer of this repository is [USoVietnam](https://www.nationstates.net/nation=united_states_of_vietnam).

The [Custom](Custom) folder contains modified version of some scripts with useful features.

---

## Bugs

Please report any issue or suggest improvements on this repository and scripts in [Custom](#custom) by filing an issue. Please do not open issues on scripts in linked repositories here. Do this on those repositories instead.

---

## Contributing

Just open a pull request. Please add any script that you know but isn't listed here.

---

## How to install and run a script

This repository contains two kinds of scripts:
- Tampermonkey userscripts (`.js` in filename): These are scripts contained in the [userscripts](https://github.com/watarinishin/CardScripts/tree/master/userscripts) directory. They are made to be run *in* a browser using [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or similar browser extensions such [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/). They directly modify the NationStates web pages to your liking.
- Python scripts (`.py` in filename): These are scripts contained in the remaining part of the repository. They run outside of your browser like a regular application. They need the [Python interpreter](https://www.python.org/downloads/) in order to run.

<details>
  <summary>How to install a Tampermonkey script</summary>

**Step 1:** Download the Tampermonkey extension. ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/), [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en))

**Step 2:** After you have installed it, you will see the extension's symbol on the toolbar of your browser. Click it to open the menu.
![Imgur](https://i.imgur.com/YvlTWGs.png "Firefox Demo")

Then enter the dashboard
![Imgur]([Imgur](https://i.imgur.com/U9wXqwI.png "Firefox Demo")

**Step 3:** After you have entered the dashboard, click `Utilities` tab. The `File` section is where you can import a script file. Just click `Browse` to choose the file. Alternatively, you can install a script directly from the download link (Click `Raw` on the GitHub source code page of a script to get one if not already provided) using the `Install from URL` section.
![Imgur](https://i.imgur.com/HASJuwJ.png "Firefox Demo")

After you have finished the steps, you can view installed scripts in the `Installed userscripts` tab.
![Imgur](https://i.imgur.com/RaAs0nn.png "Firefox Demo")

Click on a script will open the script editor so you can modify the script to your liking.
![Imgur](https://i.imgur.com/TgbLx3n.png "Firefox Demo")
</details>

<details>
  <summary>How to run a Python script on Windows</summary>

**Step 1:** Download [Python](https://www.python.org/downloads/) and install it. Remember to run the installer as admin user and select the `Add Python to PATH` option. Otherwise, just click next mindlessly.

**Step 2:** To run a Python script, just double-click the file as if you run any other application. If double-clicking doesn't work, right-click the file and choose `Open With` > `Python`.
</details>

## What scripts to install

**Must have:**
- [Issue answering scripts](#issues-answering)
- [Key Code Short cuts](NS/Key%20code%20short%20cuts.user.js)
- [GoldenRetriever](https://dithpri.github.io/goldretriever-web/build/index.html)
- [ns-transfer-cleanup](ns-transfer-cleanup)

Pick one of the issue answering scripts. They work with the [Containerise](https://www.nationstates.net/page=dispatch/id=1383002) extension and make switching and answering hundreds of issues on hundreds of puppets effortless. Don't even think of farming if you don't have one of these two bad bois installed! (gotIssues is a faster way than the other but it involves more setup)

The third script provides keybinds to make tasks like junking, placing bids, asks, flip cards,... easier. It also includes a utility to create puppets with configured naming convention, password, motto,...

The fourth script outputs deck value, banks,... of your puppets so you can know what puppets have bank and valuable cards for you to harvest.

The final one helps you send transfer cards you used back to your main nation automatically.

**If you are an avid trader:**
- [Auction Utilities](#auction-utilities)

Installed all of these will provide you the full suite of tools to properly conduct trading. They provide default price settings, card organization membership highlight, and puppetmaster identification so you know who you are trading with to negotiate with them and price your cards accordingly. The Card Queue script provides a queue feature to add important cards into a queue for later processing. (Such as trading)

**If you are a collector:**
- [Region Highlighter](sitethiefs-ns-scripts/region-highlighter/region-highlighter.js)
- [r3n's Card Query](https://azure.nsr3n.info/card_queries/submit.sh) ([Advanced version](https://azure.nsr3n.info/card_queries/submit_advanced.sh))

The first script highlights cards that belong to configured regions and blocks accidental junking if you want. Useful for those who collect cards of specific regions.

The second web tool outputs cards with configured properties such as season, region, name, ownership,... and can filter out cards that have been bid on. Used to know what cards to collect.

## Description of all utilities

### Issues answering

Scripts to help answering issues faster.

* [Issue answering shortcuts](RCES/userscripts/issue_answering) - RCES: Includes NSIssueOpener, NSIssueCompactorRand, NsDilemmaAutoClose, NsDilemmaAutoCloseAll. Answer issues by clicking enter repeatly.
* [gotIssues](gotIssues) - 9003: Generate a sheet of issue answering links for you to mindlessly spam enter. The fastest method to answer issues as of now.

### Auction utilities

Scripts to assist placing asks, bids, auctioning,...

* [Card Default Prices](RCES/userscripts/auction/Card%20Default%20Prices.user.js) - RCES: Automatically set configured default price when placing asks and bids.
* Card organization highlighter - RCES: Highlight an asker or bidder with membership in [TNP Card Guild](RCES/userscripts/auction/Guildies%20Auction%20Highlighter%20UwU.user.js), [Gardener Card Society](RCES/userscripts/auction/Gardener%20Highlighter.user.js), [NASPAQ](RCES/userscripts/auction/NASPAQ%20Highlighter.user.js).
* [Main Auction Displayer](RCES/userscripts/auction/Main%20Auction%20Displayer.user.js) - RCES: Display puppetmaster name.
* [Region Highlighter](sitethiefs-ns-scripts/region-highlighter/region-highlighter.js) - [Sitethief](https://github.com/Sitethief): Highlight cards that belong to configured regions.
* [The-Price-is-right](https://github.com/jmikk/The-Price-is-right-) - 9003: Report close asks and bids so you can adjust the prices to match.
* [Card Queue](Custom/Card%20Queue.user.js) - Multiple authors: Add cards into queue and step over each of them by pressing `N`. Used for processing many cards. Modified to work with Key code short cuts.

### Puppet management

Scripts to create and manage puppets.

* [Puppet links sheet](RCES/puppet_links_sheet) - RCES: Generate an HTML sheet of your puppets with convenient access links.
* [Puppet Creation Assistant](RCES/userscripts/miscellaneous/NsPuppetCreateAssist.user.js) - RCES: Help create puppets from puppet sheet.
* [goldretriever-web](https://dithpri.github.io/goldretriever-web/build/index.html) - RCES: Web-based autologin and card stats (e.g. banks, deck information) tool for puppets.
* [ns-transfer-cleanup](ns-transfer-cleanup) - [SherpDaWerp](https://github.com/abrow425): Gift mass copy cards back to main nation after a transfer.

### Card information

Scripts that provide information about cards.

* [Owner report](RCES/owner_report) - RCES: Provide ownership data of cards.
* [Card Query](https://azure.nsr3n.info/card_queries/submit.sh) ([Advanced version](https://azure.nsr3n.info/card_queries/submit_advanced.sh))- r3n: It queries cards of defined rarities, regions, badges, askers, bidders,... Useful for both region and season collectors.

### UI/UX

* [Key code short cuts](NS/Key%20code%20short%20cuts.user.js) - 9003: Keybindings for auction and other pages where it may be useful. Press `X` to view all available keys and configurations.
* [Cards Icon / Deck page link](RCES/userscripts/miscellaneous/cards-icon.user.js) - RCES: Add card and deck page icon on NS interface.

### [Custom](custom)

Modified version of some scripts.

* [Card Queue](Custom/Card%20Queue.user.js): Add cards into queue and step over each of them by pressing `N`. Used for processing many cards. Modified to work with Key code short cuts.
* [Key code short cuts (queue support)](Custom/Key%20code%20short%20cuts%20(queue%20support).user.js): Modified version of 9003's keybind script with key for card queue adding.