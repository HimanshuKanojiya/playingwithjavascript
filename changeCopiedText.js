function changeCopiedText(){
    function getCurrentPageLink(){
        return window.location.href;
    }

    function getHTMLTagToBeListened(tagName){
        const domTag = document.getElementsByTagName(tagName)[0];
        return domTag ?? null
    }

    function getSelectedText(){
        return document.getSelection().toString();
    }

    function assignCopyListenerToTag(domTag){        
        domTag.oncopy = (event) => {
            event.clipboardData.setData('text/plain', prepareNewCopiedText());
            event.preventDefault();
        }
    }

    function prepareNewCopiedText(){
        return `${getSelectedText()}...Read More at ${getCurrentPageLink()}`;
    }

    function runScript(tagToBeListened){
        if(!tagToBeListened){
            errorThrower("Tag Not Provided!")
        }

        const domTag = getHTMLTagToBeListened(tagToBeListened);
        if(!domTag){
            errorThrower("Tag Not Found")
        }
        assignCopyListenerToTag(domTag);
    }

    function errorThrower(errorText){
        throw new Error(errorText);
    }

    return {
        runScript
    }
    
}

const copyingListener = changeCopiedText();
copyingListener.runScript("body");

