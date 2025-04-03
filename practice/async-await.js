
//promises practice
let p = new Promise((resolve,reject)=>{
    let a = 1+1;
    if(a==2){
        resolve('success')
    } else{
        reject('failed')
    }
})

p.then((message)=>{
    console.log('this is in the then' + message)
}).catch((message)=>{ n
    console.log('this is in the catch' + message)
})

function delayedLog(message,delay){
    setTimeout(()=>{
        console.log(message)
    },delay)
}

function delayedLogPromise(message,delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(message);
            resolve();
        }, delay)
    })
}

delayedLogPromise('hello',2000).then(()=>{console.log('message logged')})

//Do a small task: Create a function that fetches data using fetch(), and modify it to use async/await.

async function getData(url) {
    try {
        let response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        console.log(response)
        const json = await response.json();
        console.log(json.title);
    } catch (error) {
        console.log(error)
    }
}
let url = "https://jsonplaceholder.typicode.com/posts/1";


//Write a function that fetches data from an API and logs it, but only if it hasn't been called again within the last 2 seconds.

function getDataDebounced(func,delay) {
    let timeout;

    return function(...args){
        clearTimeout(timeout);
        timeout = setTimeout(()=> func(...args),delay)
    }

}

const dGD = getDataDebounced(getData,2000);

function printText(text){
    console.log(text)
}

function throttle(func,delay){
    let time = 0;

    return function(...args) {
        const now = Date.now();

        if(now-time >= delay){
            func(...args);
        }
    }
}

const tl = throttle(printText('sese'),2000)


//Write an async function called fetchWithRetry that:
//Fetches data from a given url
//Retries up to n times if the request fails
//Waits delay milliseconds before retrying


async function fetchWithRetry(url,retryNumber,delay) {
    try {
        if(retryNumber==0){
            throw new Error("Max retries reached");
        }
        
           
            let response = await fetch(url);
            if(!response.ok){
                

                return new Promise((resolve) => 
                    setTimeout(() => resolve(fetchWithRetry(url, retryNumber - 1, delay)), delay)
                );
            }
    
            let data = await response.json();
            console.log(data)
            return data.title;
        
        

        
    } catch (error) {
        console.log(error)
    }
}


//example use
// fetchWithRetry("https://jsonplaceholder.typicode.com/postdsdss/1", 3, 2000)
//   .then(data => console.log("Data:", data))
//   .catch(error => console.log("Final error:", error));










// fetchWithRetrySquare("https://jsonplaceholder.typicode.com/postdsdss/1",3,1000)
//     .then(tekst => console.log("Tekst:", tekst))
//     .catch(greska => console.log('Finalna greska', greska))


  async function fetchWithRetrySquare(url,retryNumber,baseDelay){

    try {
        let request = await fetch(url);
        if(request.status === 404){
            throw new Error('Resource not found, please check your URL')
        }
        if(retryNumber === 0){
            throw new Error('Max number of tries reached')
        }
        if(!request.ok){
            let squaredDelay = baseDelay * 2;
            return new Promise(((resolve,reject)=>{
                setTimeout(()=>resolve(fetchWithRetrySquare(url,retryNumber-1,squaredDelay)),squaredDelay)

                setTimeout(()=>{
                    fetchWithRetrySquare(url,retryNumber-1,squaredDelay)
                    .then(resolve)
                    .catch(reject)
                },squaredDelay)
            }))
        }

        let data = await request.json();
        return data;
    } catch (error) {
        return Promise.reject(error); // Ensure error gets caught properly
    }
  }

  async function sequentialFetchParalel(urls) {
    const fetchPromises = urls.map(url=> fetch(url))

    try {
        let data = await Promise.all(fetchPromises);
        let jsonData = await Promise.all((data.map(d=>d.json())))
        for(const title of jsonData){
            console.log(title.title)
        }
        console.log(jsonData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  }

//   sequentialFetchParalel([
//     "https://jsonplaceholder.typicode.com/posts/1",
//     "https://jsonplaceholder.typicode.com/posts/2",
//     "https://jsonplaceholder.typicode.com/posts/3"
// ]).then(()=>console.log('ende'))


  async function sequentialFetch(urls) {
    for(const url of urls){
        
        let request = await fetch(url);
        if(request.status === 404){
            throw new Error('Resource not found, please check your URL')
        }
        if(!request.ok){
            throw new Error(error);
        }
        let data = await request.json();
        console.log(data);
    }
    console.log('All Done')
  }

//   sequentialFetch([
//     "https://jsonplaceholder.typicode.com/posts/1",
//     "https://jsonplaceholder.typicode.com/posts/2",
//     "https://jsonplaceholder.typicode.com/posts/3"
// ]).then(()=>console.log('ende'))

async function fetchWithTimeout(url,timeout) {
    //fetches url, rejects if the request takes longer than timeout
    //use promise race 

    try {
        let data = fetch(url).then(response=>{
        if (!response.ok) throw new Error("Fetch failed");
        return response.json()
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
        );

        return await Promise.race([data, timeoutPromise]);
    } catch (error) {
        console.log("Error:", error.message);
    }

}
let url2 = 'https://jsonplaceholder.typicode.com/posts/1'
fetchWithTimeout(url2,5000).then(data => console.log(data))

async function userNameAfterTimeout(url,timeout) {
    return fetch(url)
        .then(response=>response.json())
        .then(name=>name.title)
        .then(data=>{
            return new Promise((resolve,_)=>{
                setTimeout(()=> resolve(`User's name is: ${data}`),timeout)
            })
        })
}



async function fetchUserInfoWithRetry(url, retries, delay){
    
    try {
        if(retries===0){
            throw new Error('All tries used')
        }
        while(retries>0){
            let request = await fetch(url);
            if(!request.ok){
                retries--;
                let squaredDelay = delay * 1.3;
                return new Promise(resolve =>{
                    setTimeout(()=>resolve(fetchUserInfoWithRetry(url,retries,squaredDelay)),delay)
                })
            }
            let data = await request.json()
            return new Promise( resolve=>{
                setTimeout(()=>resolve(data.title),delay)
            })
        

        }
    } catch (error) {
        console.log(error)
    }
    
}

// fetchUserInfoWithRetry('url', 3, 2000).then(data => console.log(data)).catch(error => console.log(error));

async function fetchUserInfoWithRetry2(url, retries, delay) {
    try {
        while (retries > 0) {
            let request = await fetch(url);
            if (!request.ok) {
                retries--;
                console.log(`Retrying... Attempts left: ${retries}`);
                let squaredDelay = delay * 1.3; // Increase the delay after each retry
                await new Promise(resolve => setTimeout(resolve, squaredDelay));
            } else {
                let data = await request.json();
                // Return the data after the delay
                await new Promise(resolve => setTimeout(resolve, delay));
                return data;
            }
        }
        throw new Error('All retry attempts failed');
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error after retries fail
    }
}

fetchUserInfoWithRetry2('https://jsonplaceholder.typicode.com/users/1', 3, 2000)
    .then(data => console.log('User data:', data))
    .catch(error => console.log('Error:', error))



    //OOP PRACTICE

    function StopWatch(){
        let duration =0;
        let startTime;
        let endTime;
        let isRunning = false;

        this.start = function(){
            if(isRunning){
                throw new Error("Already Running");
                
            }
            isRunning = true;
            startTime = new Date();
            
        }
        this.stop = function(){
            if(!isRunning){
                throw new Error("Already Stopped");
                
            }
            isRunning = false;
            endTime = new Date();

            const seconds= ((endTime.getTime()-startTime.getTime())/1000);
            duration+=seconds


        }
        this.reset = function(){
            isRunning = false;
            duration = 0;
            startTime=null;
            endTime=null;
        }

        Object.defineProperty(this,'duration',{
            get: function(){
                return duration;
            }
        })
    }

