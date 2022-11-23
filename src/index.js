import {MiniMaple} from "./miniMaple";

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    document.getElementById('diffButton').onclick = calc;
}

function calc(){
    const expr = document.getElementById('exprInput').value;
    const variable = document.getElementById('varInput').value;
    document.querySelectorAll('.result').forEach(el => el.remove());

    const validExpr = MiniMaple.validateExpr(expr);
    const validVar = MiniMaple.validateVar(variable);
    if (!validExpr) {
        const exprErr = document.createElement('p');
        exprErr.className = 'result';
        exprErr.innerHTML = 'Error: bad expression!';
        exprErr.style.color = 'red';
        document.body.appendChild(exprErr);
    }
    if (!validVar) {
        const varErr = document.createElement('p');
        varErr.className = 'result';
        varErr.innerHTML = 'Error: bad variable name!';
        varErr.style.color = 'red';
        document.body.appendChild(varErr);
    }
    if (validExpr && validVar) {
        const result = document.createElement('p');
        result.className = 'result';
        result.innerHTML = MiniMaple.diff(expr, variable);
        document.body.appendChild(result);
    }
}