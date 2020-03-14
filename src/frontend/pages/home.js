window.handleHomeRequest = () => {
  document.body.innerHTML = `<div class="flex-container">
  <h1>Meal Sharing App</h1>
  <a href="meals" data-navigo>Go To Meals</a>
  </div>`;

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
