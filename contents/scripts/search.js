document.addEventListener("DOMContentLoaded", function () {
    var sjs = SimpleJekyllSearch({
        searchInput: document.getElementById('searchInput'),
        resultsContainer: document.getElementById('resultsContainer'),
        json: '/search.json'
    });

    document.getElementById('searchInput').focus();
});