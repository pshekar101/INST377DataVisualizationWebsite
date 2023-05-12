function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector("#show_list");
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });
}

function cutShowList(list) {
  console.log("fired cut list");
  const range = [...Array(15).keys()];
  return (newArray = range.map((item) => {
    const index = getRandomInt(0, list.length - 1);
    return list[index];
  }));
}


function markerPlace(array, map){
 console.log('array for markers', array);

 map.eachLayer((layer) => {
   if (layer instanceof L.Marker) {
        layer.remove();
      }
   });

  array.forEach((item)=>{
      console.log('markerPlace', item);
      const{coordinate}= item.geocoded_column_1;
    L.marker(coordinate[1],coordinate[0]).addTo(map);
 })
}

function initChart(target,dataSet, labels){
    const chart= new Chart(target, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '#ratings',
        data: dataSet,
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


async function mainEvent() {
  const loadDataButton = document.querySelector("#data_load");
  const generateListButton = document.querySelector("#generate");
  const textField = document.querySelector("#list_selector");
  const chart= document.querySelector('#myChart');
 

  const loadAnimation = document.querySelector("#data_load_animation");
  loadAnimation.style.display = "none";
  generateListButton.classList.add("hidden");

  

  const storedData=localStorage.getItem('storedData');
  let parsedData=JSON.parse(storedData);
  if(parsedData.length>0){
    generateListButton.classList.remove("hidden");
  }
  
  let storedList = []; // this is "scoped" to the main event function
  ;

  const dataForChart=parsedData.reduce((col, item)=>{
   if (!col.label[item.genres]){
      col[item.genres]=1
    }
    else{
      col[item.genres]+=1
     }
   return col;
 }, {})

  const dataSet= Object.values(dataForChart);
  const labels= Object.keys(dataForChart);
  console.log(dataForChart)
  const newChart=initChart(chart, dataSet, labels);
  /* We  need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("Loading data");
    loadAnimation.style.display = "inline-block";

    const results = await fetch(
      "https://api.tvmaze.com/shows#9ZR2v5r0oEoXqWubVRNcX91IjkO987Fg");
      const storedList = await results.json();
      localStorage.setItem('storedData',JSON.stringify(storedList));
      parsedData=storedList;
      if(parsedData?.length>0){
      generateListButton.classList.remove("hidden");
    }

    //loadAnimation.style.display = "none";
    //console.table(storedList);
  });

 

  generateListButton.addEventListener("click", (event) => {
    console.log("generate new list");
    storedList = cutShowList(parsedData);
    console.log(storedList);
    injectHTML(storedList);
    

  });

  textField.addEventListener("input", (event) => {
    console.log("input", event.target.value);
    const newList = filterList(storedList, event.target.value);
    console.log(newList);
    injectHTML(newList);
  });

  //clearDataButton.addEventListener("click", (event)=>{
   // console.log('clear browser data');
   // localStorage.clear();
    //console.log('localStorage Check', localStorage.getItem("storedData"))
  //})


}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
