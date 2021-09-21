function include(file, querySelectorElement){
    fetch(file).then(result => result.text()).then(content => {
        let element = document.querySelector(querySelectorElement);
        element.innerHTML = content;
    });
}

