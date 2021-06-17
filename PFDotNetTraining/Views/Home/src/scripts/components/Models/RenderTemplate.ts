import { Item } from './Item';

export class RenderTemplate {
  table: HTMLTableElement;

  ordering: Array<string>;

  constructor(table: HTMLTableElement, ordering: Array<string>) {
    this.table = table;
    this.ordering = ordering;
  }

  render(item: Item): HTMLTableRowElement {
    const row = this.table
      .getElementsByTagName('tbody')[0]
      .insertRow(-1);
    const map = new Map(Object.entries(item));

    for (let i = 0; i <= this.ordering.length; i += 1) {
      // Render content
      const cell = row.insertCell(-1);
      if (this.ordering[i] === 'icon') {
        cell.className = 'pl-md-5';
        const imgNode = document.createElement('img');
        imgNode.className = 'icon';
        imgNode.src = map.get('icon');
        cell.appendChild(imgNode);
        continue;
      }
      // Hide ID col
      if (this.ordering[i] === 'id') cell.className = 'd-none';
      // Ultility button
      if (i === this.ordering.length) {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        const editText = document.createElement('span');
        editText.innerHTML = 'edit';
        editBtn.appendChild(editText);
        cell.appendChild(editBtn);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close';
        const closeIco = document.createElement('span');
        closeIco.innerHTML = '&times;';
        closeBtn.appendChild(closeIco);
        cell.appendChild(closeBtn);
      } else cell.innerHTML = map.get(this.ordering[i]);
    }

    return row;
  }
}
