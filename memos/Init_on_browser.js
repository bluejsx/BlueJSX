/////
<elem data-vjsx-init='COMP_ID_1;COMP_ID_2(arg0:32)/PARENT_ID' />

/////

const { log, warn, error } = console

const compFuncs = {
  'COMP_ID_1': ()=>{},
  'COMP_ID_2': ()=>{},
  'PARENT_ID': ()=>{},
}

const initElem = ( elem ) =>{
  elem.dataset.vjsxInit
    .split('/')[0].split(';')
    .forEach(id=>{
      elem.querySelector(`[data-vjsx-init$='/${id}'`).forEach(initElem)
      compFuncs[id]?.(elem) ?? warn(`comp function ${id} not found`)
    })
  elem.removeAttribute('data-vjsx-init')
}

document.querySelectorAll('[data-vjsx-init]').forEach(elem=>initElem(elem))