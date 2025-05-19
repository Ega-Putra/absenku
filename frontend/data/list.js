export const list = []

export async function getData() {
  const response = await fetch('http://localhost:3000/data',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  data.data.forEach((item) => {
    list.push({
      name: item.name,
      time: `${formatDate(item.createdAt)}`,
      status: item.status
    })
  })
}

function formatDate(createdAt) {
  const date = new Date(createdAt)
  
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // bulan dimulai dari 0
  const year = date.getFullYear()

  return `${hours}:${minutes} ${day}/${month}/${year}`
}

// export const list = [
//   {
//     name: 'Jhon',
//     time: '08:00 17/05/2025',
//     status: 'Hadir'
//   },
//   {
//     name: 'Maria',
//     time: '08:05 17/05/2025',
//     status: 'Hadir'
//   },
//   {
//     name: 'Budi',
//     time: '00:00 17/05/2025',
//     status: 'Absen'
//   },
//   {
//     name: 'Sinta',
//     time: '08:10 17/05/2025',
//     status: 'Izin'
//   },
//   {
//     name: 'Rizky',
//     time: '08:03 17/05/2025',
//     status: 'Hadir'
//   },
//   {
//     name: 'Lina',
//     time: '00:00 17/05/2025',
//     status: 'Absen'
//   },
//   {
//     name: 'Andi',
//     time: '08:07 17/05/2025',
//     status: 'Hadir'
//   },
//   {
//     name: 'Putri',
//     time: '08:20 17/05/2025',
//     status: 'Izin'
//   },
//   {
//     name: 'Dimas',
//     time: '08:15 17/05/2025',
//     status: 'Hadir'
//   },
//   {
//     name: 'Yuli',
//     time: '00:00 17/05/2025',
//     status: 'Absen'
//   }
// ];
