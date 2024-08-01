const axios = require('axios');

// Solution:
// Either the team could be home team itself of visiting team in those matches
// So we will sum output of both
// api call for that winner team from both perpectives
// add goals in those matches to final sum.

async function getWinnerTotalGoals(competition, year) {
    const api_url = `https://jsonmock.hackerrank.com/api/football_competitions`;

    const response = await axios.get(`https://jsonmock.hackerrank.com/api/football_competitions?name=${competition}&year=${year}`);
    const answer = response.data;
    const team = answer.data[0].winner;
    // based on the structure of json
    console.log("Winning Team: ",team);
    
    let count = 0;
    const api = "https://jsonmock.hackerrank.com/api/";
    let res = await axios.get(api + "football_matches?year=" + year + "&team1=" + team);
    let result = res.data;
    let total_pages = result.total_pages || 1;
    for(let i = 1; i <= total_pages; i++) {
        const res = await axios.get(api + "football_matches?year=" + year + "&team1=" + team + "&page=" + i);
        const result = res.data;
        const data = result.data;
        // data is an array
        if(Array.isArray(data)){
            data.forEach(d => {
                count+=Number(d.team1goals);
            });
        }
    }

    res = await axios.get(api + "football_matches?year=" + year + "&team2=" + team);
    result = res.data;
    total_pages = result.total_pages || 1;
    for(let i = 1; i <= total_pages; i++) {
        const res = await axios.get(api + "football_matches?year=" + year + "&team2=" + team + "&page=" + i);
        const result = res.data;
        const data = result.data;
        if(Array.isArray(data)){
            data.forEach(d => {
                count+=Number(d.team2goals);
            });
        }
    }

    console.log(count);
    return count;
}

// const result = await getWinnerTotalGoals('English Premier League', 2014);

// console.log(result);

getWinnerTotalGoals('English Premier League', 2014);