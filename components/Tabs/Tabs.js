class TabLink {
  constructor(element) {
    this.element = element;
    // Get the custom data attribute on the Link
    this.data = this.element.dataset.tab;
    // Using the custom data attribute get the associated Item element
    this.item = document.querySelector(
      `.tabs-item[data-tab='${this.data}']`,
    );
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem(this.item);
    // change tabs based on url anchor for browser navigation
    window.addEventListener('hashchange', () => this.select());
  }

  select() {
    const anchor = location.hash ? location.hash.slice(1) : 'code';
    if (this.data === anchor) {
      // Get all the elements with the tabs-link class
      let links = document.querySelectorAll('.tabs-link');
      // Using a loop or the forEach method remove the 'tabs-link-selected' class from all the links
      Array.from(links).forEach(element => {
        element.classList.remove('tabs-link-selected');
      });
      // Add a class named "tabs-link-selected" to this link
      this.element.classList.add('tabs-link-selected');
      // Call the select method on the item associated with this link
      this.tabItem.select();
    }
  }
}

class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    // Select all items elements from the DOM
    let items = document.querySelectorAll('.tabs-item');
    // Remove the class "tabs-item-selected" from each element
    Array.from(items).forEach(element => {
      element.classList.remove('tabs-item-selected');
    });
    // Add a class named "tabs-item-selected" to this element
    this.element.classList.toggle('tabs-item-selected');
  }
}

// create a reference to the ".tabs" classes
let links = document.querySelectorAll('.tabs-link');
// Following the code in the Dropdown file, iterate through the array you created above creating a new instance of the TabLink class for each item.
links = Array.from(links).map(link => new TabLink(link));
// Once you have created an array of TabLink instances. call select() on the first item in the array
links.forEach(link => link.select());
