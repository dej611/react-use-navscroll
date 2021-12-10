import { HTMLAttributes, LegacyRef, Ref, RefObject } from 'react';

/**
 * The returned object from the `onChange` passed function, with the current state of
 * `added` and `removed` element ids.
 */
export type ChangesType = {
  added: string | null;
  removed: string | null;
};

/**
 * The react-use-navscroll configuration object
 */
export type useNavScrollArgs = {
  /**
   * Function called every time an element becomes active.
   * The changes object returned contains the "added" and "removed" id.
   * */
  onChange?: (changes: ChangesType) => void;
  /**
   * Pass an element as root to track a specific container, smaller than a viewport. Default is window (the whole viewport).
   * */
  root?: Element;
  /**
   * Moves the detection line by the amount of this offset, expressed in percentage. By default the value is 50 (center).
   * */
  offset?: number;
  /**
   * Declare if the detection should work vertically or horizontally. By default false (vertical)
   */
  isHorizontal?: boolean;
};

/**
 * The options object passed to the `register` function.
 */
export type RegisterOptions<T> = {
  /**
   * Pass the string id of the parent element
   */
  parent?: string;
  /**
   * If the tracked element has already a reference, you can pass it and will be reused
   */
  ref?: RefObject<T>;
};

/**
 * The attributes object to assign to the element to assign
 */
export type RegisteredAttributes<T> = {
  id: HTMLAttributes<T>['id'];
  ref: Ref<T> | LegacyRef<T>;
};

/**
 * The object returned by the hook.
 */
export type useNavScrollResult<T extends Element> = {
  /**
   * The function used to register the component into the tracking system.
   * It returns the id already passed and the reference object.
   * Note that only the reference value will be `null` in a SSR context.
   */
  register: (
    id: string,
    options?: RegisterOptions<T>
  ) => RegisteredAttributes<T>;
  /**
   * Removes the given id from the tracking system.
   */
  unregister: (idToUnregister: string) => void;
  /**
   * A list of active ids (the full hierarchy).
   */
  activeIds: string[];
  /**
   * A convenience function to quickly check the active state for the given id
   */
  isActive: (id: string) => boolean;
  /**
   * A function to retrieve the reference of the current active element (only the last element, not the elements hierarchy).
   */
  getActiveRef: () => RefObject<T> | null;
};

// @private
export type TrackedElement<T> = {
  id: string;
} & Required<Pick<RegisterOptions<T>, 'ref'>> &
  Pick<RegisterOptions<T>, 'parent'>;
