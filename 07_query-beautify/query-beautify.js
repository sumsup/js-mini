function f() {
    var query = "\n" + document.querySelector('#query').value;

    console.log("input query : " + query);
    var converted = query.replace("select ", "select \n\t")
        .replace(" from ", "\n from \n\t")
        .replace(" where ", "\n where \n\t");

    console.log("output query : " + converted);

    document.getElementById('query-result').value = '';
document.getElementById(    'query-result').append(converted);

}