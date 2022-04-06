// class JQuery {
//     constructor(selector) {
//         this.element = document.querySelector(selector);
//     }

//     html(markup) {
//         this.element.innerHTML = markup;
//     }

//     on(e, cb) {
//         this.element.addEventListener(e, cb);
//     }

//     val() {
//         return this.element.value;
//     }

//     ajax(searchTerm) {
//         return fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=22`)
//             .then(res => res.json())
//     }
// }

let $ = (selector) => {
    const el = document.querySelector(selector);
    return {
        html: (markup) => el.innerHTML = markup,
        on: (e, cb) => el.addEventListener(e, cb),
        val: () => el.value,
        ajax: (searchTerm) => {
            return fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=22`)
                .then(res => res.json())
        },
        getEl: () => el
    }
}

let numOfCards = 5;

function generateResultCard(result) {
    return `<div id="result-${result.id}" class="results__grid__card">
        <img class="results__grid__card__cover" src=${result.artworkUrl100}>
        <span class="results__grid__card__title">${result.collectionName}</span>
    </div>`
}

function generateResultsGrid(searchResults, searchTerm) {
    let results = searchResults.results;
    renderResultsText(results.length, searchTerm);
    let resultsCards = results.slice(0, numOfCards);
    return resultsCards.map(result => generateResultCard(result)).join('');
}

function renderResultsGrid(results, searchTerm) {
    const tmp = generateResultsGrid(results, searchTerm);
    // const ele = document.querySelector('.results__grid');
    render($('.results__grid').getEl(), tmp);
    // render the show more button
    // let showMoreDiv = $("#showmore");
    // if numofcards > resultscount then hide showmore
    console.log(results.resultCount, numOfCards);

    // if results is 0 dont create btn
    if (results.resultCount > 0) {
        // showMoreDiv.innerHTML = `<button id='showMoreBtn'>show more</button>`;
        $('#showmore').html(`<button id='showMoreBtn'>show more</button>`)
        // add event listener for button click
        // when user clicks button, increment numofcards by 5 and rerender results grid
        // let showMoreBtn = document.getElementById('showMoreBtn');
        // showMoreBtn.addEventListener('click', (e) => {
        //     numOfCards += 5;
        //     renderResultsGrid(results, searchTerm);
        // })
        $('#showMoreBtn').on('click', (e) => {
            numOfCards += 5;
            renderResultsGrid(results, searchTerm);
        })
    }

    if (numOfCards > results.resultCount) {
        // let showMoreDiv = document.getElementById('showmore');
        // showMoreDiv.innerHTML = '';
        $('#showmore').html('')
    }

}

function render(element, template) {
    element.innerHTML = template;
}

function renderLoader() {
    // let prompt = document.querySelector('.searchbar__prompt')
    // prompt.innerHTML = `<div class='loader'></div>`;
    $('.searchbar__prompt').html(`<div class='loader'></div>`);
}

function renderResultsText(count, searchTerm) {
    // let prompt = document.querySelector('.searchbar__prompt')
    // prompt.innerHTML = `<h1>${count} results for '${searchTerm}'</h1>`;
    $('.searchbar__prompt').html(`<h1>${count} results for '${searchTerm}'</h1>`);
}

function getResults(searchTerm) {
    // return fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=22`)
    //     .then(res => res.json())
    return $('#showmore').ajax(searchTerm);
}

function displayResults(searchTerm) {
    getResults(searchTerm).then(results => {
        renderResultsGrid(results, searchTerm);
    });
}

function hideShowMore() {
    // let showMoreDiv = document.getElementById('showmore');
    // showMoreDiv.innerHTML = '';
    $('#showmore').html('');
}

function initSearchBar() {
    // let input = document.querySelector('.searchbar__nav__input');
    // let submit = document.querySelector('.searchbar__nav__submit');
    $('.searchbar__nav__submit').on('click', (e) => {
        if ($('.searchbar__nav__input').val()) {
            // get rid of showmorebtn
            // let showMoreDiv = document.getElementById('showmore');
            // showMoreDiv.innerHTML = '';
            $('#showmore').html('');
            numOfCards = 5;
            renderLoader();
            displayResults($('.searchbar__nav__input').val());
        } else {
            alert('Must input valid search term')
        }
    })
    // submit.addEventListener('click', (e) => {
    //     if (input.value) {
    //         // get rid of showmorebtn
    //         let showMoreDiv = document.getElementById('showmore');
    //         showMoreDiv.innerHTML = '';
    //         numOfCards = 5;
    //         renderLoader();
    //         displayResults(input.value);
    //     } else {
    //         alert('Must input valid search term')
    //     }
    // })
    
    $('.searchbar__nav__input').on("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            $('.searchbar__nav__submit').getEl().click();
        }
    });


}

initSearchBar();

