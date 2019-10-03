// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var more = document.querySelectorAll('.postContainer a');


// The API object contains methods for each kind of request we'll make


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
function renderPost(data) {
  var gigArea = document.querySelector('#gigArea');
  const template = `<div id="gigHeader">
  <h5>${data.title}</h5>
  <div class="gig stats">
    <h6>$${data.money} per person</h6>
    <h6>${data.date}</h6>
  </div>
<a class="grabGig waves-effect waves-light btn-large " UserId= ${data.UserId}><i class="material-icons left">monetization_on</i>Grab It!</a>
</div>
<div id="gigContent">
<p>We need  ${data.instrument} for a ${data.genre} show</p>
  <p>${data.description}</p>
</div>`;
  gigArea.innerHTML = template;

}

more.forEach(link => {
  let id = link.getAttribute('value');
  console.log(id);
  link.addEventListener('click', e => {
    e.preventDefault();
    fetch(`api/gigs/${id}`)
      .then(res =>
        res.json()
      ).then(data => {
        renderPost(data)
      }).finally(data => {
        var button = document.querySelector('.grabGig');
        button.addEventListener('click', e => {
          e.preventDefault();
          const UserId = button.getAttribute('UserId');
          const body = { UserId }
          fetch('/api/giggrab', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
            }

          }).then(function (response) {
            return response.json();
          })
          console.log('click');

        })

      })
  })

})

