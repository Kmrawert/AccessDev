window.onload = function (){
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', e =>{
        e.preventDefault();
        window.localStorage.clear();
        fetch('/logout').then(data =>{
            console.log(data);
            window.location = '/';   
        })

    })
}