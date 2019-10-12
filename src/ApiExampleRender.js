import { LitElement, html, css } from 'lit-element';
import '@advanced-rest-client/clipboard-copy/clipboard-copy.js';
import '@advanced-rest-client/json-table/json-table.js';
import styles from '@advanced-rest-client/prism-highlight/prism-styles.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
/**
 * `api-example-render`
 *
 * Renders a JSON values using Prism highlighter or JSON table.
 *
 * ## Data model
 *
 * The model is generated by `api-example-generator`. Use it to generate
 * view model for examples for AMF shape.
 *
 * ### ExampleModel
 *
 * - **hasRaw** `Boolean` - if true then `raw` property has a value
 * - **hasTitle** `Boolean` - if true then `title` property has a value
 * - **hasUnion** `Boolean` - if true then `values` property has a value
 * - **value** `String`, Optional - Example to render
 * - **title** - `String`, Optional - Example name, only when `hasTitle` is set
 * - **raw** `String`, Optional - Raw value of RAML example. This value is a
 * YAML or JSON schema value. This is only set when raw value is available in
 * the model and it is not JSON/XML.
 * - **values** `Array<ExampleModel>`, Optional - Only when `hasUnion` is set.
 *
 * ## Example
 *
 * ```javascript
 * <api-example-render example="{...}" is-json mime-type="application/json"></api-example-render>
 * ```
 *
 * ## Styling
 *
 * `<api-resource-example-document>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--api-example-render` | Mixin applied to this elment | `{}`
 * `--code-block` | Mixin applied to the output block | `{}`
 *
 * @customElement
 * @demo demo/index.html
 * @memberof ApiElements
 */
export class ApiExampleRender extends LitElement {
  static get styles() {
    return [
      styles,
      css`
      :host {
        display: block;
        background-color: inherit;
      }

      .code-wrapper {
        padding: 0px;
      }

      #output {
        white-space: pre-wrap;
        word-wrap: var(--code-block-word-wrap, break-word);
        word-break: var(--code-block-word-break, break-all);
        font-family: var(--arc-font-code-family);
      }

      [hidden] {
        display: none !important;
      }

      .example-title {
        font-weight: var(--arc-font-body1-font-weight);
        line-height: var(--arc-font-body1-line-height);
        font-size: 15px;
        margin: 0 8px 4px 0px;
      }

      .union-toggle {
        outline: none;
        background-color: var(--api-type-document-union-button-background-color, transparent);
        color: var(--api-type-document-union-button-color, #000);
        border-width: 1px;
        border-color: var(--api-body-document-media-button-border-color, #a3b11d);
        border-style: solid;
      }

      .union-toggle[activated] {
        background-color: var(--api-type-document-union-button-active-background-color, #CDDC39);
        color: var(--api-type-document-union-button-active-color, #000);
      }

      .action-button {
        outline: none;
        border-width: 1px;
        border-color: var(--api-body-document-action-button-border-color, #BDBDBD);
        border-style: solid;
      }

      .action-button[active] {
        background-color: var(--api-resource-example-document-button-active-background-color, #e0e0e0);
        color: var(--api-resource-example-document-button-active-color, currentColor);
      }

      .union-type-selector {
        margin: 0px 8px 12px 0px;
      }

      .examples-header {
        display: flex;
        align-items: center;
        flex-direction: row;
      }

      .code-wrapper.scalar {
        padding-top: 1px;
      }

      .example-actions {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        flex: 1;
      }

      api-example-render {
        background-color: inherit;
      }

      anypoint-button {
        height: 28px;
      }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * Data to render.
       */
      example: { type: Object },
      /**
       * Examples media type
       */
      mediaType: { type: String },
      /**
       * When true the example is a JSON type example.
       */
      isJson: { type: Boolean },
      /**
       * Index of selected union.
       */
      selectedUnion: { type: Number },
      /**
       * Current state of "table" button. When tru the button is highlighted.
       * Note, this won't trigger rendering table/code view as this property is used
       * by `api-resource-example-document` to handle table state change.
       */
      table: { type: Boolean },
      /**
       * When set it renders JSON table instead of code view.
       */
      renderTable: { type: Boolean },
      /**
       * Opens example source view (source from API spec file).
       */
      sourceOpened: { type: Boolean },
      /**
       * When set the title won't be rendered event if the example has one.
       */
      noTitle: { type: Boolean },
      /**
       * When set the actions row (copy, switch view type) is not rendered.
       */
      noActions: { type: Boolean },
      /**
       * Enables Anypoint compatibility styling
       */
      compatibility: { type: Boolean }
    };
  }

  get table() {
    return this._table;
  }

  set table(value) {
    if (this._setObservableProperty('table', value)) {
      this.dispatchEvent(new CustomEvent('table-changed', {
        composed: true,
        detail: {
          value
        }
      }));
    }
  }

  get mediaType() {
    return this._mediaType;
  }

  set mediaType(value) {
    if (this._setObservableProperty('mediaType', value)) {
      this._dataChanged(value, this._example, this._sourceOpened);
    }
  }

  get example() {
    return this._example;
  }

  set example(value) {
    if (this._setObservableProperty('example', value)) {
      this._dataChanged(this._mediaType, value, this._sourceOpened);
      this.selectedUnion = 0;
    }
  }

  get sourceOpened() {
    return this._sourceOpened;
  }

  set sourceOpened(value) {
    if (this._setObservableProperty('sourceOpened', value)) {
      this._dataChanged(this._mediaType, this._example, value);
    }
  }

  constructor() {
    super();
    this.sourceOpened = false;
  }

  _setObservableProperty(prop, value) {
    const key = '_' + prop;
    const old = this[key];
    if (old === value) {
      return false;
    }
    this[key] = value;
    this.requestUpdate(prop, old);
    return true;
  }
  /**
   * Computes whether passed value is a valig JSON object, when component is
   * marked to parse JSON data.
   * @param {Boolean} isJson [description]
   * @param {String} value Current example value
   * @return {Boolean}
   */
  _computeIsJson(isJson, value) {
    if (!isJson) {
      return false;
    }
    if (!value) {
      return false;
    }
    try {
      const result = JSON.parse(value);
      return typeof result === 'object';
    } catch (_) {
      return false;
    }
  }

  _computeHasRaw(value, raw) {
    if (!raw) {
      return false;
    }
    return String(raw) !== String(value);
  }

  _dataChanged(mediaType, example) {
    if (this.__changeDebouncer || !example) {
      return;
    }
    this.__changeDebouncer = true;
    setTimeout(() => {
      this.__changeDebouncer = false;
      this._renderCode();
    });
  }

  _renderCode() {
    const example = this.example;
    if (!example || (!example.value && example.values)) {
      return;
    }
    const output = this.shadowRoot.querySelector('#output');
    if (!output) {
      setTimeout(() => this._renderCode());
      return;
    }
    if (this.sourceOpened) {
      output.innerHTML = this.highlight(String(example.raw), 'yaml');
    } else {
      const value = String(example.value);
      if (value || value === false || value === 0) {
        output.innerHTML = this.highlight(value, this.mediaType);
      } else {
        output.innerText = '(no value in example)';
      }
    }
  }
  /**
   * Dispatches `syntax-highlight` custom event
   * @param {String} code Code to highlight
   * @param {String} type Mime type of the code
   * @return {String} Highlighted code.
   */
  highlight(code, type) {
    let lang;
    if (type) {
      if (type.indexOf('json') !== -1) {
        lang = 'json';
      } else if (type.indexOf('xml') !== -1) {
        lang = 'xml';
      }
    }
    const ev = new CustomEvent('syntax-highlight', {
      bubbles: true,
      composed: true,
      detail: {
        code,
        lang
      }
    });
    this.dispatchEvent(ev);
    return ev.detail.code;
  }
  /**
   * Coppies current response text value to clipboard."tabble"
   *
   * @param {Event} e
   */
  _copyToClipboard(e) {
    const button = e.target;
    const copy = this.shadowRoot.querySelector('clipboard-copy');
    if (copy.copy()) {
      button.innerText = 'Done';
    } else {
      button.innerText = 'Error';
    }
    button.disabled = true;
    if ('part' in button) {
      button.part.add('content-action-button-disabled');
      button.part.add('code-content-action-button-disabled');
    }
    setTimeout(() => this._resetCopyButtonState(button), 1000);
  }
  /**
   * Resets button icon.
   * @param {Element} button Button to reset.
   */
  _resetCopyButtonState(button) {
    button.innerText = 'Copy';
    button.disabled = false;
    if ('part' in button) {
      button.part.remove('content-action-button-disabled');
      button.part.remove('code-content-action-button-disabled');
    }
  }

  _computeUnionExamples(selectedUnion, example) {
    if (selectedUnion === undefined || selectedUnion < 0) {
      return;
    }
    if (!example || !example.values) {
      return;
    }
    return example.values[selectedUnion];
  }

  _toggleTable(e) {
    const { target } = e;
    const { value } = e.detail;
    this.table = value;
    if (value && this.sourceOpened) {
      this.sourceOpened = !value;
    }
    this._toggleActionButtonCssPart(target, value);
  }

  _toggleSourceOpened(e) {
    const { target } = e;
    const { value } = e.detail;
    this.sourceOpened = value;
    if (value && this.table) {
      this.table = !value;
    }
    this._toggleActionButtonCssPart(target, value);
  }

  _toggleActionButtonCssPart(target, active) {
    if (!('part' in target)) {
      return;
    }
    const parts = ['content-action-button-active', 'code-content-action-button-active'];
    for (let i = 0, len = parts.length; i < len; i++) {
      if (active) {
        target.part.add(parts[i]);
      } else {
        target.part.remove(parts[i]);
      }
    }
  }
  /**
   * Handler for union type button click.
   * Sets `selectedUnion` property.
   *
   * @param {ClickEvent} e
   */
  _selectUnion(e) {
    const index = Number(e.target.dataset.index);
    if (index !== index) {
      return;
    }
    if (this.selectedUnion === index) {
      e.target.setAttribute('activated', '');
    } else {
      this.selectedUnion = index;
    }
  }

  _renderUnion(example) {
    const values = example.values;
    if (!values) {
      return;
    }
    const unions = example.values.map((item) => item.title);
    const selectedUnion = this.selectedUnion;
    const unionExample = this._computeUnionExamples(selectedUnion, example);
    return html`
      <div class="union-type-selector">
        <span>Any of:</span>
        ${unions.map((item, index) => html`
          <anypoint-button
            class="union-toggle"
            ?activated="${selectedUnion === index}"
            @click="${this._selectUnion}"
            data-index="${index}"
            ?compatibility="${this.compatibility}"
            title="Select ${item} type">${item}</anypoint-button>`)}
      </div>
      ${unionExample ? html`
        <api-example-render
          .example="${unionExample}"
          .isJson="${this.isJson}"
          .mediaType="${this.mediaType}"
          .table="${this.table}"
          .renderTable="${this.renderTable}"
          notitle
          .noActions="${this.noActions}"></api-example-render>` : undefined}
    `;
  }

  _headerTemplate(example) {
    const renderTitle = !example.isScalar || example.hasTitle;
    const noActions = !!(this.noActions || example.isScalar);
    if (noActions && !renderTitle) {
      return '';
    }
    return html`<div class="examples-header">
      ${renderTitle ? this._titleTemplate(example) : ''}
      ${!noActions ? this._actionsTemplate(example) : ''}
    </div>`;
  }

  _titleTemplate(example) {
    const label = (this.noTitle || !example.title) ? 'Example' : example.title;
    return html`<span class="example-title">${label}</span>`;
  }

  _actionsTemplate(example) {
    const { compatibility } = this;
    const hasRaw = this._computeHasRaw(example.value, example.raw);
    const isJson = this._computeIsJson(this.isJson, example.value);
    return html`
    <div class="example-actions">
      <anypoint-button
        part="content-action-button, code-content-action-button"
        class="action-button"
        data-action="copy"
        @click="${this._copyToClipboard}"
        ?compatibility="${compatibility}"
        title="Copy example to clipboard"
      >Copy</anypoint-button>
      ${isJson ? html`
        <anypoint-button
          part="content-action-button, code-content-action-button"
          class="action-button"
          data-action="table"
          toggles
          .active="${this.table}"
          @active-changed="${this._toggleTable}"
          ?compatibility="${compatibility}"
          title="Toggle between table and JSON view"
        >Table view</anypoint-button>` : undefined}
      ${hasRaw ? html`
        <anypoint-button
          part="content-action-button, code-content-action-button"
          class="action-button"
          data-action="code"
          toggles
          .active="${this.sourceOpened}"
          @active-changed="${this._toggleSourceOpened}"
          ?compatibility="${compatibility}"
          title="Toggle between JSON and example source view"
        >Source view</anypoint-button>` : undefined}
    </div>`;
  }

  _renderExample(example) {
    return html`
    ${this._headerTemplate(example)}
    ${this.renderTable ? html`<json-table .json="${example.value}"></json-table>`: undefined}
    <div class="code-wrapper ${example.isScalar ? 'scalar': ''}" part="code-wrapper, example-code-wrapper" ?hidden="${this.renderTable}">
      <code id="output" class="markdown-html" part="markdown-html" language-xml=""></code>
    </div>`;
  }

  render() {
    const example = this.example;
    if (!example) {
      return html``;
    }
    const isUnion = !!(example && example.hasUnion);
    return html`
    ${isUnion ? this._renderUnion(example) : this._renderExample(example)}
    <clipboard-copy .content="${example.value}"></clipboard-copy>
    `;
  }
}
