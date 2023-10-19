function sum_to_n_a(n: number): number {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}

function sum_to_n_b(n: number): number {
    return n*(n+1)/2
}

function sum_to_n_c(n: number): number {
   if(n != 0) {
    return n + sum_to_n_c(n-1)
   }
   return n
}

let sum_a = sum_to_n_a(99);
let sum_b = sum_to_n_b(99);
let sum_c = sum_to_n_c(99);

console.log("sum a: ", sum_a, " | sum b: ", sum_b, " | sum c: ", sum_c)