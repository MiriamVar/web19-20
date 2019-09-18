interface MenuItem{
    local: string;
    label: string;
    imortant?: boolean;
    title?: string;
}

/* interface - zadefinujeme co chceme na vstupe */
export const linkGenerator =  (item: MenuItem, actualPage: string) => {
    const active = item.local  === actualPage ? "active" : "";
    const important = item.imortant ? "important" : "";
    let classString = ""; // prazdny string je nepravdiny 
    if(active || important){
        classString =  `class="${
            active && important ? active + " "+ important : active + important
        }"`;
    }
    const title = item.title ? `title= "${item.title}"` : " ";
    return `<li><a href="/${item.local}" ${classString} ${title}> ${item.label} </a></li>`;
};