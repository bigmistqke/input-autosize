import {
  booleanAttribute,
  element,
  Element,
  ElementAttributes,
  stringAttribute,
} from '@lume/element'
import { signal } from 'classy-solid'
import { ContentEditable, Patch } from './contenteditable'

/**********************************************************************************/
/*                                                                                */
/*                                      Types                                     */
/*                                                                                */
/**********************************************************************************/

interface TmTextareaAttributes extends ElementAttributes<TmTextareaElement, 'value'> {
  oninput?: (event: InputEvent & { currentTarget: TmTextareaElement }) => any
  onInput?: (event: InputEvent & { currentTarget: TmTextareaElement }) => any
  onvalue?: (event: ValueEvent & { currentTarget: TmTextareaElement }) => any
  onValue?: (event: ValueEvent & { currentTarget: TmTextareaElement }) => any
  value: string
}
declare module 'solid-js/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'input-autosize': TmTextareaAttributes
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'input-autosize': TmTextareaAttributes
    }
  }
}

/**********************************************************************************/
/*                                                                                */
/*                                 Custom Element                                 */
/*                                                                                */
/**********************************************************************************/

class ValueEvent extends Event {
  constructor(public value: string) {
    super('value')
  }
}

@element('input-autosize')
export class TmTextareaElement extends Element {
  hasShadow = false

  @booleanAttribute editable = true
  @stringAttribute stylesheet = ''
  @stringAttribute value = ''

  static css = `
    :host {
      display: contents;
      white-space: pre;
    }`

  @signal bindings: Record<
    string,
    (event: KeyboardEvent & { currentTarget: HTMLElement }) => Patch | null
  > = {}

  template = () => (
    <ContentEditable
      value={this.value}
      editable={this.editable}
      onValue={value => {
        this.value = value
        this.dispatchEvent(new ValueEvent(value))
      }}
      bindings={this.bindings}
    />
  )
}

// NOTE:  <tm-textarea/> is already defined with lume's @element() decorator.
//        register is a NOOP, but is needed for rollup not to treeshake
//        the custom-element declaration out of the bundle.
export function register() {
  if (!customElements.get('tm-textarea')) {
    customElements.define('tm-textarea', TmTextareaElement)
  }
}
