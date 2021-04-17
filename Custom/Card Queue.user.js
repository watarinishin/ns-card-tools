// ==UserScript==
// @namespace    NS_Cards_Queue_Script
// @name         NS Card Queue (9003 Key shortcut)
// @version      1.2.2
// @description  A queue to put the url of cards from packs and load them later from another card, now also able to add cards from the query page and the advanced query page, and with the option to go to different parts of the page
// @author       Anozia
// @contributors Racoda, DGES, Sitethief, borromeanWhyKnot (y0), USoVietnam (Key code short cuts support)
// @include      *azure.nsr3n.info/card_queries/*
// @include      *www.nationstates.net/*
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @run-at       document-idle
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// ==/UserScript==

/*
* Keybinds:
* [n]ext queue item
*/

/*
* change line 30 to one of the following options to change the viewing mode
* var mode = ""
* mode = "/owners=1"
* mode = "/finds_history=1"
* mode = "/trades_history=1"
* mode = "/show_collections=1"
*/

var mode = "";

(async function() {
    // next queue item
    Mousetrap.bind(['n', 'N'], function(event) {
        get_next_element_in_queue(event);

    });
    var button_elt;
    var div_elt;
    var i;
    var cards_button_top;
    var fill_button_top;
    var reset_button_top;

    let location = window.location.href
    let locationIsNS = location.includes('nationstates.net');
    let locationIsQueryServer = location.includes('azure.nsr3n.info/card_queries/get_daemon.sh') || location.includes('azure.nsr3n.info/card_queries/get_daemon_advanced.sh')

    if (locationIsQueryServer) {
          try {
            if(!fill_button_top) {
              fill_button_top = document.createElement('div');
              fill_button_top.id="queue_fill_button";
              fill_button_top.style.color = "red";
              fill_button_top.style.border = "1px solid black";
              fill_button_top.style.position = "absolute";
              fill_button_top.style.padding = "10px";
              fill_button_top.style.top = "70px";
              fill_button_top.style.left = "-300px";
              fill_button_top.style.margin = "-10px 0 0 500px";
              fill_button_top.style.cursor = "pointer";
              document.body.appendChild(fill_button_top);
              fill_button_top.innerHTML = "Add all links to the queue";
              fill_button_top.addEventListener("click",addAllLinksToTheQueue,false);
            }
            if (!reset_button_top) {
              reset_button_top = document.createElement('div');
              reset_button_top.id="queue_fill_button";
              reset_button_top.style.color = "red";
              reset_button_top.style.border = "1px solid black";
              reset_button_top.style.position = "absolute";
              reset_button_top.style.padding = "10px";
              reset_button_top.style.top = "70px";
              reset_button_top.style.left = "-300px";
              reset_button_top.style.margin = "-10px 0 0 725px";
              reset_button_top.style.cursor = "pointer";
              document.body.appendChild(reset_button_top);
              reset_button_top.innerHTML = "Reset the queue";
              reset_button_top.addEventListener("click",resetTheQueue,false);
            }
        }
        catch(exc) {}

        async function addAllLinksToTheQueue(click_event) {
            var r = confirm("Are you sure that you want to add all the cards on this page to the current queue?");
            if (r == true) {
                add_links_to_queue_from_query_page(document);
            }
        }

       async function resetTheQueue(click_event) {
            var r = confirm("Are you sure that you want to remove all the cards from current queue?");
            if (r == true) {
                reset_queue(document);
            }
        }
    }
    if (locationIsNS) {
        try {
            if(!cards_button_top) {
                let queue_holder = JSON.parse(await GM.getValue("NS_Cards_Queue", null));
                cards_button_top = document.createElement("div");
                cards_button_top.setAttribute('class',"bel");
                if(queue_holder !== null && queue_holder.length > 0) {
                    cards_button_top.innerHTML = "<div class=\"belcontent\"><a href=\"/page=deck\" class=\"bellink\"><i class=\"icon-cards\"></i>CARDS</a><div class=\"notificationnumber refreshable\" style=\"background-color:green\">" + queue_holder.length + "</div></div>";
                }
                else {
                    cards_button_top.innerHTML = "<div class=\"belcontent\"><a href=\"/page=deck\" class=\"bellink\"><i class=\"icon-cards\"></i>CARDS</a></div>";
                }
            }

            (document.getElementsByClassName("belspacer belspacermain")[0]).before(cards_button_top);

        }
        catch(exc) {}

        if(window.location.href.startsWith("https://www.nationstates.net/page=deck/card=")) { //single card page

            let queue_holder = await GM.getValue("NS_Cards_Queue", null);

            if(queue_holder != null) { //get the existing queue

                queue_holder = JSON.parse(queue_holder);

                //only create the button if the queue is not empty
                if(queue_holder.length != 0) {

                    try {

                        var existing_elt = document.getElementById("deck-single-card");

                        button_elt = document.createElement("button");
                        button_elt.textContent = "Next element in queue[" + queue_holder.length + "]";
                        button_elt.addEventListener('click',get_next_element_in_queue,false);

                        div_elt = document.createElement("div");
                        div_elt.style["justify-content"] = "center";
                        div_elt.style["display"] = "flex";

                        div_elt.appendChild(button_elt);

                        existing_elt.parentNode.insertBefore(div_elt,existing_elt);

                    }
                    catch(exc) {}
                }

            }

        }
        else
            if(window.location.href.startsWith("https://www.nationstates.net/page=deck")
               ||window.location.href.match(/https:\/\/www\.nationstates\.net\/(nation|container)=[A-Za-z0-9_-]+\/page=deck/)) { //deck page, may be lootbox page or another
                if (window.location.href.includes("/value_deck=1") || window.location.href.includes("/show_trades=")) {
                    var card_link_elts = document.getElementsByClassName("cardnameblock");
                    for(i = 0; i < card_link_elts.length; i++) {
                        button_elt = document.createElement("button");
                        button_elt.textContent = "Add to cards queue";
                        button_elt.addEventListener('click',add_in_queue_valdeck,false);
                        button_elt.classList.add("deckcard-token");
                        button_elt.classList.add("deckcard-lootbox-queue-button");
                        card_link_elts[i].parentNode.insertBefore(button_elt,card_link_elts[i]);
                    }

                } else {
                    var p_elts = document.getElementsByTagName("p");
                    var is_on_lootbox_page = false;

                    for(i = 0; i < p_elts.length && !is_on_lootbox_page; i++) {
                        if(p_elts[i].textContent == "Tap cards to reveal...") {
                            is_on_lootbox_page = true;
                        }
                    }

                    // Unneeded condition
                    // if(is_on_lootbox_page) { //lootbox page confirmed

                    var card_elts = document.getElementsByClassName("deckcard-info-cardlink");

                    for(i = 0; i < card_elts.length; i++) {

                        button_elt = document.createElement("button");
                        button_elt.textContent = "Add to cards queue";
                        button_elt.classList.add('deckcard-lootbox-queue-button');
                        button_elt.addEventListener('click',add_in_queue,false);

                        div_elt = document.createElement("div");
                        div_elt.appendChild(button_elt);

                        card_elts[i].parentNode.insertBefore(div_elt,card_elts[i]);

                    }

                    // }
                }

            }

        let cards_flags = document.getElementsByClassName("deckcard-flag");

        for(i = 0; i < cards_flags.length; i++) {
            cards_flags[i].addEventListener("click",toggleCardTitle,false);
        }
    }

    function toggleCardTitle(event) {
        let card_title_element = event.target.parentNode.getElementsByClassName("deckcard-title");
        if(card_title_element.length != 0) {
            if(card_title_element[0].style.visibility == "hidden") {
                card_title_element[0].style.visibility = "visible";
            }
            else {
                card_title_element[0].style.visibility = "hidden";
            }
        }
    }

    async function get_next_element_in_queue(click_event) {

        click_event.target.removeEventListener('click',get_next_element_in_queue,false);

        try {

            let queue_holder = JSON.parse(await GM.getValue("NS_Cards_Queue", null));

            let queue_element = queue_holder.shift(); //get and remove first element in queue

            if(queue_holder.length != 0) {
                await GM.setValue("NS_Cards_Queue",JSON.stringify(queue_holder)); //store back updated queue
            }
            else {
                await GM.deleteValue("NS_Cards_Queue"); //delete queue storage if empty
            }

            click_event.target.parentNode.parentNode.removeChild(click_event.target.parentNode); //remove the div containing the button

            window.location = queue_element; //go to the page of next element in queue

        }
        catch(exc) { //could happen if queue is emptied from another tab, just remove the button in this case
            click_event.target.parentNode.parentNode.removeChild(click_event.target.parentNode); //remove the div containing the button
        }

    }

    async function add_in_queue_valdeck(click_event) {

        click_event.target.removeEventListener('click',add_in_queue,false);

        let queue_holder = await GM.getValue("NS_Cards_Queue", null);

        if(queue_holder == null) { //create the new empty queue
            queue_holder = [];
        }
        else { //get the existing queue
            queue_holder = JSON.parse(queue_holder);
        }

        try {
            //add link to card info to queue
            queue_holder.push(click_event.target.nextElementSibling.getAttribute("href") + mode); //button.div.infobutton.link.getAttribute("href")
            click_event.target.textContent = "Card added to queue";
            click_event.target.disabled = true;
        }
        catch(exc) {
            click_event.target.textContent = "Error";
            click_event.target.disabled = true;
        }

        await GM.setValue("NS_Cards_Queue",JSON.stringify(queue_holder)); //store back updated queue

    }

    async function add_links_to_queue_from_query_page(document) {

        let queue_holder = await GM.getValue("NS_Cards_Queue", null);

        if(queue_holder == null) { //create the new empty queue
            queue_holder = [];
        }
        else { //get the existing queue
            queue_holder = JSON.parse(queue_holder);
        }

         document
             .querySelectorAll('a')
             .forEach(function (anchor) {
             if (anchor.getAttribute('href') !== 'submit.sh') {
                 try {
                     //add link to card info to queue
                     let url = anchor.getAttribute('href').replace('https://www.nationstates.net', '') + mode;
                     queue_holder.push(url);
                 }
                 catch(exc) {}
             }
         });

        await GM.setValue("NS_Cards_Queue",JSON.stringify(queue_holder)); //store back updated queue

    }

     async function reset_queue(document) {

        let queue_holder = await GM.getValue("NS_Cards_Queue", null);

        await GM.setValue("NS_Cards_Queue",JSON.stringify([])); //store back empty queue

    }

    async function add_in_queue(click_event) {

        click_event.target.removeEventListener('click',add_in_queue,false);

        let queue_holder = await GM.getValue("NS_Cards_Queue", null);

        if(queue_holder == null) { //create the new empty queue
            queue_holder = [];
        }
        else { //get the existing queue
            queue_holder = JSON.parse(queue_holder);
        }

        try {
            //add link to card info to queue
            //var mode = "";


            console.log(click_event.target.parentNode.nextElementSibling.firstElementChild.getAttribute("href") + mode);
            queue_holder.push(click_event.target.parentNode.nextElementSibling.firstElementChild.getAttribute("href") + mode); //button.div.infobutton.link.getAttribute("href")
            click_event.target.textContent = "Card added to queue";
            click_event.target.disabled = true;
        }
        catch(exc) {
            click_event.target.textContent = "Error";
            click_event.target.disabled = true;
        }

        await GM.setValue("NS_Cards_Queue",JSON.stringify(queue_holder)); //store back updated queue

    }

})();