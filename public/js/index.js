$(document).ready(() => {
    $("#create").on('click', function() {
        console.log($('#name').val())
        if($('#name').val()) {
            localStorage.setItem('client', 'A')
            localStorage.setItem('rm_name', $('#name').val())

            document.location.href = "/a"
        }
    })
})