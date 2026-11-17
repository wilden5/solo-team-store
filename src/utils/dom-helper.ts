class DOMHelper {
  static createElement<T extends HTMLElement>(
    tagName: string,
    props: Partial<T>,
    parentElement?: Element,
  ): T | HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    parentElement?.appendChild(element);

    return Object.assign(element, props);
  }

  static getElement<T extends HTMLElement>(classSelector: string): T {
    const element: T | null = document.querySelector(`.${classSelector}`);

    if (element === null) {
      throw new Error(`Element with selector '${classSelector}' not found.`);
    }

    return element;
  }

  static appendChildToElement<T extends HTMLElement>(parent: HTMLElement, child: T): void {
    parent.appendChild(child);
  }
}

export default DOMHelper;
