var stackarr = []
var operation = document.getElementById('operation')
var stack = document.getElementById('stack')

stack.addEventListener("click", function(e) {
    if (e.target.nodeName.toLowerCase() == 'span') {
        var index = e.target.getAttribute('data-index')
        stackarr.splice(index, 1)
        render()
    }

})

operation.addEventListener("click", function(e) {
    if (e.target.nodeName.toLowerCase() == 'button') {
        var input_value = operation.childNodes[1].value
        if ((input_value).match(/^\d+$/)) {
            opreate.call(null, e.target, input_value)
        } else {
            alert("you input isn't a number")
        }
    }
})

function checkln(arr) {
    if (arr.length == 0) {
        alert('the stack is empty')
    }
}

function opreate(e, input) {
    console.log(input)
    if (e.name == 'leftin') {
        stackarr.splice(0, 0, input)
    }
    if (e.name == 'rightin') {
        stackarr.push(input)
    }
    if (e.name == 'leftout') {
        checkln(stackarr)
        stackarr.splice(0, 1)
    }
    if (e.name == 'rightout') {
        checkln(stackarr)
        stackarr.pop()
    }
    render()
}

function render() {
    stack.innerHTML = ""
    for (i = 0; i < stackarr.length; i++) {
        newelem = '<span data-index=' + i + '>' + stackarr[i] + '</span>'
        console.log(newelem)
        stack.innerHTML += newelem
    }
}
render()
