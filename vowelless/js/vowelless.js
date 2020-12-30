// MAKING A TABLE

// TO DO:
// SEARCH BY LENGTH? (ADD ADVANCED OPTIONS)

// BIG TO-DO: UPLOAD YOUR OWN WORDLIST

class DataTable {

    constructor(parentElement, wordlistData) {
        this.parentElement = parentElement
        this.wordlistData = wordlistData
        this.displayData = []

        this.initTable()
    }

    initTable() {
        let tableObject = this

        tableObject.table = d3.select(`#${tableObject.parentElement}`)
            .append("table")
            .attr("class", "table table-hover")
            .attr("id", "results-table")

        // append table head
        tableObject.thead = tableObject.table.append("thead")
        tableObject.thead.html(
            `<tr>
                <th scope="col">Word</th>
                <th scope="col">Entry</th>
                <th scope="col">Length</th>
                <th scope="col">Score</th>
            </tr>`
        )

        // append table body
        tableObject.tbody = tableObject.table.append("tbody")

        // wrangleData
        tableObject.wrangleData()

        console.log(tableObject.wordlistData)

    }

    wrangleData() {
        let tableObject = this

        console.log("this is a new click")

        let inputVal = document.getElementById("vowellessPrompt").value.toUpperCase()

        const inputArray = Array.from(inputVal)

        let outputString = "^[AEIOU]#"

        inputArray.forEach( char => {
            outputString = outputString.concat(char).concat("[AEIOU]#")
        })

        outputString = outputString
            .replaceAll('?','[^AEIOUY]')
            .replaceAll('*',".*")
            .replaceAll("#", "*")

        outputString = outputString.concat("$")

        console.log(outputString)

        const regexp = new RegExp(outputString)
        tableObject.matchingWords = []

        this.wordlistData.forEach(item => {
            if (item.word.match(regexp)) {
                tableObject.matchingWords.push(item)
            }
        })

        tableObject.displayString = outputString

        if (inputArray.length > 0) {
            tableObject.updateTable()
        }
    }

    updateTable() {
        // display the table itself
        let tableObject = this

        tableObject.matchingWords = tableObject.matchingWords.sort((a,b) => {return b.score - a.score})

        console.log(tableObject.matchingWords)

        // reset tbody
        tableObject.tbody.html('')

        // Display the vowelless version of an entry
        function disemvowel(string) {
            let matches = string.match(/[^AEIOU]/g)
            return (matches.join(''))
        }


        // cutting the results off at 500 so no one poaches my wordlist
        let counter = 0

        tableObject.matchingWords.forEach( item => {
            let row = tableObject.tbody.append("tr")

            row.html(
                `
                <td>${item.word}</td>
                <td>${disemvowel(item.word)}</td>
                <td>${item.word.length}</td>
                <td>${item.score}</td>`
            )
        })
    }
}