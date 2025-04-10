//Assignment
//You’ll build a balanced BST in this assignment. Do not use duplicate values because they make it more complicated and result
//in trees that are much harder to balance. Therefore, be sure to always remove duplicate values or check for an existing value before inserting.

//Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.

function Node(value=null,left=null,right=null){
    return{
        value,left,right
    }
}

//Build a Tree class/factory which accepts an array when initialized.
//The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

function Tree(arr){
    let root = buildTree(arr)
}

//Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
//and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!).
//The buildTree function should return the level-0 root node.

function buildTree(array){

    //1 sort the array
    //2 find middle
    //3 root = middle
    if (array.length === 0) return null;

    let sortedArray = mergeSort(array);

    let midIndex = Math.floor((sortedArray.length-1)/2);
    let rootValue = sortedArray[midIndex];

    
    let leftArray = sortedArray.slice(0,midIndex);
    let rightArray = sortedArray.slice(midIndex+1);

    let root = new Node(rootValue,buildTree(leftArray),buildTree(rightArray));
    return root;
    
    
}

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

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let arr = [1,8,2,14,5,67,34,22,21,64,12,15]
let tree = buildTree(arr)
prettyPrint(tree);