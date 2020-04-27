const div = document.createElement('div');
div.innerText = JSON.stringify(protobufjs.roots.default.toJSON());
document.body.appendChild(div);
