function f() {
    let query = document.querySelector('#query').value;

    console.log("input query : " + query);
    let convertedEnter = query.replaceAll("\n", " ");
    let converted = convertedEnter
            .replaceAll("select ", "select \n\t".toUpperCase())
            .replaceAll(" from ", "\nfrom \n\t".toUpperCase())
            .replaceAll(" where ", "\nwhere \n\t".toUpperCase())
            .replaceAll(" inner join ", "\ninner join ".toUpperCase())
            .replaceAll(" left outer join ", "\nleft outer join ".toUpperCase())
            .replaceAll(" right outer join ", "\nright outer join ".toUpperCase())
            .replaceAll(" left join ", "\nleft join ".toUpperCase())
            .replaceAll(" right join ", "\nright join ".toUpperCase())
            .replaceAll(" on ", "\n\ton ".toUpperCase())
            .replaceAll(" and ", "\n\tand ".toUpperCase())
            .replaceAll(" or ", "\n\tor ".toUpperCase())
            .replaceAll(" ||", "\n\t||".toUpperCase())
            .replaceAll(" &&", "\n\t&&".toUpperCase())
            .replaceAll(" in ", "\n\tin ".toUpperCase())
            .replaceAll("is not null", "is not null".toUpperCase())
            .replaceAll("is null", "is null".toUpperCase())
            .replaceAll(" order by", "\norder by".toUpperCase())
            .replaceAll(" desc;", " desc;".toUpperCase())
            .replaceAll(" asc;", " asc;".toUpperCase())
        + "\n===================================================\n";

    console.log("output query : " + converted);

    document.getElementById('query-result').value = '';
    document.getElementById('query-result').append(converted);

}

function resetOutput() {
    let isResetOk = confirm("정말 초기화 하시겠습니까?\n출력한 쿼리들이 전부 사라집니다.");
    if (isResetOk) {
        document.querySelector('#query-result').textContent = '';
    }
}