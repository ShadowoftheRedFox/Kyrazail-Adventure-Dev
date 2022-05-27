/**
 * Return the element or null if found
 * @param {Document | HTMLElement} document document or root element
 * @param {HTMLElementTagNameMap} element type of element to find, as string
 * @returns {null | HTMLParagraphElement}
 * @example findElement(document, "p") => null | p //who is a HTMLParagraphElement
 */
function findElement(document, element) {
    return document.querySelector(element);
}
/**
 * Create a save input where user will put his save
 * @param {document} document the doc
 * @returns {boolean} returns true if found, false if not
 */
function generateLoad(document) {
    //getting the element
    const containerElement = document.getElementById("container");

    var element = findElement(containerElement, 'input');
    if (element == null) {
        var input = document.createElement('input'),
            label = document.createElement("label");
        label.innerHTML = "Choose a file";
        label.htmlFor = "file";

        input.type = "file";
        input.id = "file";
        input.className = "inputfile";

        containerElement.appendChild(input);
        containerElement.appendChild(label);
        return true;
    } else {
        return false;
    }
}
/**
 * Delete the save input if it's here
 * @param {document} document the doc
 * @returns {boolean} returns true if found and deleted, false if not
 */
function deleteLoad(document) {
    const containerElement = document.getElementById("container");
    var elementInput = findElement(containerElement, "input"),
        elementLabel = findElement(containerElement, "label");
    if (elementInput == null) {
        return false;
    } else {
        elementInput.remove();
        elementLabel.remove();
        return true;
    }
}
/**
 * Get the content of the load text area, and return the content if found.
 * If not, return false.
 * @param {Document} document 
 * @returns {string | false}
 */
function getLoadAreaContent(document) {
    const element = document.getElementById("textAreaLoad");
    if (element == null) {
        return false;
    } else {
        return element.value;
    }
}