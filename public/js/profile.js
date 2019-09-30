const apikey = 'AFeiQyudCRNK8T2g46sKFz';
var fileInput = document.querySelector('#fileInput');
const linkName = document.querySelector('#linkName');
const client = filestack.init(apikey);

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  const file = files.item(0);

  client.upload(file)
    .then(res => {
      console.log('success: ', res);
        linkName.value = res.url;
        console.log(image);
    })
    .catch(err => {
      console.log(err)
    });
  });