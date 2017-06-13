import './css/common.css';
import Layer from './commonents/layer/layer.js';
const App=function(){
	alert('aaa')
	console.log(layer);
	var layer= new Layer();
	var app=document.getElementById('app');
	app.innerHTML=layer.tpl({
		name:'tpl',
		arr:['apple','xiaomi','huawei']
	})
};
new App();