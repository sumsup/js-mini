function makeLottoNumbers() {

    let numberSet = new Set();
    while(numberSet.size < 6) {
        numberSet.add(Math.floor(Math.random() * 45) + 1);
    }
    for (let number of numberSet) {
        console.log(number);
    }

}