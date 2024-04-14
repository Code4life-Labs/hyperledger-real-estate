interface CasesType {
  case: boolean,
  returnValue: any
}

/**
 * This function allow performing a switch-case statement, but more flexible.
 * @param cases 
 * @returns 
 */
function fromCase(cases: Array<CasesType>) {
  for(let c of cases) {
    if(c.case) {
      return typeof c.returnValue === "function" ? c.returnValue() : c.returnValue;
    }
  }
}

/**
 * Use to toggle boolean state of a object.
 * 
 * This function should be used in a case that you want to operate when
 * its state is `true` or `false`.
 * @param o 
 * @param propName 
 * @param fn
 * @returns 
 */
function togglePropertyState<T>(o: T, propName: keyof T, fn?: (status: boolean) => void) {
  if(typeof o[propName] !== "boolean") return;

  // Toggle state
  (o[propName] as boolean) = !o[propName];

  // Call
  if(fn) fn(o[propName] as boolean);
}

/**
 * Use this function to perform "delay" in asynchronous task.
 * @param time 
 * @returns 
 */
function wait(time = 0) {
  return new Promise(function(res) {
    setTimeout(res, time, true);
  })
}

export const OtherUtils = {
  fromCase,
  togglePropertyState,
  wait
};