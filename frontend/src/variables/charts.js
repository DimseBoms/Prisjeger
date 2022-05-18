/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const dashboardPrisSammenligningChart = {
  data: (canvas) => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      datasets: [
        {
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: [300 , 310, 316, 322, 330, 326, 333, 345, 338, 354],
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420],
        },
        {
          borderColor: "#fcc468",
          backgroundColor: "#fcc468",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484],
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      y: {
        ticks: {
          color: "#9f9f9f",
          beginAtZero: false,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          padding: 20,
          color: "#9f9f9f",
        },
      },
    },
  },
};

const dashboardEmailStatisticsChart = {
  data: (canvas) => {
    return {
      labels: [1, 2, 3],
      datasets: [
        {
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
          borderWidth: 0,
          data: [342, 480, 530, 120],
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    pieceLabel: {
      render: "percentage",
      fontColor: ["white"],
      precision: 2,
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
};

const dashboardNASDAQChart = {
  data: (canvas) => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        //Rema 1000
        {
          label: 'Rema 1000',
          data: [100, 100, 100, 100, 20, 27, 30, 34, 42, 45, 55, 63],
          fill: true,
          borderColor: "#ce13136d",
          backgroundColor: "transparent",
          pointBorderColor: "#ce13136d",
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
        //Meny
        {
          label: 'Meny',
          data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
          fill: true,
          borderColor: "#ce13136d",
          backgroundColor: "transparent",
          pointBorderColor: "#ce13136d",
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
        //Kiwi
        {
          label: 'Kiwi',
          labelTextColor: "#00ff11",
          data: [59, 36, 50, 17, 20, 27, 45, 67, 69, 43, 21, 43],
          fill: true,
          borderColor: "#00ff11",
          backgroundColor: "transparent",
          pointBorderColor: "#00ff11",
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
        //Spar
        {
          label: 'Spar',
          data: [59.75, 49.7, 55.75, 39.75, 49.75, 49.75, 49.75, 59.75, 39.75, 49.75, 49.75, 49.75],
          fill: true,
          borderColor: "#ef8157",
          backgroundColor: "transparent",
          pointBorderColor: "#ef8157",
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
        //Joker
        {
          label: 'Joker',
          data: [0, 60, 49, 12, 10, 27, 30, 34, 30, 45, 55, 63],
          fill: true,
          borderColor: "#d753c6",
          backgroundColor: "transparent",
          pointBorderColor: "#d753c6",
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { 
        pointRadius: 1,
        display: true, 
        labels: {
          font: {
            size: 17,
            weight: 'bold',
          },
        },
        layout: {
          padding: 20,
        } 
      },
    },
  },
};

module.exports = {
  dashboardPrisSammenligningChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
};
