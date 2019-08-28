function isScrolledIntoView(el: Element){
    const docViewTop = window.scrollY;
    const docViewBottom = docViewTop + window.innerHeight;

    const elemTop = el.getBoundingClientRect().top + docViewTop;
    const elemBottom = elemTop + 10;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

export default isScrolledIntoView