/*
Datasettet som blir lastet som placeholder for prissammenligning
*/

export const labels = [
  "Kiwi",
  "Meny",
  "Coop Obs",
  "Rema 1000",
  "Spar",
  "Coop Extra",
];
  
//Datasets
export const datasets = [
  {
    data: [1, 1, 1, 1, 1, 1, 1],
    borderColor: "#696969",
    backgroundColor: [
      "#7CFC00",  
      "#A52A2A",  
      "#000080",  
      "#4169E1", 
      "#008000",  
      "#DAA520"],
  }
];

export const options = {
  responsive: true,
  plugins: {legend: { display: false },
    title: {
      display: false,
    },
  },
};

  