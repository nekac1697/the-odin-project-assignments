

//rekurzija vezba
//Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.

//sumTo(1) = 1
//sumTo(2) = 2 + 1 = 3
//sumTo(3) = 3 + 2 + 1 = 6
//sumTo(4) = 4 + 3 + 2 + 1 = 10
//...
//sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

function sumToLoop(n){
    let total = 0;
    for (let i = 0; i <=n; i++) {
        total+=i

    }
    console.log(total)
}

function SumToRecurrsion(n){
    
    if(n===0){
        return 0;
    }
    if(n===1){
        return n;
    }
    return  n+SumToRecurrsion(n-1);
}

function sumToArithmetic(n){
    console.log((n*(1+n))/2) 
}

function factorial(n){
    if (n===1) {return n}
    return n * factorial(n-1)
    //5
}

function fib(n){
    if(n===0){return 0}
    if(n===1){return 1};
    
    return fib(n-1)+fib(n-2)

}

function fibSmart(n){
    let a=1;
    let b=1;
    for(let i=3;i<=n;i++){
        let c =a+b;
        a=b;
        b=c;
    }
    console.log(b)
}

console.log(fib(7))
// sumToLoop(100)
// console.log(SumToRecurrsion(100))
// sumToArithmetic(100)


//Let’s say we have a single-linked list (as described in the chapter Recursion and stack):


let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };

  function printListLoop(list){
    while(list){
        console.log(list);
        list=list.next
    }
  }

  function printListReverseLoop(list){
    let reverseArray = [];
    let tempList = list;
    while(tempList){
        reverseArray.push(tempList.value)
        tempList=tempList.next
    }

    for (let i = reverseArray.length-1; i >=0; i--) {
       console.log(reverseArray)
        sdasdsa
    }
   
  }

  function printListRec(list){
    let temp = list;
    if(temp.next===null){
        console.log(temp.value)
        return;
    }
    console.log(temp.value + 's')
    
    printListRec(temp.next)
    

  }

  function printListReverseRec(list){
    if(list.next === null){
        console.log(list.value + list.next);
        return
    }
    printListReverseRec(list.next);
    console.log(list.value + list.next)
  }

//Write a function printList(list) that outputs list items one-by-one.
//Make two variants of the solution: using a loop and using recursion.
//What’s better: with recursion or without it?




function sumRange(number){
    
//sumRange(5) = 1+2+3+4+5=15
if(number===1){return 1}    
return number + sumRange(number-1)
    
}

function power(base,exp){
    if(exp===0){return 1}
    return base * power(base,exp-1)
}

function factorial(number){
    if(number===1) return 1
    return number * factorial(number-1);
}

//Write a function called all which accepts an array and a callback and returns
//true if every value in the array returns true when passed as parameter to the callback function

let fja = function(num){
    return num <7
}

let niz = [1,2,6]

let niz2 = [1,2,3,5,6,7,8,9,10]
niz2.slice(0,-1);

function all(array,cb){

    let temp = array;
    if(temp.length===0){
        return true;
    }

    if(cb(temp[temp.length-1])===false){
        return false
    }

    temp.pop();
    return all(temp,cb);
}

function alle(array,cb){
    let temp = array;
    //temp = [1,2,9]
    if(temp.length === 0) return true;
    if(cb(temp[0])===false){
        return false;
    }
    return alle(temp.slice(1),cb)

}

function productOfArray(array){
     let temp = array;
     if(temp.length===1) return temp[0];
     return temp[temp.length-1] * productOfArray(temp.slice(0,-1))
}


let nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: 'foo2'
                    }
                }
            }
        }
    }
}


function contains(object,value){
    for(let key in object){
        if(typeof object[key] === 'object'){
            return contains(object[key],value)
        }

        if(object[key]===value){
            return true
        }

        return false;
    }
}


let hasIt = contains(nestedObject, 44); // true
let doesntHaveIt = contains(nestedObject, "foo"); // false

//Write a function that sums squares of numbers in list that may contain more lists

// var l = [1,2,3]; 
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14

// l = [[1,2],3]; 
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14

// l = [[[[[[[[[1]]]]]]]]] 
// console.log(SumSquares(l)); // 1 = 1

// l = [10,[[10],10],[10]] 
// console.log(SumSquares(l)); // 100 + 100 + 100 + 100 = 400

let n1 = [1,2,3]; 
let n2 = [[1,2],3]; 
let n3 = [[[[[[[[[1]]]]]]]]];
let n4 = [10,[[10],10],[10]];

function SumSquaresBig(array){
    let total= 0;
    for(let key in array){
        if(Array.isArray(key)){
           return SumSquaresBig(key);
        }
         return array[key]*array[key]
         console.log(total)
    }
    return total;
}

function ssb(array){
    if (array.length ===0) return 0;
    let total = 0;

    for (let i = 0; i < array.length; i++) {
        if(Array.isArray(array[i])){
            total += ssb(array[i])
        }else{
            total+=array[i]*array[i]
        }
    }
    return total
}

function replicate(multiplier,baseNumber,niz=[]){
    
    if(multiplier<1){
        return niz;
    }
    niz.push(baseNumber);
    
    return replicate(multiplier-1,baseNumber,niz);


}

function fibRec(number,niz=[0,1]){
    //fibsrec(8)=[0, 1, 1, 2, 3, 5, 8, 13].

    if (niz.length >= number) {
        return niz.slice(0, number);
    }
   
    niz.push(niz[niz.length - 1] + niz[niz.length - 2]);
    return fibRec(number, niz);
}

//fibrec(4,[0,1]) => false,niz.push(niz[1]+niz[0] sto znaci niz.push(1)),return fibrec(4,[0,1,1]) =>false,niz.push(niz[2]+niz[1]) sto znaci niz.push(2)
//return fibrec(4,[0,1,1,2]) true return niz.slice(0,4)


let unsorted = [3, 2, 1, 13, 8, 5, 0, 1];

function mergeSort(array){
    
    //[3, 2, 1, 13, 8, 5, 0, 1] should return [0, 1, 1, 2, 3, 5, 8, 13]
    let temp = array;
    if(temp.length ===1) return temp;
    let middle = Math.floor(temp.length/2);
    let left = mergeSort(temp.slice(0,middle))
    let right = mergeSort(temp.slice(middle))
    return merge(left,right)

    
}

function merge(left,right){
    console.log("levi "+left,"desni "+right);
    let sorted = []
    let i=0;
    let r=0;

    // Compare elements from both arrays and push the smaller one
    while (i < left.length && r < right.length) {
        if (left[i] < right[r]) {
            sorted.push(left[i]);
            i++;
        } else {
            sorted.push(right[r]);
            r++;
        }
    }

    // If there are leftover elements in left or right, add them
    let done = sorted.concat(left.slice(i)).concat(right.slice(r));
    console.log(done);
    return done
}


let probniNiz = [2,8,5,34,1,98,7,65];

// [4,8]   [3,5]
//while duzine>0
// 1)l=0,r=0 4>3 niz=[3] r++
// 2)l=0 r=1 4<5 niz=[3,4] l++
// 3)l=1 r=1 8>5 niz=[3,4,5] r++
// izlazimo iz while petlje


//nadjemo sredinu,prepolovimo na pola, pozovemo ms na obe strane i uporedimo na krajui
function ms(array){

    if (array.length<=1) {
        return array
    }

    let middle = Math.floor(array.length/2);
    let left = ms(array.slice(0,middle));
    let right = ms(array.slice(middle));


    //funkcija koja uporedjuje nizove
    return uporedi(left,right);
}

function uporedi(left,right){
    let sortiranNiz = []
    let l=0;
    let r=0;
   
    while(l< left.length && r< right.length){
        if(left[l]>=right[r]){
            sortiranNiz.push(right[r]);
            r++
        }else{
            sortiranNiz.push(left[l]);
            l++;
        }
    }

    let done = sortiranNiz.concat(left.slice(l)).concat(right.slice(r));
    return done;

}


































