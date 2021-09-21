
config = document.getElementById('config');
config.addEventListener('click', ()=>{
    menuConfig = document.getElementById('configMenu');
    menuConfig.classList.toggle('disabled');
});

darkmode = document.getElementById('darkmode')
darkmode.addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('dark');
})