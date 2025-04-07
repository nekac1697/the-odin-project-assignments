
//if (index < 0 || index >= buckets.length) {
//throw new Error("Trying to access index out of bounds");
//}

function LinkedList(head=null){

    
    return{
        head,
        append(value){
            //adds a new node containing value to the end of the list
            if(this.head===null){
                let newNode = new Node(value);
                this.head = newNode;
                this.toString()
                return;
            }
            let current = this.head;
            while(current.next!== null){
                current = current.next;
            }
            let newNode = new Node(value);
            current.next = newNode;
            return this.toString();
            
        },
        prepend(value){
            //adds a new node containing value to the start of the list
            let newNode = new Node(value,this.head)
            this.head = newNode;

            console.log(this.toString());
           
        },
        size(){
            //returns the total number of nodes in the list
            if(this.head === null){
                return 0;
            }
            let total=1;
            let current = this.head;
            while(current.next !== null){
                total++
                current=current.next;
            }
            return total;
        },
        getHead(){
            if(this.head === null){
                return null;
            }
            return this.head;
            //returns the first node in the list
        },
        getTail(){
            if(this.head === null){
                return null;
            }
            if(this.head.next === null){
                return this.head;
            }
            let current = this.head.next;
            while(current.next !== null){
                current=current.next;
            }
            return current
        },
        at(index){
            if(index<0){
                return 'Please Enter a valid index'
            }
            if(this.head===null){
                return 'Empty List'
            }
            let i=0;
            let current = this.head;
            while(true){
                if(current==null){
                    return 'Value too big'
                }
                if(i==index){
                    return current;
                }
                
                current=current.next;
                i++
            }

        },
        pop(){
            //remove last element
            if(this.head === null){
                console.log('empty');
                return;
            }
            if(this.head.next === null){
                this.head =null;
                console.log('destoryed the only element');
                return;
            }
            let current = this.head;
            
            while (current.next.next !== null) { // Stop at second-last node
                current = current.next;
            }
            
            current.next=null;
            console.log(this.toString());
        },
        contains(value){
            if(this.head === null){
                console.log('empty list');
                return;
            }
            let current = this.head;
            while(true){
                if(current===null){
                    return false;
                }
                if(current.value === value){
                    return true
                }
                
                current=current.next;
            }
        },
        find(value){
            //returns the index of the node containing value, or null if not found.
            if(this.head === null){
                console.log('empty list');
                return null;
            }
            let current = this.head;
            let i=0;
            while(true){
                if(current===null){
                    return null;
                }
                if(current.value === value){
                    return i;
                }
                
                current=current.next;
                i++;
            }
        },
        toString(){
            //represents your LinkedList objects as strings, so you can print them out and preview them in the console.
            //The format should be: ( value ) -> ( value ) -> ( value ) -> null

            if(this.head ==null){
                return 'List is empty'
            }
            
            let current = this.head;
            let listInString = ``;

            while(current !== null){
                listInString += (`${current.value} ->`);
                current = current.next;
            }
            listInString+=null;
            return listInString;
        },
        insertAt(value, index){
            //insertAt(value, index) that inserts a new node with the provided value at the given index.
            if(this.head===null && index===0){
                this.head = new Node(value);
                console.log(this.toString());
                return;
            }
            let current = this.head;
            let i=0;
            if(i===index){
                let newNode = new Node(value,current);
                this.head = newNode;
            }
            while(i !== index){
                i++;
                if(i===index){
                    let newNode = new Node(value,current.next)
                    current.next=newNode;
                    console.log(this.toString());
                }
                if(current===null){
                    return 'index too big'
                }
                current=current.next;

            }
        },
        removeAt(index) {
            if (this.head === null || index < 0) return 'Invalid index';
        
            if (index === 0) { // Remove head
                this.head = this.head.next;
                return this;
            }
        
            let current = this.head;
            let i = 0;
        
            while (current.next !== null) {
                if (i === index - 1) { // Stop at node before the one we remove
                    current.next = current.next.next;
                    return this;
                }
                current = current.next;
                i++;
            }
        
            return 'Index too big';
        }
    };
}

function Node(value=null,next=null){
    return {
        value,
        next
    }
}

const test = new HashMap();
test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')
 test.clear()

function HashMap(loadFactor=0.75,capacity=16){
    let buckets = new Array(capacity).fill(null)
    // imamo hashmap to je array ciji svaki element pravi linked list.
    // pre nego sto ubacimo element u array, moramo da ga roknemo kroz hash fju - gde ce
    //npr blue lion postati 776, i onda to podelimo sa module % od ukupne duzine array
    // i dobijemo npr 776%16 = npr 8. znaci da ide na index 8
    //ako je prazno unutra, postaje head, ako nije prazno postaje tail.
    return{
        buckets,
        hash(key) {
            let hashCode = 0;
               
            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
              hashCode = primeNumber * hashCode + key.charCodeAt(i);
            }
         
            return hashCode;
          },
        set(key,value){
            let hashedValue = this.hash(key);
            let index = hashedValue % capacity;

            if(this.buckets[index]===null){
                this.buckets[index] = new LinkedList();
                this.buckets[index].prepend({
                    key:key,
                    value:value,  
                })
            }else{
                let current = this.buckets[index].head;  

                while(current !== null){
                    if(current.value.key === key){
                        current.value.value = value;
                        return;
                    }
                    current = current.next;
                }

                this.buckets[index].prepend({ key, value });
            }


        },
        get(key){
            //get(key) takes one argument as a key and returns the value that is assigned to this key.
            //  If a key is not found, return null.
            let hashedValue = this.hash(key);
            let index = hashedValue % capacity;

            if(this.buckets[index]===null){
                return null;
            }else{
                let current = this.buckets[index].head;
                while(current!== null){
                    if(current.value.key === key){
                        return current.value.value;
                    }
                    current = current.next;
                }
                return null;  
            }
        },
        has(key){
            //has(key) takes a key as an argument and returns true or false 
            // based on whether or not the key is in the hash map.

            let hashedValue = this.hash(key);
            let index = hashedValue % capacity;

            if(this.buckets[index]===null){
                return false;
            }else{
                let current = this.buckets[index].head;
                while(current!== null){
                    if(current.value.key === key){
                        return true
                    }
                    current = current.next;
                }
                return false;
            }
        },
        remove(key){
            //remove(key) takes a key as an argument. If the given key is in the hash map,
            //it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
            let hashedValue = this.hash(key);
            let index = hashedValue % capacity;

            if(this.buckets[index]===null){
                return false;
            }else{
                let current = this.buckets[index].head;
                let i=0;
                while(current!== null){
                    if(current.value.key === key){
                        this.buckets[index].removeAt(i)
                        return true;
                    }
                    i++
                    current = current.next;
                }
                return false;  
            }
        },
        length(){
           // length() returns the number of stored keys in the hash map.
           let total = 0;
           for(let bucket of this.buckets){
            if(bucket !== null){
                total+=bucket.size();
            }
            
           }
           return total;
        },
        clear() {
            console.log('Before clear:', this.buckets);
            this.buckets = new Array(capacity).fill(null);
            console.log('After clear:', this.buckets);
        },
        keys(){
            //keys() returns an array containing all the keys inside the hash map.
            let keysArray = [];
            for(let bucket of this.buckets){
                if(bucket !== null){
                    let current = bucket.head;
                    while(current !== null){
                        keysArray.push(current.value.key);
                        current=current.next;
                    }
                }
            }
            return keysArray;
        },
        values(){
            //values() returns an array containing all the values.
            let valuesArray = [];
            for(let bucket of this.buckets){
                if(bucket !== null){
                    let current = bucket.head;
                    while(current !== null){
                        valuesArray.push(current.value.value);
                        current=current.next;
                    }
                }
            }
            return valuesArray;
        },
        entries(){
            //entries() returns an array that contains each key, value pair.
            //  Example: [[firstKey, firstValue], [secondKey, secondValue]]
            let entriesArray = [];
            for(let bucket of buckets){
                if(bucket !== null){
                    let current = bucket.head;
                    while(current !== null){
                        entriesArray.push(current.value);
                        current=current.next;
                    }
                }
            }
            return entriesArray;
        }
    }
}