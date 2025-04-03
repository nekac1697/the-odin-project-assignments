//1️⃣ Find the sum of all even numbers in an array.
//2️⃣ Convert an array of numbers into an array of their squares.
//3️⃣ Extract only the names from an array of objects like { id: 1, name: "Alice" }.

function v1(){
    let niz = [1,2,3,4,5,6,7,8,9,10,20];
    const people = [
        { id: 101, name: "Emma" },
        { id: 102, name: "Liam" },
        { id: 103, name: "Olivia" },
        { id: 104, name: "Noah" }
      ];
    let glavnidiv = document.getElementById('glavni');
    let glavnidiv2 = document.getElementById('glavni2');
    
    
    
    function sumEven(array){
        return array.reduce((total,num)=>{
            if(num%2 === 0){
                return total+num
            }
            return total;
        },0)
    }
    console.log(sumEven(niz))
    
    function numToSquare(array){
        return array.map((number)=>{ return number * number})
    }
    let kvadriranNiz = numToSquare(niz)
    kvadriranNiz.forEach(number => {
        let p = document.createElement('p');
        p.textContent = number;
        glavnidiv.appendChild(p)
        
    });
    console.log(kvadriranNiz)
    
    function namesOnly(array){
        let  namesOnly1 =array.map(({name})=>name);
        namesOnly1.forEach(name => {
            let p = document.createElement('p');
            p.textContent = name;
            glavnidiv2.appendChild(p)});
    
    }
    namesOnly(people)
    
    
    };
    
    
    
    //4️⃣ Find the longest word in an array of strings.
    //Example: ["apple", "banana", "cherry", "blueberry"] → "blueberry"
    
    //5️⃣ Check if all numbers in an array are positive.
    //Example: [1, 5, 8, 12] → true
    //Example: [1, -5, 8, 12] → false
    
    //6️⃣ Count the occurrences of each word in an array of strings.
    //Example: ["apple", "banana", "apple", "cherry", "banana", "banana"]
    //Output: { apple: 2, banana: 3, cherry: 1 }
    
    function v2(){
        let niz1 = ["apple", "banana", "cherry", "blueberry"];
        let niz2a = [1, 5, 8, 12];
        let niz2b = [1, -5, 8, 12];
        let niz3 = ["apple", "banana", "apple", "cherry", "banana", "banana"];
    
        function longestWord(array){
            
    
            return array.reduce((longest,word)=>{
                if(word.length > longest.length){
                    longest = word;
                }
                return longest;
            })
        
        }
        console.log(longestWord(niz1))
    
        function positiveNumbers(array){
            let niz = array.filter((number)=> number<=0)
            console.log(niz)
            if(niz.length == 0){
                return true;
            }
            return false;
    
        }
        console.log(positiveNumbers(niz2a))
        console.log(positiveNumbers(niz2b))
    
        function countWords(array){
            
           return array.reduce((total,fruit)=>{
                total[fruit] = (total[fruit] || 0)+1;
                return total;
            },{})
        }
        console.log(countWords(niz3))
    }
    
    
    
    function v3(){
        // 4️⃣ Find the first number greater than 10 in an array
        //5️⃣ Convert an array of Fahrenheit temperatures to Celsius
        //6️⃣ Sort an array of numbers in ascending order
    
        let niz1 = [8,2,5,6,2,3]
    
        let niz2 = [23,-10,4,18,0]
    
    
        function biggerThan10(array){
           return array.find(num=>num>10) || 'No numbers bigger than 10'
        }
    
        function celToFar(array){
           return array.map(temp=>temp*1.8+32)
        }
    
        function sortAsc(array){
            return [...array].sort((a,b)=>a-b)
        }
    
        console.log(biggerThan10(niz1),celToFar(niz2),sortAsc(niz2))
    }
    
    
    
    function v4(){
        //1️⃣ Find the most frequent number in an array.
        //2️⃣ Remove duplicates from an array.
    
        function freq(array){
            let count =  array.reduce((total,num)=>{
                 total[num] = (total[num] || 0)+1;
                 return total
             },{});
     
             return Object.entries(count).reduce((mostFrequent,current)=>{
                 return current[1] > mostFrequent[1] ? current : mostFrequent;
             })[0]
         }
        let niz1 = [1, 3, 2, 3, 4, 3, 2, 1, 1, 1]; //expected output 1
        let niz2 = [5, 2, 9, 2, 5, 7, 9, 1]; //expected output: [5, 2, 9, 7, 1]
    
       
    
        function noDup(array){
            let filteredArray = [];
           return array.filter((number)=>{
                
                if(!filteredArray.find(num => num === number) || filteredArray.length==0){
                    filteredArray.push(number)
                    
                    return true;
                }
                
                return false
            }
        )
            
        }
    
        console.log(freq(niz1),noDup(niz2))
    }
    