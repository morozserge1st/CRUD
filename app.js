// Const
const headers = [
  'Id',
  'Name',
  'Email',
  'Dob'
]

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    fontSize: '24px',
    margin: '20px',
    borderSpacing: '5px'
  },
  tr: {
    textAlign: 'center',
  },
  th: {
    fontWeight: 'bold',
    backgroundColor: 'orange',
    padding: '10px 50px',
    borderRadius: '10px'
  },
  td: {
    padding: '10px 50px'
  }
}

//Function for adding styles
addStyles = (obj) => {
  return (el) => {
    let newObj = obj[el.className];
    for (const key in newObj) {
      el.style[key] = newObj[key];
    }
  }
}

const addStyle = addStyles(styles);

// Functions for creating elements
createEl = (child, className) => {
  const el = document.createElement(child);
  el.className = className;
  addStyle(el);
  return el;
}

createElWithContent = (child, className) => {
  return (content) => {
    const el = createEl(child, className);
    el.innerText = content;
    return el;
  }
}

//Create elements
const app = document.getElementById('app');

const wrapper = createEl('div', 'wrapper');
const dialog = createEl('div', 'dialog');
const table = createEl('table', 'table');
const header = createEl('tr', 'header');
const th = createElWithContent('th', 'th');
const td = createElWithContent('td', 'td');

// Add elements
app.append(wrapper);
wrapper.append(table);
app.append(dialog);
table.append(header)

headers.forEach(x => header.append(th(x)));
