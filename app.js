const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const lis = listUl.children;
// const firstListItem = listUl.firstElementChild;
// const lastListItem = listUl.lastElementChild;

// firstListItem.style.backgroundColor = 'lightskyblue';
// lastListItem.style.backgroundColor = 'lightsteelblue';

function attachListItemButtons(li) {
  let listDiv = document.querySelector('.list');
  let listUl = listDiv.querySelector('ul');
  let firstListItem = listUl.firstElementChild;
  let lastListItem = listUl.lastElementChild;
  if (li === firstListItem) {
    firstListItem.style.backgroundColor = 'lightskyblue';
  }

  if (li === lastListItem) {
    lastListItem.style.backgroundColor = 'lightsteelblue';
  }
  // only add `up` when li is NOT firstListItem
  if (li !== firstListItem) {
    let up = document.createElement('button');
    up.className = 'up';
    up.textContent = 'Up';
    // attaching color assignment for button
    up.style.background = '#52bab3';
    li.appendChild(up);
  }

  // only add `down` when li is NOT firstListItem
  if (li !== lastListItem) {
    let down = document.createElement('button');
    down.className = 'down';
    down.textContent = 'Down';
    // attaching dynamic color assignment for button
    down.style.background = '#508abc';
    li.appendChild(down);  
  }

  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  // attaching dynamic color assignment for button
  remove.style.background = '#768da3';
  li.appendChild(remove);
}



// buttonType is className .down .up .remove
function removeButtonFromListItem(li, buttonType) {
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
  let button = document.createElement('button');
  // collection of up/down/remove buttons
  const liChildren = li.children;

  button.className = buttonType;
  if (buttonType === 'up') {
    button.style.background = '#52bab3';
    button.textContent = 'Up';
  } else {
    button.style.background = '#508abc';
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

  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'remove') {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;

      // first li remove button was hit
      if (prevLi === null) {
        nextLi.style.backgroundColor = 'lightskyblue';
        removeButtonFromListItem(nextLi, 'up');
      }

      // if el to remove is first el
      if (li === ul.lastElementChild) {
        prevLi.style.backgroundColor = 'lightsteelblue';
        removeButtonFromListItem(prevLi, 'down');
      }

      ul.removeChild(li);
    }
    if (event.target.className == 'up') {
      // debugger;
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
      if (li === listUl.firstElementChild) {
        li.style.backgroundColor = 'lightskyblue';
        prevLi.style.backgroundColor = '';
        removeButtonFromListItem(li, 'up');
        // prevLi is no longer firstElement
        //  so add up button
        addButtonToListItem(prevLi, 'up');
      // now li is up prevLi is last Element
      } else if (prevLi === listUl.lastElementChild) {
        li.style.backgroundColor = '';
        prevLi.style.backgroundColor = 'lightsteelblue';
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
  // ;
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
