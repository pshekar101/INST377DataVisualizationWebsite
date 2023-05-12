/* A quick filter that will return something based on a matching input */
function filterList(list, query){
  return list.filter((item)=>{
    const lowerCaseName= item.name.toLowerCase();
    const lowerCaseQuery= query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery)
  })
}

function initChart(target){ 
  const chart= new Chart(target, {
  type: 'bar',
  data: {
    labels:  ['The 100', 'Revenge', 'Grimm', 'Gotham', 'True Blood', 'Intruders','NCIS','Game of Thrones','Law & Order: Special Victims Unit'],
    datasets: [{
      label: '#ratings',
      data: [7, 7.5, 8, 7, 8.5, 9.5, 9, 9.5, 6],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
return chart;
}




async function mainEvent() { // the async keyword means we can make API requests
  const loadDataButton = document.querySelector("#data_load");
  const generateListButton = document.querySelector("#generate");
  const textField = document.querySelector("#list_selector");
  const chart= document.querySelector('#myChart');

 

  let currentList = []; // this is "scoped" to the main event function
  
  const newChart= initChart(chart);
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('submit', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    submitEvent.preventDefault(); 
    console.log('form submission'); 
    //const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const results = await fetch('https://api.tvmaze.com/shows#9ZR2v5r0oEoXqWubVRNcX91IjkO987Fg');
    currentList=await results.json();
    console.table(currentList)
    });
  
  filterButton.addEventListener('click', (event)=>{
    console.log('clicked FilterButton');

    const formData= new FormData(loadDataButton);
    const formProps=Object.fromEntries(formData);

    console.log(formProps);
    const newList=filterList(currentList, formProps.resto)

    console.log(newList);
  })
   



  /*
    Now that you HAVE a list loaded, write an event listener set to your filter button
    it should use the 'new FormData(target-form)' method to read the contents of your main form
    and the Object.fromEntries() method to convert that data to an object we can work with

    When you have the contents of the form, use the placeholder at line 7
    to write a list filter

    Fire it here and filter for the word "pizza"
    you should get approximately 46 results
  */
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
