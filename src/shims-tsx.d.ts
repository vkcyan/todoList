import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $message: ElMessage
  }
}

export type MessageType = 'success' | 'warning' | 'info' | 'error'

/** Message Component */
export declare class ElMessageComponent extends Vue {
  /** Close the Loading instance */
  close(): void
}

export interface CloseEventHandler {
  /**
   * Triggers when a message is being closed
   *
   * @param instance The message component that is being closed
   */
  (instance: ElMessageComponent): void
}

/** Options used in Message */
export interface ElMessageOptions {
  /** Message text */
  message: string | VNode

  /** Message type */
  type?: MessageType
}

export interface ElMessage {
  /** Show an info message */
  (text: string): ElMessageComponent

  /** Show message */
  (options: ElMessageOptions): ElMessageComponent
}
