window.handleMealRequest = params => {
  document.body.innerHTML = `
  <div class="meal">
  <a href="/meals" data-navigo>back</a>
  <h2 id="meal-name"></h2>
  <p id="meal-desc"></p>
  </div>`;

  fetch(`/api/meals/${params.id}`)
    .then(response => response.json())
    .then(meal => {
      document.getElementById("meal-name").innerHTML = meal.title;
      document.getElementById("meal-desc").innerHTML = meal.description;
    })
    router.updatePageLinks();
};
