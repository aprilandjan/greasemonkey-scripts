//  1,604,036,303,685 => sss
function timestampStringToDateString(t) {
  return new Date(parseInt(t.split(',').join(''))).toLocaleString();
}

function transformColumnValues(columnKey, transFn) {
  //  find table
  const table = document.querySelector('table.kbn-table');
  if (!table) {
    return;
  }
  //  list all th
  const thList = Array.from(table.querySelectorAll('th'));
  //  find column index
  let columnIndex = -1;
  thList.forEach((th, idx) => {
    const span = th.querySelector('span');
    if (span && span.innerText.trim() === columnKey) {
      columnIndex = idx;
    };
  });
  if (columnIndex < 0) {
    return;
  }
  //  do transform
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach((row, idx) => {
    const tdList = row.querySelectorAll('td');
    //  elk table body has 1 more column offset
    const targetEl = tdList[columnIndex + 1];
    if (!targetEl || targetEl.__trans) {
      return;
    }
    const span = targetEl.querySelector('span');
    if (span) {
      targetEl.removeChild(span);
    }
    targetEl.innerText = transFn(targetEl.innerText);
    //  mark this to prevent re-trans
    targetEl.__trans = true;
    if (span) {
      targetEl.appendChild(span);
    }
  })
}

//  manual icon
const el = document.createElement('div');
el.innerText = 'T';
el.title = 'transform timestamp to date string';
el.style.cssText = 'position: fixed; right: 10px; bottom: 10px; cursor: pointer; background: #ccc; color: #333; border: 1px solid white; font-size: 20px; line-height: 30px; width: 30px; border-radius: 2px; text-align: center; z-index: 99999';
el.onclick = () => {
  transformColumnValues('my-col', timestampStringToDateString);
}

setInterval(() => {
  if (!el.parentNode) {
    document.body.appendChild(el);
  }
}, 1000);
