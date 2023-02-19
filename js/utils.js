function renderElement(element){
    return (
        document.querySelector(element)
    )
}
function createTag(tag){
    return(
        document.createElement(tag)
    )
}
function textContent(text) {
    return(
        document.createTextNode(text)
    )
}
function elementId(id){
    return(
        document.getElementById(id)
    )
}