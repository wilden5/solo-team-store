class DOMHelper {
  static createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    props?: Partial<HTMLElementTagNameMap[K]>,
    parentElement?: Element,
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
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
