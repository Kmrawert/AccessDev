const apikey = 'AFeiQyudCRNK8T2g46sKFz';
var fileInput = document.querySelector('#fileInput');
const linkName = document.querySelector('#linkName');
const name = document.querySelector('#profilename');
const UserId = document.querySelector('#UserId');

const client = filestack.init(apikey);


let UserData = window.localStorage.getItem('UserData');
let ParseData  = JSON.parse(UserData);
console.log(ParseData);
name.value= ParseData.name;
UserId.value = ParseData.id;


fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  const file = files.item(0);

  client.upload(file)
    .then(res => {
      console.log('success: ', res);
        linkName.value = res.url;
        console.log(linkName.value);
    })
    .catch(err => {
      console.log(err)
    });
  });