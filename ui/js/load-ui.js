async function getFiles() {
    const response = await fetch("http://127.0.0.1:5000/files");
    const fileList = await response.json();
    console.log(fileList);
    fileList.forEach((fileName) => {
        document
            .querySelector("#file-list")
            .insertAdjacentHTML(
                "beforeend",
                `<li><a href="#" data-url="${fileName}" onclick="loadIframe(event)">${fileName}</a></li>`
            );
    });
}

async function getCategories() {
    const response = await fetch("http://127.0.0.1:5000/categories");
    const categoryList = await response.json();
    console.log(categoryList);
    categoryList.forEach((fileName) => {
        document
            .querySelector("#categories")
            .insertAdjacentHTML(
                "beforeend",
                `<span class="category">${fileName}</span>`
            );
    });
}

function loadIframe(ev) {
    ev.preventDefault();
    const target = ev.currentTarget;
    const url = target.getAttribute("data-url");
    console.log(url);
    document.querySelector("#iframe-container").innerHTML = `
        <iframe src="${url}" width="700" height="300"></iframe>
    `;
}

getFiles();
getCategories();
