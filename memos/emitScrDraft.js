import {} from ''
document.querySelectorAll('.vnl-comp').forEach(v=>{
	const compList = v.dataset.comp.split(',')
	compList.forEach(comp=>comp(v))
})