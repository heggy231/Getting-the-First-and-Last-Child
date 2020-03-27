const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const lis = listUl.children;
const firstListItem = listUl.firstElementChild;
const lastListItem = listUl.lastElementChild;

firstListItem.style.backgroundColor = 'lightskyblue';
lastListItem.style.backgroundColor = 'lightsteelblue';

// remove the firstElement up button so you don't have non functioning buttons
// const firstUpButton = lis.firstElementChild;
// since up is an element not a node use css to make it disappear
// firstUpButton.style.display = 'none';
// remove the down button this may be tricky since it may not needed 

// Remember that every time an item is moved, you need to check if it is now the edge item and remove the appropriate button if so.

// And be aware that if you remove the "up" button from the top item (and I assume the "down" button from the bottom), you'll need to recreate them if those items are moved using the remaining button. You'll also need to recreate them if another item is moved to replace them at the top or bottom of the list.

// As an alternative enhancement, I would recommend just setting the button's "disabled" property, which will change the visual appearance in a way most users will recognize as meaning "not active". Then you can just clear that property when the item is moved or another one is moved to take its place.

// https://teamtreehouse.com/community/my-solution-for-the-first-and-last-child-challenge

function attachListItemButtons(li) {
  // debugger;
  let listDiv = document.querySelector('.list');
  let listUl = listDiv.querySelector('ul');
  let firstListItem = listUl.firstElementChild;
  let lastListItem = listUl.lastElementChild;
  // only add `up` when li is NOT firstListItem
  if (li !== firstListItem) {
    let up = document.createElement('button');
    up.className = 'up';
    up.textContent = 'Up';
    li.appendChild(up);
  }

  // only add `down` when li is NOT firstListItem
  if (li !== lastListItem) {
    let down = document.createElement('button');
    down.className = 'down';
    down.textContent = 'Down';
    li.appendChild(down);  
  }

  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  li.appendChild(remove);
}



// buttonType is className .down .up .remove
function removeButtonFromListItem(li, buttonType) {
  // debugger;
  // collection of up/down/remove buttons
  const liChildren = li.children;

  for (let i = 0; i < liChildren.length; i++) {
    // only when className 'up' == 'up'
    if (liChildren[i].className === buttonType) {
      // remove the up button
      li.removeChild(liChildren[i]);
    }
  }
}

function addButtonToListItem(li, buttonType) {
  // debugger;
  let button = document.createElement('button');
  // collection of up/down/remove buttons
  const liChildren = li.children;

  button.className = buttonType;
  if (buttonType === 'up') {
    button.textContent = 'Up';
  } else {
    button.textContent = 'Down';
  }

  for (let i = 0; i < liChildren.length; i++) {
    // user clicked on up
    if (buttonType === 'up' && liChildren[i].className === 'down') {
      li.insertBefore(button, liChildren[i]);
    } else if (buttonType === 'down' && liChildren[i].className === 'remove') {
      li.insertBefore(button, liChildren[i]);
    }
  }
}

for (let i = 0; i < lis.length; i += 1) {
  attachListItemButtons(lis[i]);
}

listUl.addEventListener('click', (event) => {
  // debugger;
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'remove') {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;

      // first li remove button was hit
      if (prevLi === null) {
        removeButtonFromListItem(nextLi, 'up');
      }

      // if el to remove is first el
      if (li === ul.lastElementChild) {
        removeButtonFromListItem(prevLi, 'down');
      }

      ul.removeChild(li);
    }
    if (event.target.className == 'up') {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
      if (li === listUl.firstElementChild) {
        removeButtonFromListItem(li, 'up');
        // prevLi is no longer firstElement
        //  so add up button
        addButtonToListItem(prevLi, 'up');
      // now li is up prevLi is last Element
      } else if (prevLi === listUl.lastElementChild) {
        removeButtonFromListItem(prevLi, 'down');
        addButtonToListItem(li, 'down');
      }
    }  
    if (event.target.className == 'down') {
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;
      // only move down if extLi exists
      if (nextLi) {
        // currently selected li if reference point 
        //  bring nextLi before selected li
        ul.insertBefore(nextLi, li);
      }
      // now li becomes last li
      if (li === listUl.lastElementChild) {
        // remove down button
        removeButtonFromListItem(li, 'down');
        addButtonToListItem(nextLi, 'down');
      }
      // now nextLi is first li, 
      // when press 'down' -> 'up' button gone
      if (nextLi === listUl.firstElementChild) {
        removeButtonFromListItem (nextLi, 'up');
        addButtonToListItem(li, 'up');
      }
    } 
  }
});

toggleList.addEventListener('click', () => {
  if (listDiv.style.display == 'none') {
    toggleList.textContent = 'Hide list';
    listDiv.style.display = 'block';
  } else {
    toggleList.textContent = 'Show list';                        
    listDiv.style.display = 'none';
  }                         
});

descriptionButton.addEventListener('click', () => {
  descriptionP.innerHTML = descriptionInput.value + ':';
  descriptionInput.value = '';
});

addItemButton.addEventListener('click', () => {
  // debugger;
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.createElement('li');
  li.textContent = addItemInput.value;
  ul.appendChild(li);
  attachListItemButtons(li);
  addItemInput.value = '';
  // grab set of div, ul with new li
  let prevLi = li.previousElementSibling;
  addButtonToListItem(prevLi, 'down');
});
