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





async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton=document.querySelector('#filter');
  const loadDataButton= document.querySelector('#data_load');
  const generateListButton= document.querySelector('#generate');
  const textField = document.querySelector("#shows");
  // Add a querySelector that targets your filter button here
  
  const loadAnimation=document.querySelector('#data_load_animation');
  loadAnimation.style.display='none';
  let currentList = []; // this is "scoped" to the main event function
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  mainForm.addEventListener('submit', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    submitEvent.preventDefault(); 
    console.log('form submission'); 
    //api url
    const api_url="https://api.tvmaze.com/"
    const results = await fetch(api_url);
    currentList=await results.json();
    console.table(currentList)
    })

    filterButton.addEventListener('click', (event)=>{
      console.log('clicked FilterButton');
  
      const formData= new FormData(mainForm);
      const formProps=Object.fromEntries(formData);
  
      console.log(formProps);
      const newList=filterList(currentList, formProps.shows)
  
      console.log(newList);
    })

    generateListButton.addEventListener("click", (event) => {
      console.log("generate new list");
      loadAnimation.style.display = "inline-block";
  
      const currentList = cutShowList('storedData');
      loadAnimation.style.display = "none";
      console.log(currentList);
      injectHTML(currentList);
    });
  
    textField.addEventListener("input", (event) => {
      console.log("input", event.target.value);
      const newList = filterList(currentList, event.target.value);
      console.log(newList);
      injectHTML(newList);
    });

    clearDataButton.addEventListener("click",(event)=>{
        console.log('clear browser data');
        localStorage.clear
        console.log('localStorage Check', localStorage.getItem("storedData"))
    } )
  
    document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  };