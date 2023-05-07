async function getData() {
    const api_url= "https://api.tvmaze.com/shows"
    const response = await fetch(api_url)
    const data = await response.json()
    console.table(response)
  }


 
