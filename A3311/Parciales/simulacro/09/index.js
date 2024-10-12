document.addEventListener("DOMContentLoaded", () => {
  onInit();
});

function onInit() {
  let arr = [
    { id: 1, title: "Honda Civic", model: 2005, status: 1 },
    { id: 2, title: "Chevrolet", model: 2012, status: 0 },
    { id: 3, title: "Ford Fiesta", model: 2011, status: 1 },
    { id: 4, title: "Ford Focus", model: 2022, status: 1 },
    { id: 5, title: "Mustang", model: 2024, status: 0 },
    { id: 6, title: "Camaro", model: 2001, status: 1 },
    { id: 7, title: "Ford Ka", model: 2015, status: 1 },
    { id: 8, title: "Fiat 600", model: 1998, status: 0 },
  ];

  console.log(arr);

  // Implemento Filter
  const arrFilter = arr.filter(item => {
    return item.status == 0;
  });

  console.log(arrFilter);

  // implemento mapeo
  const arrMap = arr.map(item => {
    item.status = item.status == 1 ? "Activo" : "Inactivo";
 
    return item;
  });

  console.log(arrMap);

  const sumModel = arr.reduce((acc, auto) => acc + auto.model, 0);

  console.log("promedio: " + sumModel / arr.length);

  const aux = arr.find(item => item.id == 8);
  console.log(aux);
}
