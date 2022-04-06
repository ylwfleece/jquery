export default class JQuery {
    constructor(selector) {
        this.element = document.querySelector(selector);
    }

    html(markup) {
        this.element.innerHTML = markup;
    }

    on(e, cb) {
        this.element.addEventListener(e, cb);
    }

    val() {
        return this.element.value;
    }

    ajax(searchTerm) {
        return fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=22`)
            .then(res => res.json())
    }
}