/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   src/ApiResourceExampleDocument.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement, html, css} from 'lit-element';

import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';

export {ApiResourceExampleDocument};

declare namespace ApiElements {

  /**
   * `api-resource-example-document`
   *
   * Renders list of examples defined in AMF model. It renders values that
   * are structured examples (JSON, RAML type).
   *
   * This element uses `api-example-generator` to generate view model for examples.
   * It can accept AMF's Payload shape, array of Payload shapes, or any other
   * AMF shape. If the shape is compatible (has examples, properties, items, unions etc)
   * then examples list is rendered.
   *
   * The mime type (`media-type`) must be set in order to compute examples.
   *
   * ## Example
   *
   * ```html
   * <api-resource-example-document
   *  payload="[...]"
   *  media-type="application/json"></api-resource-example-document>
   * ```
   *
   * ## Styling
   *
   * `<api-resource-example-document>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--api-resource-example-document` | Mixin applied to this elment | `{}`
   * `--api-resource-example-document-title` | Mixin applied to example title | `{}`
   * `--api-resource-example-document-button-active-background-color` | Background color of active button | `#e0e0e0`
   */
  class ApiResourceExampleDocument extends
    ApiElements.AmfHelperMixin(
    Object) {
    readonly hasLocalStorage: any;
    readonly renderedExamples: any;

    /**
     * Computed in a debouncer examples to render.
     */
    _renderedExamples: any[]|null|undefined;

    /**
     * If true it will display a table view instead of JSON code.
     * `isJson` must be set to use this option.
     */
    table: boolean|null|undefined;

    /**
     * Examples media type
     */
    mediaType: string|null|undefined;

    /**
     * Computed value, true if selected media type is application/json
     * or equivalent.
     */
    isJson: boolean|null|undefined;

    /**
     * AMF model for examples.
     * It can be Payload shape, list of Payload shapes, or any shape.
     */
    examples: any[]|null|undefined;

    /**
     * When set it only renders "raw" examples. To be used when media type context is unknown.
     * This can happen if RAML type document is rendered outside method documentation
     * (not in a request/response body when media type is known).
     *
     * Note, this can return JSON, XML, YAML or any other value
     * depending on original source.
     */
    rawOnly: boolean|null|undefined;

    /**
     * Type (model) name for which examples are generated for.
     * This is used by RAML to XML examples processor to wrap the example
     * in type name. If missing this wrapping is omnited.
     */
    typeName: string|null|undefined;

    /**
     * Configuration passed to example generator.
     * When set the generator only returns examples that are defined in API
     * file, without auto generating examples from object properties.
     */
    noAuto: boolean|null|undefined;

    /**
     * Rendered payload ID (if any) to associate examples with the paylaod.
     */
    payloadId: string|null|undefined;

    /**
     * Computed value, true if there are examples to render.
     * This value is reflected to attribute so the element can be hidden
     * via CSS until examples are set.
     *
     * ```css
     * api-resource-example-document { display: none; }
     * api-resource-example-document[has-examples] { display: block; }
     * ```
     */
    hasExamples: boolean|null|undefined;

    /**
     * When set the actions row (copy, switch view type) is not rendered.
     */
    noActions: boolean|null|undefined;

    /**
     * Enables Anypoint compatibility styling
     */
    compatibility: boolean|null|undefined;
    _effectiveTable: boolean|null|undefined;

    /**
     * True if current environment has localStorage suppport.
     * Chrome apps do not have localStorage property.
     */
    _hasLocalStorage: boolean|null|undefined;
    _setObservableProperty(prop: any, value: any): any;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _hasStorageSupport(): any;

    /**
     * When response's content type is JSON the view renders the
     * JSON table element. This function reads current state for the table
     * (if it is turned on) and handles view change if needed.
     */
    _ensureJsonTable(): void;

    /**
     * Updates "table" state in localstorage and disaptches
     * `json-table-state-changed` event.
     *
     * @param state Current "table" state.
     */
    _tableChanged(state: Boolean|null): void;

    /**
     * Dispatches `json-table-state-changed` custom event.
     */
    _dispatchTableState(enabled: Boolean|null): CustomEvent|null;

    /**
     * Updates the value of the `isJsonTable` property when the corresponding localStorage
     * property change.
     *
     * @param e Storage event
     */
    _onStorageChanged(e: Event|null): void;

    /**
     * Reads the local value (always a string) as a boolean value.
     *
     * @param value The value read from the local storage.
     * @returns Boolean value read from the value.
     */
    _localStorageValueToBoolean(value: String|null): Boolean|null;

    /**
     * Handler to the incomming `json-table-state-changed` event.
     * Sets the `table` property if it is different.
     */
    _onJsonTableStateChanged(e: CustomEvent|null): void;

    /**
     * Runs the debouncer to update examples list.
     */
    _computeExamples(): void;

    /**
     * Computes value for `isJson` property
     *
     * @param type Current media type.
     */
    _computeIsJson(type: String|null): Boolean|null;

    /**
     * Computes value for `_effectiveTable`.
     *
     * @param table Current state of table view for JSON.
     * @param isJson [description]
     * @returns True when current media type is JSON and table is enabled.
     */
    _computeEffectiveTable(table: Boolean|null, isJson: Boolean|null): Boolean|null;
    _tableCHangedHandler(e: any): void;
    _examplesTemplate(examples: any): any;
    render(): any;
  }
}
