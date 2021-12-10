
## Hook

#### useNavScroll


`useNavScroll(args : useNavScrollArgs) => useNavScrollResult`

This is the main hook: use it in a react function component to track  
the state of the passed ids. The function accepts an initial configuration  
of type `useNavScrollArgs` to customize the behaviour.



___



## Types

**ChangesType**

The returned object from the `onChange` passed function, with the current state of  
`added` and `removed` element ids.

```
{

added: string | null,

removed: string | null

}
```  



___

**RegisterOptions**

The options object passed to the `register` function.

```
{

parent: string,

ref: RefObject<Element>

}
```  


The details of each property is described here:


* **parent**: `string`  

Pass the string id of the parent element  


* **ref**: `RefObject<Element>`  

If the tracked element has already a reference, you can pass it and will be reused


___

**useNavScrollArgs**

The react-use-navscroll configuration object

```
{

isHorizontal: boolean,

offset: number,

root: Element,

onChange: (changes : ChangesType) => void

}
```  


The details of each property is described here:


* **isHorizontal**: `boolean`  

Declare if the detection should work vertically or horizontally. By default false (vertical)  


* **offset**: `number`  

Moves the detection line by the amount of this offset, expressed in percentage. By default the value is 50 (center).  


* **root**: `Element`  

Pass an element as root to track a specific container, smaller than a viewport. Default is window (the whole viewport).  


* **onChange**: `(changes : ChangesType) => void`


Function called every time an element becomes active.  
The changes object returned contains the "added" and "removed" id.


___

**useNavScrollResult**

The object returned by the hook.

```
{

activeIds: string[],

getActiveRef: () => null | RefObject<Element>,

isActive: (id : string) => boolean,

register: (id : string, options ?: RegisterOptions) => RegisteredAttributes<T extends Element>,

unregister: (idToUnregister : string) => void

}
```  


The details of each property is described here:


* **activeIds**: `string[]`  

A list of active ids (the full hierarchy).  


* **getActiveRef**: `() => null | RefObject<Element>`


A function to retrieve the reference of the current active element (only the last element, not the elements hierarchy).  


* **isActive**: `(id : string) => boolean`


A convenience function to quickly check the active state for the given id  


* **register**: `(id : string, options ?: RegisterOptions) => RegisteredAttributes<T extends Element>`


The function used to register the component into the tracking system.  
It returns the id already passed and the reference object.  
Note that only the reference value will be `null` in a SSR context.  


* **unregister**: `(idToUnregister : string) => void`


Removes the given id from the tracking system.



___



