import { list,getData } from "../data/list.js"
import { dashboard } from "../data/dashboard.js"
import { detail } from "../data/detail.js"

function renderDashboard(){
    document.querySelector('main').innerHTML = dashboard
    let renderer = ``
    let index = 0
    list.forEach((list) => {
        index++
        renderer += `
        <div class="box">
            <div class="no">${index}</div>
            <div class="name">${list.name}</div>
            <div class="time">${list.time}</div>
            <div class="status" style="${checkStatus(list.status)}">${list.status}</div>
        </div>
        `
    })
    document.getElementById('Hadir').innerHTML = countStatus('Hadir')
    document.getElementById('Absen').innerHTML = countStatus('Absen')
    document.getElementById('Izin').innerHTML = countStatus('Izin')
    document.querySelector('.data').innerHTML = renderer
}

function checkStatus(status){
    if (status === "Hadir"){
        return "background-color: rgb(75, 192, 192);"
    } else if(status === "Absen"){
        return "background-color: rgb(255, 99, 132);"
    } else {
        return "background-color: rgb(255, 205, 86);"
    }
}

function countStatus(statuss) {
    const counts = {};

    list.forEach(entry => {
        if (counts[entry.status]) {
        counts[entry.status]++;
        } else {
        counts[entry.status] = 1;
        }
    });

    return counts[statuss]
}



function renderDetail(){
    document.querySelector('main').innerHTML = detail
    document.getElementById('Hadir').innerHTML = countStatus('Hadir')
    document.getElementById('Absen').innerHTML = countStatus('Absen')
    document.getElementById('Izin').innerHTML = countStatus('Izin')
    document.getElementById('Rest').innerHTML = (totalEmploye-(countStatus('Hadir')+countStatus('Absen')+countStatus('Izin')))
    document.getElementById('totalEmploye').innerHTML = totalEmploye
    renderChart()
}

function renderChart(){
    const idChart = document.getElementById('donut')
    const data = {
        labels: [
            'Masuk',
            'Absen',
            'Izin',
            'Tidak diketahui',
        ],
        datasets: [{
            label: 'Jumlah',
            data: [countStatus('Hadir'),countStatus('Absen'), countStatus('Izin'),(totalEmploye-(countStatus('Hadir')+countStatus('Absen')+countStatus('Izin')))],
            backgroundColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)',      
            ],
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
    };
    new Chart(idChart, config);
}

function getButton(){
    document.getElementById('Dashboard').addEventListener('click',() => {
        renderDashboard()
    })
    document.getElementById('Detail').addEventListener('click',() => {
        renderDetail()
    })
}

let totalEmploye = 0

async function init() {
  await getData()
  totalEmploye = list.length + 5
  getButton()
  renderDashboard()
}
init()
