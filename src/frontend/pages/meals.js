window.handleMealsRequest = () => {
  document.body.innerHTML = `
  <div class="meal-table">
  <h1>Meals</h1>
  <table id="meals"></table>
  </div>`;

  // make sure the backend api works before working with it here
  fetch("/api/meals")
    .then(response => response.json())
    .then(meals => {
      const table = document.getElementById('meals');
      const tr = document.createElement('tr');
      table.appendChild(tr);
      Object.keys(meals[0]).forEach(key=>{
        const th = document.createElement('th');
        th.innerHTML = key;
        tr.appendChild(th);
      })
      meals.forEach(meal=>{
        const tr = document.createElement('tr');
        table.appendChild(tr);
        const id = meal.id;
        Object.values(meal).forEach(value=>{
          const td = document.createElement('td');
          td.innerHTML = `<a href="meal/${id}" data-navigo>${value}</a>`;
          tr.appendChild(td);
        })
      })

      router.updatePageLinks();
    });
};
