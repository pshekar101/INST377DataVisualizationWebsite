async function getData() {
    const api_url= "https://api.tvmaze.com/shows"
    const response = await fetch(api_url)
    const data = await response.json()
    console.table(response)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
  
  function injectHTML(list) {
    console.log('fired injectHTML')
    const target= document.querySelector('#show_list');
    target.innerHTML='';
    list.forEach((item)=> {
      const str=`<li>${item.name}</li>`;
      target.innerHTML+=str
    })
  }
    
  /* A quick filter that will return something based on a matching input */
  function filterList(list, query) {
    return list.filter((item)=>{
      const lowerCaseName= item.name.toLowerCase();
      const lowerCaseQuery= query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery)
    })
   
  }
  
  function cutShowList(list){
    console.log('fired cut list');
    const range=[...Array(15).keys()];
    return newArray= range.map((item)=>{
      const index= getRandomInt(0, list.length -1);
      return list[index]
    })
  }

    
  document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
    
 
