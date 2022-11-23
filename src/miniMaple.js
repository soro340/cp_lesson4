export class MiniMaple {
    static diff(expression, variable) {
        expression = expression.replaceAll(' ', '').replaceAll('-', '+-');
        variable = variable.replaceAll(' ', '');
        const monomials = expression.split(/\++/);

        let result = '';
        monomials.forEach((monomial) => {
            const multipliers = monomial.split('*');
            let k = 1;
            const kSymbols = [];
            let diffSymbol;
            multipliers.forEach((multiplier) => {
                const num = Number(multiplier);
                if (isNaN(num)) {
                    let [base, exp] = multiplier.split('^');
                    if (base[0] === '-') {
                        k *= -1;
                        base = base.slice(1);
                    }
                    exp = exp !== undefined ? Number(exp) : 1;
                    if (base === variable) {
                        switch (exp) {
                            case 0:
                                break;
                            case 1:
                                diffSymbol = [];
                                break;
                            case 2:
                                diffSymbol = [base];
                                break;
                            default:
                                diffSymbol = [`${base}^${exp - 1}`];
                        }
                        k *= exp;
                    } else {
                        kSymbols.push(exp === 1 ? base : `${base}^${exp}`);
                    }
                } else {
                    k *= num;
                }
            });
            if (diffSymbol) {
                result += k >= 0 ? (result ? ' + ' : '') : (result ? ' - ' : '-');
                k = Math.abs(k);
                k = (k === 1 && (kSymbols.length > 0 || diffSymbol.length > 0)) ? [] : [k];
                result += [...k, ...kSymbols, ...diffSymbol].join('*');
            }
        });
        return result || '0';
    }

    static validateExpr(str) {
        return /^[\w+*^ -]+$/.test(str);
    }

    static validateVar(str) {
        return /^[a-zA-Z_][\w ]*$/.test(str);
    }
}