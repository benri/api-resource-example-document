import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import '@advanced-rest-client/clipboard-copy/clipboard-copy.js';
import '@advanced-rest-client/json-table/json-table.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import { Example } from '@advanced-rest-client/arc-types/src/forms/FormTypes';

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
 * @fires table-changed
 * @fires syntax-highlight
 */
export class ApiExampleRender extends LitElement {
  get styles(): CSSResult;

  /**
   * Data to render.
   */
  example: Example;
  /**
   * Examples media type
   * @attribute
   */
  mediaType: string;
  /**
   * When true the example is a JSON type example.
   * @attribute
   */
  isJson: boolean;
  /**
   * Index of selected union.
   * @attribute
   */
  selectedUnion: number;
  /**
   * Current state of "table" button. When tru the button is highlighted.
   * Note, this won't trigger rendering table/code view as this property is used
   * by `api-resource-example-document` to handle table state change.
   * @attribute
   */
  table: boolean;
  /**
   * When set it renders JSON table instead of code view.
   * @attribute
   */
  renderTable: boolean;
  /**
   * Opens example source view (source from API spec file).
   * @attribute
   */
  sourceOpened: boolean;
  /**
   * When set the actions row (copy, switch view type) is not rendered.
   * @attribute
   */
  noActions: boolean;
  /**
   * Enables Anypoint compatibility styling
   * @attribute
   */
  compatibility: boolean;

  _codeValue: string;
  _langValue: string;

  constructor();

  /**
   * Computes whether passed value is a valid JSON object, when component is
   * marked to parse JSON data.
   * @param isJson [description]
   * @param value Current example value
   */
  _computeIsJson(isJson: boolean, value: any): boolean;

  _computeHasRaw(value: any, raw: any): boolean;

  /**
   * @param example
   */
  _dataChanged(example: Example): void;

  _renderCode(): void;

  /**
   * Copies the current response text value to clipboard.
   *
   * @param {Event} e
   */
  _copyToClipboard(e: Event): void;

  /**
   * Resets button icon.
   * @param button Button to reset.
   */
  _resetCopyButtonState(button: HTMLButtonElement): void;

  _computeUnionExamples(selectedUnion: number, example: Example): Example|undefined;

  _toggleTable(e: Event): void;

  _toggleSourceOpened(e: Event): void;

  _toggleActionButtonCssPart(target: HTMLElement, active: boolean): void;

  /**
   * Handler for union type button click.
   * Sets `selectedUnion` property.
   */
  _selectUnion(e: PointerEvent): void;

  _renderUnion(example: Example): TemplateResult|string;

  _headerTemplate(example: Example): TemplateResult|string;

  _renderExample(example: Example): TemplateResult;

  render(): TemplateResult;
}
