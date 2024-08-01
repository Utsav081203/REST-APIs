const axios = require('axios');

// async function getNumDraws(year) {
//     const api_url = `https://jsonmock.hackerrank.com/api/football_matches`;

//     const response = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}`);
//     const {total_pages} = response.data;
//     let counter = 0;

//     for(let count = 1; count <= total_pages; count++) {
//         const response = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${count}`);
//         const result = response.data;
//         for(const item of result.data) {
//             if(item.team1goals === item.team2goals) {
//                 counter++;
//             }
//         }
//     }

//     return counter;
// }

// const result = await getNumDraws(2011);

// console.log(result);

// THIS IS SEQUENTIAL EXECUTION
// (TLE) VERDICT

const api = "https://jsonmock.hackerrank.com/api/";

async function getCountFor(year, i){
    let count = 0;
    const res = await axios.get(api + "football_matches?year=" + year + "&page=" + i);
    const result = res.data;
        for(const item of result.data) {
            if(item.team1goals === item.team2goals) {
                count++;
            }
        }
    return count;
}

async function getNumDraws(year) {
    let count = 0;

    let res = await axios.get(api + "football_matches?year=" + year);
    let result = res.data;
    let total_pages = result.total_pages || 1;
    const promises = [];
    for(let i = 1; i <= total_pages; i++) {
        promises.push(getCountFor(year, i));
    }
    const results = await Promise.all(promises);
    // all requests sent simultaneously here
    results.forEach(c => count+=c);
    console.log(count);
    return count;
}

getNumDraws(2012);

// Optimised Code since HTTP requests are done in parallel.
// array of promises for each page request using getCountFor(year, i) and then waits for all promises to resolve using Promise.all(promises). 
// This means all HTTP requests are made concurrently, allowing the program to proceed with other tasks while waiting for the responses.