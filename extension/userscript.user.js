// ==UserScript==
// @name         Bluesky Clickable Hashtag
// @name:ja         Bluesky Clickable Hashtag
// @namespace    https://github.com/yakisova41
// @version      v1.0.0
// @description  Make bluesky hashtags blue and clickable
// @description:ja  blueskyのハッシュタグを青文字にし、クリック可能にします
// @author       yakisova41
// @match        https://bsky.app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bsky.app
// @grant        none
// @license      MIT
// ==/UserScript==\

setTimeout(() => {
    const routerElem = document.querySelector("#root > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) ")
    const navigation = routerElem[getPropsKey(routerElem)].children.props.children[0].props.children.props.children.props.children.props.value.navigation;

    const observer = new MutationObserver(()=> {    
        const texts = document.querySelectorAll(`div[data-word-wrap="1"]:not(.hashtaged)`);
        texts.forEach(textElem => {
            textElem.classList.add("hashtaged");
            textElem.innerHTML = textElem.innerHTML.replace(/#(\S*)/g, '<a class="hashtag-adding" keyword="$1" style="letter-spacing: 0.25px; font-weight: 400; color: rgb(16, 131, 254);" href="/search?q=$1">#$1</a>')
            const adding = textElem.querySelectorAll(".hashtag-adding");
            adding.forEach(addingElem => {
                addingElem.addEventListener("click", (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    navigation.push("Search", {q: addingElem.getAttribute("keyword")})
                });
                addingElem.classList.remove("hashtag-adding");            
            })
        });
    });
    
    const root = document.querySelector("#root");
    observer.observe(root, {
        childList: true,
        subtree: true
    })
}, 100);
 
function getPropsKey(elem) {
    let result = null;
    Object.keys(elem).forEach(key => {
        if(key.match(/__reactProps\$.*/) !== null) {
            result = key;
        } 
    });
    return result;
}